from fastapi import APIRouter

from app.sheets import get_sheet_data


router = APIRouter(
    prefix="/api",
    tags=["Data"]
)


@router.get("/data")
def get_data():

    return get_sheet_data()