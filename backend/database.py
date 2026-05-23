from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./watchdog.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Monitor(Base):
    __tablename__ = "monitors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    feed_url = Column(String, nullable=False)
    keyword = Column(String, nullable=False)
    action_type = Column(String, nullable=False)
    action_config = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    monitor_id = Column(Integer, nullable=False)
    ran_at = Column(DateTime, default=datetime.now)
    status = Column(String, nullable=False)
    matched_entry = Column(String)
    output = Column(String)

def create_tables():
    Base.metadata.create_all(bind=engine)
