from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
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

@app.post("/pick", tags=["pick"])
async def post_todos(data: dict) -> dict:
    print("Starting to fetch hero reccos")
    hero_picks = openai.Completion.create(
        model="text-davinci-003",
        prompt='''
        Oponent team : {}
        My team : {}
        Suggest 5 hero to pick along with rating for picking in the following json format 
        {{"hero_suggestions" : [{{"hero_name" : "hero name", "rating" : "rating from 0 to 10", "reason" : "reason for the counter pick", "counter" : "all hero names"}}]}}
        '''.format(', '.join(data['enemy_picks']), ', '.join(data['my_picks']) ),
        max_tokens=500,
        temperature=0.5
    )['choices'][0]['text']

    # sorted_hero_picks = sorted(json.loads(hero_picks), )
    # print(sorted_hero_picks)
    hero_picks_json = json.loads(hero_picks)
    print(hero_picks_json, hero_picks_json['hero_suggestions'])
    hero_picks_json['hero_suggestions'] = sorted(hero_picks_json['hero_suggestions'],key=lambda x: x['rating'], reverse=True)
    return hero_picks_json