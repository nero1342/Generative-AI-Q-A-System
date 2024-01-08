from fastapi import APIRouter, HTTPException

from app.models import QuestionModel
from app.core.engine.engine import get_answer 

router = APIRouter()

@router.post("/answer_question")
async def answer_question(req: QuestionModel):
    print(req)
    return {"answer": get_answer(req.question, req.document_id)}

