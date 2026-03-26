import smtplib
from email.mime.text import MIMEText

from app.core.config import EMAIL_USER, EMAIL_PASS


def send_email(to: str, subject: str, body: str):
    if not EMAIL_USER or not EMAIL_PASS:
        raise ValueError("Email credentials are missing. Set EMAIL_USER and EMAIL_PASS.")

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = to

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)