from typing import Any

class BaseVectorDB:
    @classmethod
    def from_document(cls, documentId: str) -> Any:
        raise NotImplemented 

    @classmethod
    def create_document(cls, documentPath: str, documentId: str) -> str:
        raise NotImplemented 

    @classmethod
    def list_documents(cls):
        raise NotImplemented 

    @classmethod
    def delete_document(cls, documentId: str):
        raise NotImplemented 

    @classmethod
    def clear_db(cls):
        raise NotImplemented 