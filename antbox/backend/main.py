from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.data import router


app = FastAPI(
    title="AntX Hiring API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "AntX Hiring API is running"
    }