from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import leads, enrichment, sdr, send
from app.core.database import Base, engine
import app.models.lead  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LeadCraft AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lead-craft-ai.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router)
app.include_router(enrichment.router)
app.include_router(sdr.router)
app.include_router(send.router)


@app.get("/")
def root():
    return {"message": "LeadCraft AI backend is running"}