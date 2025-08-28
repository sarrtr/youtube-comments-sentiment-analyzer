# YouTube Comments Sentiment Analyzer in Russian
## Project overview

This project analyzes YouTube video comments in Russian and visualizes their sentiment via different charts.

### 📌 Features

- Analyze YouTube comments via embedded [LLM](https://huggingface.co/seara/rubert-tiny2-russian-sentiment).
- Sentiment classification into positive, neutral, and negative categories.
- Different types of charts help to analyze the comments' sentiment from different perpectives.
- [Stop-word](https://github.com/stopwords-iso/stopwords-ru) filtering for Russian text.


## 🛠️ Teck stack

**Frontend:**
- React19
- TailwindCSS
- Recharts (for visualizations)

**Backend:**

- Python (FastAPI)

## 💻 How to run

``` bash
git clone https://github.com/sarrtr/youtube-comments-sentiment-analyzer.git
cd youtube-comments-sentiment-analyzer
docker-compose up --build
```

## 📊 How to use

1. Paste the link to the Youtube video, press Enter.
![main_page]()
2. Wait until the results are ready.
3. Check the visualizations:
![charts_page]()
    - stacked-area chart shows the amount of comments of each sentiment by a certain date.
    - donut and bar charts display percentages and amount of comments of each category.
    - word cloud charts show 10 most popular words for each sentiment.

## 📄 License

This project is licensed under the MIT License.
