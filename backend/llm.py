from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
import re
from emoji import replace_emoji

# tokenizer = AutoTokenizer.from_pretrained("seara/rubert-base-cased-russian-sentiment")
# model = AutoModelForSequenceClassification.from_pretrained("seara/rubert-base-cased-russian-sentiment")

tokenizer = AutoTokenizer.from_pretrained("seara/rubert-tiny2-russian-sentiment")
model = AutoModelForSequenceClassification.from_pretrained("seara/rubert-tiny2-russian-sentiment")

model.eval()

def get_sentiment(text):
    text = preprocess_text(text)

    inputs = tokenizer(
        text, 
        return_tensors="pt", 
        truncation=True,
        max_length=512,
        padding="max_length"
    )
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=1)
    
    predicted_class = torch.argmax(probabilities, dim=1).item()
    labels = model.config.id2label

    return labels[predicted_class]

def preprocess_text(text):
    text = replace_emoji(text, replace='')
    
    text = re.sub(r'http\S+|www\.\S+|youtu\.be/\S+', '', text)
    text = re.sub(r'[@#]\w+', '', text)
    text = re.sub(r'[^\w\s.,!?–—-]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text