from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.lead import Lead
from app.services.email_sender import send_email

router = APIRouter(prefix="/send", tags=["Send"])


@router.post("/{lead_id}")
def send(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        return {"error": "Lead not found"}

    if not lead.email_subject or not lead.email_body:
        return {"error": "Generate SDR email before sending"}

    send_email(
        to=lead.email,
        subject=lead.email_subject,
        body=lead.email_body,
    )

    return {
        "status": "sent",
        "to": lead.email,
        "subject": lead.email_subject,
    }