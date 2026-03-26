from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.lead import Lead
from app.services.ai_sdr_service import generate_email

router = APIRouter(prefix="/sdr", tags=["SDR"])


@router.post("/{lead_id}")
def generate(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        return {"error": "Lead not found"}

    result = generate_email(
        name=lead.name,
        company=lead.company,
        summary=lead.summary or "",
    )

    lead.email_subject = result.get("subject", "")
    lead.email_body = result.get("body", "")

    db.commit()
    db.refresh(lead)

    return {
        "subject": lead.email_subject,
        "body": lead.email_body,
    }