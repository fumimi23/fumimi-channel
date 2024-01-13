from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from db import Base
from db import ENGINE


# Threadテーブル定義
class ThreadTable(Base):
    __tablename__ = "thread"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(120), nullable=False)


# Postテーブル定義
class PostTable(Base):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)
    email = Column(String(60), nullable=False)
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    displayed_id = Column(String(9), default="aaaa", nullable=False)
    thread_id = Column(Integer, ForeignKey("thread.id"), nullable=False)
    message = Column(String(1000), nullable=False)


def main():
    # テーブル構築
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
