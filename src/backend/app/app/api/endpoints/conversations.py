from fastapi import APIRouter, HTTPException

from app.models import UserQuestionIn, AnswerOut
from app.core.engine import engineSession 

router = APIRouter()

@router.post("/answer_question", response_model=AnswerOut)
async def answer_question(req: UserQuestionIn):
    return AnswerOut(answer=engineSession.get_answer(question=req.question, documentId=req.document_id))

