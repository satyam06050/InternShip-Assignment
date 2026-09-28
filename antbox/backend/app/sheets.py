import gspread
from google.oauth2.service_account import Credentials

from app.config import GOOGLE_SHEET_ID, GOOGLE_CREDENTIALS_PATH


SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets.readonly"
]


def get_sheet_data():

    credentials = Credentials.from_service_account_file(
        GOOGLE_CREDENTIALS_PATH,
        scopes=SCOPES
    )

    client = gspread.authorize(credentials)

    sheet = client.open_by_key(GOOGLE_SHEET_ID)

    worksheet = sheet.sheet1

    return worksheet.get_all_records()