from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime
import json
import os
from llm import get_sentiment

API_KEY = 'AIzaSyBXvktTg4Mb7yGlR1CD_oh1Pg58H9wpeLI'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

MAX_COMMENTS = 100

def get_youtube_client():
    return build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY, cache_discovery=False)

def extract_video_id(url):
    if 'youtu.be/' in url:
        return url.split('youtu.be/', 1)[1].split('?si=')[0]
    elif 'www.youtube.com/' in url:
        return url.split('v=', 1)[1]
    elif 'youtube.com/shorts/' in url:
        return url.split('shorts/', 1)[1].split('?si=')[0]
    elif 'www.youtube.com/shorts/' in url:
        return url.split('shorts/', 1)[1]
    else:
        return None
    
def get_comments_with_sentiment(video_id):
    youtube = get_youtube_client()

    comments = []

    try:
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=MAX_COMMENTS,
            textFormat="plainText",
            order='relevance'
        )

        while request and len(comments) < MAX_COMMENTS:
            response = request.execute()
            
            for item in response["items"]:
                snippet = item["snippet"]["topLevelComment"]["snippet"]
                comment_text = snippet["textDisplay"]
                published_at = snippet["publishedAt"]
                like_count = snippet.get("likeCount", 0)

                comments.append({
                    "text": comment_text,
                    "sentiment": get_sentiment(comment_text),
                    "date": datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y-%m-%d"),
                    "likes": like_count
                })

            request = youtube.commentThreads().list_next(request, response)

        comments.sort(key=lambda x: x["likes"], reverse=True)

        return comments
    except HttpError as e:
        error_details = e.error_details if hasattr(e, "error_details") else str(e)
        print("Failed to fetch comments.")
        print(error_details)
        return None

def save_to_json(comments):
    filepath = os.path.join("backend\data", "comments.json")
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(comments, f, ensure_ascii=False, indent=2)

def get_video_title(video_id):
    youtube = get_youtube_client()

    request = youtube.videos().list(
        part="snippet",
        id=video_id
    )
    response = request.execute()

    if "items" in response and len(response["items"]) > 0:
        return response["items"][0]["snippet"]["title"]
    return "Unknown Title"

def run(url):
    video_id = extract_video_id(url)

    if video_id:
        comments = get_comments_with_sentiment(video_id)

        if comments:
            save_to_json(comments)
            title = get_video_title(video_id)
            return {'title': title, 'comments': comments}
        else:
            return None
    else:
        print("Failed to extract video id, please, check url correctness.")
        return None
