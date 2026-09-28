import json
import gspread
from google.oauth2.service_account import Credentials

from app.config import GOOGLE_SHEET_ID, GOOGLE_CREDENTIALS_PATH, GOOGLE_CREDENTIALS_JSON


SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly"
]


def get_credentials() -> Credentials:
    if GOOGLE_CREDENTIALS_JSON:
        return Credentials.from_service_account_info(
            json.loads(GOOGLE_CREDENTIALS_JSON),
            scopes=SCOPES
        )
    return Credentials.from_service_account_file(
        GOOGLE_CREDENTIALS_PATH,
        scopes=SCOPES
    )


def get_sheet_data():
    client = gspread.authorize(get_credentials())
    sheet = client.open_by_key(GOOGLE_SHEET_ID)
    worksheet = sheet.sheet1
    return worksheet.get_all_records()
