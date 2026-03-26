import json

from openai import OpenAI

from app.core.config import OPENAI_API_KEY, USE_MOCK_AI


def _mock_generate_email(name: str, company: str, summary: str):
    safe_name = name or "there"
    safe_company = company or "your team"
    safe_summary = summary or "your current business operations"

    return {
        "subject": f"Quick idea for improving results at {safe_company}",
        "body": f"""Hi {safe_name},

I came across {safe_company} and noticed that you’re working in this space: {safe_summary}

Teams operating here often face challenges like inefficient outreach, slow response times, and missed opportunities during early-stage engagement.

We help automate lead engagement and streamline outreach workflows so teams can focus on high-quality opportunities and improve conversion rates.

Would a quick 10-minute chat next week be worth exploring?

Best,
LeadCraft AI""",
    }


def generate_email(name: str, company: str, summary: str):
    if USE_MOCK_AI or not OPENAI_API_KEY:
        return _mock_generate_email(name, company, summary)

    client = OpenAI(api_key=OPENAI_API_KEY)

    prompt = f"""
You are an expert B2B SDR assistant.

Write a concise outbound cold email for this lead.

Lead name: {name}
Company: {company}
Company context: {summary}

Rules:
- Keep it under 120 words
- Be specific, not generic
- Mention company context naturally
- Include one clear CTA
- Return valid JSON only with:
  - subject
  - body
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
            "subject": f"Quick idea for {company}",
            "body": raw_output,
        }