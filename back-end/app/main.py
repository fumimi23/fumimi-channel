from fastapi import FastAPI
from db import session
from model import ThreadTable, PostTable

app = FastAPI()


# スレッド一覧取得
@app.get("/api/threads")
def get_threads():
    threads = session.query(ThreadTable).all()
    return threads


# スレッド作成
@app.post("/api/threads")
def create_thread(title: str):
    thread = ThreadTable(title=title)
    session.add(thread)
    session.commit()
    return thread


# 投稿一覧取得
@app.get("/api/threads/{thread_id}/posts")
def get_posts(thread_id: int):
    posts = session.query(PostTable).filter(PostTable.thread_id == thread_id).all()
    return posts


# 投稿作成
@app.post("/api/threads/{thread_id}/posts")
def create_post(thread_id: int, name: str, email: str, message: str):
    post = PostTable(
        name=name,
        email=email,
        message=message,
        thread_id=thread_id,
    )
    session.add(post)
    session.commit()
    return post
