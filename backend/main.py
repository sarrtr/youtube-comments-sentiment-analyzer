from fastapi import FastAPI, Query
from youtube_parser import run
import os
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "YouTube Sentiment API is running"}

@app.get("/analyze/")
def analyze(url: str = Query(..., description="YouTube video URL")):
    result = run(url)

    if result is None:
         return {"success": False, "message": "Invalid YouTube URL or no comments found."}

    title = result.get("title", "Unknown Title")
    comments = result.get("comments", [])

    if not comments:
        return {"success": False, "message": "No comments found."}

    return {
        "success": True,
        "title": title,
        "comments": comments
    }
