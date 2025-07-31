from fastapi import FastAPI, Query
from youtube_parser import run
import os
import json

app = FastAPI()

@app.get("/")
def root():
    return {"message": "YouTube Sentiment API is running"}

@app.get("/analyze/")
def analyze(url: str = Query(..., description="YouTube video URL")):
    run(url)

    json_path = os.path.join("backend", "data", "comments.json")
    if not os.path.exists(json_path):
        return {"error": "Failed to analyze or save comments"}

    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)
    return {"comments": data}
