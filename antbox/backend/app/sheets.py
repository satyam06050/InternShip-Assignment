import gspread
from google.oauth2.service_account import Credentials

from app.config import (
    GOOGLE_SHEET_ID,
    GOOGLE_PROJECT_ID,
    GOOGLE_PRIVATE_KEY_ID,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_EMAIL,
    GOOGLE_CLIENT_ID,
)


SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]


def get_credentials() -> Credentials:
    return Credentials.from_service_account_info(
        {
            "type": "service_account",
            "project_id": GOOGLE_PROJECT_ID,
            "private_key_id": GOOGLE_PRIVATE_KEY_ID,
            "private_key": GOOGLE_PRIVATE_KEY.replace("\\n", "\n"),
            "client_email": GOOGLE_CLIENT_EMAIL,
            "client_id": GOOGLE_CLIENT_ID,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
        },
        scopes=SCOPES,
    )


def get_sheet_data():
    client = gspread.authorize(get_credentials())
    sheet = client.open_by_key(GOOGLE_SHEET_ID)
    return sheet.sheet1.get_all_records()
