import os 
os.environ["ALLOW_RESET"] = "TRUE"

from typing import Any
import chromadb 
import logging 

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter

from .base import BaseVectorDB


logger = logging.getLogger(__name__)

class ChromaDB(BaseVectorDB):
    DB_STORAGE_PATH = "./chroma_db"
    client = chromadb.PersistentClient(DB_STORAGE_PATH)

    @classmethod
    def from_document(cls, documentId: str) -> Any:
        """
        """
        logger.info(f"Getting Chroma VecDB with id {documentId}")

        return Chroma(
            client=cls.client,
            collection_name=documentId,
            embedding_function=OpenAIEmbeddings(),
        )


    @classmethod
    def add_document(cls, documentId: str, documentPath: str) -> str:
        """
        Read PDF, split it's content and save all document into vector database
        Args:
            document_path: [str] Local path to the document
            document_name: [str] Name of the document
        Return:
            document_id: [str]
        """
        logger.info(f"Adding into Chroma VecDB with document id {documentId} from {documentPath}")

        # Load and process PDF
        loader = PyPDFLoader(documentPath)
        documents = loader.load()
        text_splitter = CharacterTextSplitter(separator='\n', chunk_size=2000, chunk_overlap=500)
        docs = text_splitter.split_documents(documents)
        
        metadata = {
            "documentPath": documentPath
        }
        # Store them to VectorDB
        vector_db = Chroma.from_documents(
            docs,
            OpenAIEmbeddings(),
            collection_name=documentId,
            persist_directory=cls.DB_STORAGE_PATH,
            collection_metadata=metadata
        )
        return documentId
    

    @classmethod
    def list_all_documents(cls):
        return cls.client.list_collections()
    
    @classmethod
    def delete_document(cls, documentId):
        document = cls.client.get_collection(documentId) 
        documentPath = document.metadata["documentPath"]
        os.remove(documentPath)
        cls.client.delete_collection(documentId)

    @classmethod
    def delete_all_documents(cls):
        documentPaths = [document.metadata["documentPath"] for document in cls.list_all_documents()]

        logger.info(f"Removing paths: {documentPaths}")
        
        [os.remove(documentPath) for documentPath in documentPaths]
        cls.client.reset()