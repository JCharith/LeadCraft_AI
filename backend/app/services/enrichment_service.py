import json

from openai import OpenAI

from app.core.config import OPENAI_API_KEY, USE_MOCK_AI
from app.services.website_parser import get_website_text


def _mock_enrich(website: str):
    website_lower = (website or "").lower()

    if "logistics" in website_lower:
        return {
            "summary": "The company provides logistics and supply chain solutions for businesses.",
            "industry": "Logistics SaaS",
            "pain_points": "manual tracking, inefficient routing, delayed deliveries",
        }

    if "tech" in website_lower or "software" in website_lower:
        return {
            "summary": "The company builds software products and digital solutions for businesses.",
            "industry": "Software / SaaS",
            "pain_points": "lead generation, scaling sales, customer acquisition",
        }

    return {
        "summary": "The company operates in a general business domain providing products or services.",
        "industry": "General Business",
        "pain_points": "growth, customer acquisition, operational efficiency",
    }


def enrich(website: str):
    if USE_MOCK_AI or not OPENAI_API_KEY:
        return _mock_enrich(website)

    text = get_website_text(website)

    if not text:
        return {
            "summary": "No company information could be extracted from the website.",
            "industry": "Unknown",
            "pain_points": "Unknown",
        }

    client = OpenAI(api_key=OPENAI_API_KEY)

    prompt = f"""
You are a B2B lead enrichment assistant.

Analyze the following website text and return valid JSON with these exact keys:
- summary
- industry
- pain_points

Rules:
- summary should be concise and specific
- industry should be short
- pain_points should be a short comma-separated string
- return JSON only

Website text:
{text}
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    raw_output = response.output_text.strip()

    try:
        return json.loads(raw_output)
    except Exception:
        return {
            "summary": raw_output,
            "industry": "Unknown",
            "pain_points": "Unknown",
        }