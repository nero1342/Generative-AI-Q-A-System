from fastapi import FastAPI 
from fastapi.routing import APIRoute 
from starlette.middleware.cors import CORSMiddleware

from app.api import api_router
from app.core.config import settings 

app = FastAPI(
    title=settings.PROJECT_NAME,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix=settings.API_V1_STR)

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "OK"}