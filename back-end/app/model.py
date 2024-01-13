from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from db import Base
from db import ENGINE


# Threadテーブル定義
class ThreadTable(Base):
    __tablename__ = "thread"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(120), nullable=False)


def main():
    # テーブル構築
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
