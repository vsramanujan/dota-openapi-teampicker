from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai
import csv
from io import StringIO

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
    print(', '.join(data['enemy_picks']))
    print(', '.join(data['my_picks']))
    hero_picks = openai.Completion.create(
        model="text-davinci-003",
        prompt='''
        Oponent team : {}
        My team : {}
        Suggest 5 hero to pick along with rating for picking in the following csv format : Hero Name, Rating from 0 to 10, Reason, Which oponent hero name it counters
        '''.format(', '.join(data['enemy_picks']), ', '.join(data['my_picks']) ),
        max_tokens=500,
        temperature=0.5
    )['choices'][0]['text']


    print(hero_picks)

    csv_file = StringIO(hero_picks)
    reader = csv.reader(csv_file)

    data = []
    for row in reader:
        if row == []:
            continue

        data.append({
            'name': row[0].strip(),
            'rating': row[1].strip(),
            'reason': row[2].strip(),
            'counters' : row[3].strip()
        })
    
    return data