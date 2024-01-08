import os
from typing import Any

from fastapi import APIRouter, HTTPException, UploadFile, Request

from app.models import DocumentIn, GeneralResponse
from app.core.engine.engine import add_document, get_all_documents

UPLOAD_PATH = "uploads/"
router = APIRouter()

@router.get("/")
def read_documents(

) -> Any:
    """
    Retrieve all documents
    """
    documents = get_all_documents()
    document_names = [document.name for document in documents]
    print(document_names)
    return document_names

@router.post("/upload")
async def upload_document(request: Request, file: UploadFile) -> Any:
    """
    """
    data = await request.form()
    name = data.get("name")
    with open(os.path.join(UPLOAD_PATH, file.filename), "wb") as f:
        f.write(file.file.read())

    return {
        "filename": file.filename,
        "document_id": add_document(name, file.filename)
    }   
