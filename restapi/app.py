from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import openai
import spacy
from collections import Counter
from math import log
import requests
from PIL import Image
import base64
import datetime
import sys
import json
app = Flask(__name__)
CORS(app, support_credentials=True)
openai.api_key = "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"
nlp = spacy.load('en_core_web_sm')
messages=[
        {"role": "system", "content": "Table-20-MF"},
]
def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode('utf-8')

def img_requests(txt):
  response = requests.get("https://source.unsplash.com/random{0}".format(txt))
  file=open('image.jpg', 'wb')
  file.write(response.content)
  data = get_base64_encoded_image('image.jpg')
  file.close()
  return data


def get_most_important_word(sentence):
    doc = nlp(sentence)
    words = [token.text for token in doc if not token.is_stop and not token.is_punct]
    word_freq = Counter(words)
    total_words = sum(word_freq.values())
    tf = {word: freq / total_words for word, freq in word_freq.items()}
    all_docs = [word.text for word in nlp(" ".join(words))]
    idf = {word: log(len(all_docs) / (1 + word_freq[word])) for word in word_freq.keys()}
    tf_idf = {word: tf[word] * idf[word] for word in word_freq.keys()}
    most_important_word = max(tf_idf, key=tf_idf.get)
    return most_important_word

def chat(text):
    global messages
    messages.append({"role": "user", "content": text})
    return openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=messages
    )

@app.route('/', methods=['POST'])
@cross_origin(supports_credentials=True)
def update_record():
    global messages
    data = request.json
    print(data['search'])
    now = datetime.datetime.now()
    d = f"{now.strftime('%Y-%m-%d %H:%M:%S')}"
    user_input = data['search']
    if "clear" in user_input:
        print("clear")
        messages.clear()
        # Generate response
    while True:
        print("Before")
        response = chat(user_input)
        print("After")
        # Print response
        result = response.choices[0]['message']
        print("In the loop",len(result['content']),result['content'])
        if(len(result['content'])>1000):
            print(f"[{d}] {result['role']}: {result['content']}")    
            messages.append(result)
            if ("as a language model AI" in result['content'].split('\n')[0]):
                continue
            return jsonify(result['content'])
        
@app.route('/image', methods=['POST'])
@cross_origin(supports_credentials=True)
def image():
    print( request.json['search']  )  
    most_important_word = get_most_important_word(request.json['search'])
    print(most_important_word)
    base64data=img_requests("?"+most_important_word)
    return base64data

@app.route('/description', methods=['POST'])
@cross_origin(supports_credentials=True)
def description():
    text = request.json['text']
    

    prompt = f" explain the concept of {text} in 200 words"
    completions = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
)
    print(completions.choices)

    description = completions.choices[0]
    print("Description",description['text'])
    return jsonify(description['text'])


@app.route('/questions', methods=['POST'])
@cross_origin(supports_credentials=True)
def questions():
    chapter_number = request.json['chapter']
    subject = request.json['subject']

    prompt = f"Generate 5 different multiple choice questions that are easy to diffrenciate and are related to chapter {chapter_number} of the 10th-grade {subject} NCERT textbook. Also highlight the correct option.Produce the output in JSON format"
    completions = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
)
    questions = [choice.text.strip() for choice in completions.choices]
    for i, question in enumerate(questions):
        print(f"{i+1},{question}")
        mystring = f"{i+1},{question}"
        

    return jsonify(mystring.split('1,')[1])

app.run(debug=True,port=8080)