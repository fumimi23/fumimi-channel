from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import session
from model import ThreadTable, PostTable

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:2333",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# スレッド一覧取得
@app.get("/api/threads")
def get_threads():
    threads = session.query(ThreadTable).all()
    return threads


class Thread(BaseModel):
    title: str


# スレッド作成
@app.post("/api/threads")
def create_thread(thread: Thread):
    thread = ThreadTable(title=thread.title)
    session.add(thread)
    session.commit()
    return thread


# 投稿一覧取得
@app.get("/api/threads/{thread_id}/posts")
def get_posts(thread_id: int):
    posts = session.query(PostTable).filter(PostTable.thread_id == thread_id).all()
    return posts


class Post(BaseModel):
    name: str
    email: str
    message: str


# 投稿作成
@app.post("/api/threads/{thread_id}/posts")
def create_post(thread_id: int, post: Post):
    post = PostTable(
        name=post.name,
        email=post.email,
        message=post.message,
        thread_id=thread_id,
    )
    session.add(post)
    session.commit()
    return post
