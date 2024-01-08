from typing import List

from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts import ChatPromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader

from app.core.vectordb import VectorDB

template = """
Context information is below.
-----------------------------
{context}
-----------------------------
Given the context information and not prior knowledge, answer the question.
Question: {question}
Answer: 
"""
prompt = ChatPromptTemplate.from_template(template)
model = ChatOpenAI()


def get_answer(question: str, document_id: str):
    retriever = VectorDB.from_document(document_id).as_retriever(k = 5) 

    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | model 
        | StrOutputParser()
    )
    return chain.invoke(question)

def add_document(document_name: str, document_path: str) -> str:
    """
    """
    document_id = VectorDB.create_document(document_path, document_name)  
    return document_id

def get_all_documents() -> List[str]:
    return VectorDB.list_documents() 
