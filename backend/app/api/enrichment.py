from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.lead import Lead
from app.services.enrichment_service import enrich

router = APIRouter(prefix="/enrich", tags=["Enrichment"])


@router.post("/{lead_id}")
def enrich_lead(lead_id: int, db: Session = Depends(get_db)):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()

    if not lead:
        return {"error": "Lead not found"}

    result = enrich(lead.website)

    lead.summary = result.get("summary", "")
    db.commit()
    db.refresh(lead)

    return {
        "summary": result.get("summary", ""),
        "industry": result.get("industry", "Unknown"),
        "pain_points": result.get("pain_points", "Unknown"),
    }