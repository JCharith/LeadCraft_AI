from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    company = Column(String)
    website = Column(String)

    summary = Column(Text)
    email_subject = Column(String)
    email_body = Column(Text)