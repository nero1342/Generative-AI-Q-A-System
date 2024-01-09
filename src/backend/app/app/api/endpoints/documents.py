import os
from typing import Any, List

from fastapi import APIRouter, HTTPException, UploadFile, Request

from app.models import GeneralResponse
from app.core.engine import engineSession

UPLOAD_PATH = "uploads/"

router = APIRouter()

@router.get("/")
async def read_documents() -> List[str]:
    """
    Retrieve all documents from database 
    """
    documentNames = [document.name for document in engineSession.list_all_documents()]
    return documentNames


@router.post("/upload")
async def upload_document(request: Request, file: UploadFile) -> Any:
    """
    Upload, process, index document.
    Args:
        request["name"]: Name of document
        file: File upload
    Return:
        document_id: Unique id of document
    """
    data = await request.form()
    documentId = data.get("id", "NoName")
    newFilename = documentId + '.' + file.filename.split('.')[-1]
    newFilename = os.path.join(UPLOAD_PATH, newFilename)
    os.makedirs(UPLOAD_PATH, exist_ok=True)
    
    with open(newFilename, "wb") as f:
        f.write(file.file.read())

    return {
        "document_id": engineSession.add_document(documentId=documentId, documentPath=newFilename)
    }   

@router.delete("/{documentId}")
async def delete_document(documentId: str) -> Any:
    """
    Delete document
    """
    engineSession.delete_document(documentId)


@router.delete("/")
async def delete_all_documents() -> Any:
    """
    Delete all documents
    """
    engineSession.vectordb.delete_all_documents()
    return GeneralResponse(message="ok")