from typing import Any

from langchain_community.vectorstores import Milvus
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader

from pymilvus import connections, utility

class VectorDB:
    @classmethod
    def from_document(cls, document_id: str) -> Any:
        # TODO: Check if document_id exists or not  
        connections.connect(host='127.0.0.1',port="19530")
        
        return Milvus(
            OpenAIEmbeddings(),
            collection_name=document_id,
            connection_args={"host": "127.0.0.1", "port": "19530"},
        )
    
    @classmethod
    def create_document(cls, document_path: str, document_name: str) -> str:
        """
        Read PDF, split it's content and save all document into vector database
        Args:
            document_path: [str] Local path to the document
            document_name: [str] Name of the document
        Return:
            document_id: [str]
        """
        loader = PyPDFLoader(document_path)
        docs = loader.load_and_split()
        # documents = loader.load()
        # text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        # docs = text_splitter.split_documents(documents)

        document_id = document_name # Need to be change (maybe to UUID)
        vector_db = Milvus.from_documents(
            docs,
            OpenAIEmbeddings(),
            collection_name=document_id,
            connection_args={"host": "127.0.0.1", "port": "19530"},
        )
        return document_id
    
    @classmethod
    def list_documents(cls):
        connections.connect(host='127.0.0.1',port="19530")
        return utility.list_collections()