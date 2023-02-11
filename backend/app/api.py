from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import csv
from io import StringIO
import json


openai.organization = "org-0UjCDso2b7GIHvHREYwFMQLF"
openai.api_key = "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"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

@app.get("/pick", tags=["pick"])
async def get_todos(data: dict) -> dict:
    hero_picks = openai.Completion.create(
        model="text-davinci-003",
        prompt='''
        Oponent team : {}
        My team : {}
        Suggest 5 hero to pick along with rating for picking in the following json format 
        {{"hero_suggestions" : [{{'hero_name' 'rating from 0 to 10' 'reason for the counter pick' 'counter for hero name'}}]}}
        '''.format(', '.join(data['enemy_picks']), ', '.join(data['my_picks']) ),
        max_tokens=500,
        temperature=0.5
    )['choices'][0]['text']

    return json.loads(hero_picks)