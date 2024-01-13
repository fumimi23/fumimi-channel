import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

host = os.environ["DB_HOST"]
port = os.environ["DB_PORT"]
db_name = os.environ["DB_NAME"]
user = os.environ["DB_USER"]
password = os.environ["DB_PASSWORD"]

DATABASE = "mysql://%s:%s@%s:%s/%s?charset=utf8" % (
    user,
    password,
    host,
    port,
    db_name,
)

ENGINE = create_engine(DATABASE, echo=True)

session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=ENGINE))


__table_args__ = {"mysql_default_charset": "utf8mb4"}
Base = declarative_base()
Base.query = session.query_property()
