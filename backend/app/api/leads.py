from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.lead import Lead

router = APIRouter(prefix="/leads", tags=["Leads"])


@router.post("/")
def create_lead(data: dict, db: Session = Depends(get_db)):
    lead = Lead(**data)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return {
        "id": lead.id,
        "name": lead.name,
        "email": lead.email,
        "company": lead.company,
        "website": lead.website,
        "summary": lead.summary,
        "email_subject": lead.email_subject,
        "email_body": lead.email_body,
    }


@router.get("/")
def get_leads(db: Session = Depends(get_db)):
    leads = db.query(Lead).all()
    return [
        {
            "id": lead.id,
            "name": lead.name,
            "email": lead.email,
            "company": lead.company,
            "website": lead.website,
            "summary": lead.summary,
            "email_subject": lead.email_subject,
            "email_body": lead.email_body,
        }
        for lead in leads
    ]