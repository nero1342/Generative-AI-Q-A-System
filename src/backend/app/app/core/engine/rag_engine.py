from typing import List, Any
import logging 

from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts import ChatPromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader

from .base import BaseEngine
from ..vectordb.chroma import ChromaDB

logger = logging.getLogger(__name__)

class EngineRAG(BaseEngine):
    def __init__(self, model, prompt, vectordb):
        super(BaseEngine).__init__()
        self.model = model
        self.prompt = prompt
        self.vectordb = vectordb
    
    def get_answer(self, question: str, documentId: str) -> str:
        logger.info(f"Query from document {documentId} with question: {question}")

        retriever = self.vectordb.from_document(documentId).as_retriever(k = 5) 

        chain = (
            {"context": retriever, "question": RunnablePassthrough()}
            | self.prompt
            | self.model 
            | StrOutputParser()
        )
        return chain.invoke(question)


    def add_document(self, documentId: str, documentPath: str):
        return self.vectordb.add_document(documentId=documentId, documentPath=documentPath)


    def delete_document(self, documentId: str):
        return self.vectordb.delete_document(documentId)


    def list_all_documents(self) -> List[str]:
        return self.vectordb.list_all_documents()    
    

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

engineSession = EngineRAG(
    model=ChatOpenAI(),
    prompt=ChatPromptTemplate.from_template(template),
    vectordb=ChromaDB
)