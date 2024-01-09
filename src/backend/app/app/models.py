from typing import Union

from fastapi import UploadFile
from pydantic import BaseModel

class GeneralResponse(BaseModel):
    message: str 

class Document(BaseModel):
    id: int

class QuestionModel(BaseModel):
    document_id: str
    question: str

class DocumentIn(BaseModel):
    name: str

class UserQuestionIn(BaseModel):
    document_id: str
    question: str 

class AnswerOut(BaseModel):
    answer: str
