import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

USE_MOCK_AI = os.getenv("USE_MOCK_AI", "true").lower() == "true"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./db.sqlite3")