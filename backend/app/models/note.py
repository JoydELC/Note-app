from pydantic import BaseModel

class Note(BaseModel):
    id: int = None
    title: str
    content: str
    archived: bool = False
