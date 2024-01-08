from typing import Any

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
import chromadb 

class VectorDB:
    @classmethod
    def from_document(cls, document_id: str) -> Any:
        # TODO: Check if document_id exists or not  
        persistent_client = chromadb.PersistentClient("./chroma_db")
        print(persistent_client.list_collections())
        return Chroma(
            client=persistent_client,
            collection_name=document_id,
            embedding_function=OpenAIEmbeddings()
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
        # docs = loader.load_and_split()
        documents = loader.load()
        text_splitter = CharacterTextSplitter(separator='\n', chunk_size=2000, chunk_overlap=500)
        docs = text_splitter.split_documents(documents)
        print("Num docs:", len(docs))
        document_id = document_name # Need to be change (maybe to UUID)
        vector_db = Chroma.from_documents(
            docs,
            OpenAIEmbeddings(),
            collection_name=document_id,
            persist_directory="./chroma_db"
        )
        return document_id
    
    @classmethod
    def list_documents(cls):
        client = chromadb.PersistentClient(path="./chroma_db")
        return client.list_collections()