# from typing import List, Any

# from langchain_core.output_parsers import StrOutputParser
# from langchain_core.runnables import RunnablePassthrough
# from langchain.prompts import ChatPromptTemplate
# from langchain_community.chat_models import ChatOpenAI
# from langchain_community.document_loaders import PyPDFLoader

# from app.core.vectordb import VectorDB

# template = """
# Context information is below.
# -----------------------------
# {context}
# -----------------------------
# Given the context information and not prior knowledge, answer the question.
# Question: {question}
# Answer: 
# """
# prompt = ChatPromptTemplate.from_template(template)
# model = ChatOpenAI()


# def get_answer(question: str, documentId: str):
#     retriever = VectorDB.from_document(documentId).as_retriever(k = 5) 

#     chain = (
#         {"context": retriever, "question": RunnablePassthrough()}
#         | prompt
#         | model 
#         | StrOutputParser()
#     )
#     return chain.invoke(question)


# def add_document(documentId: str, documentPath: str) -> str:
#     """
#     Process document, index and store in a vector database
#     """
#     document_id = VectorDB.create_document(documentPath, documentId)  
#     return document_id


# def delete_document(documentId: str):
#     VectorDB.delete_document(documentId) 
#     # Remove file 

# def get_all_documents() -> List[Any]:
#     return VectorDB.list_documents() 
