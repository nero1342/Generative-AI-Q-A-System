from fastapi import APIRouter

from app.api.endpoints import conversations, documents

api_router = APIRouter()
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(conversations.router, prefix="/conversations", tags=["documents"])