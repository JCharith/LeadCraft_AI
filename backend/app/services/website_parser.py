import requests
from bs4 import BeautifulSoup


def get_website_text(url: str) -> str:
    if not url:
        return ""

    if not url.startswith(("http://", "https://")):
        url = f"https://{url}"

    try:
        response = requests.get(url, timeout=8)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True)
        return text[:3000]
    except Exception:
        return ""