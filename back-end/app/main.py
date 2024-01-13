from fastapi import FastAPI
from db import session
from model import ThreadTable

app = FastAPI()


# スレッド一覧取得
@app.get("/threads")
def get_threads():
    threads = session.query(ThreadTable).all()
    return threads


# スレッド作成
@app.post("/threads")
def create_thread(title: str):
    thread = ThreadTable(title=title)
    session.add(thread)
    session.commit()
    return thread

