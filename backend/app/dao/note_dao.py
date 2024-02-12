# note_dao.py
from typing import List
from app.models.note import Note
from app.db import database

async def create_note_dao(note: Note) -> Note:
    query = "INSERT INTO notes (title, content, archived) VALUES (:title, :content, :archived) RETURNING id, title, content, archived;"
    values = {"title": note.title, "content": note.content, "archived": note.archived}
    return await database.fetch_one(query=query, values=values)

async def get_active_notes_dao() -> List[Note]:
    query = "SELECT * FROM notes WHERE archived = False;"
    return await database.fetch_all(query=query)

async def get_archived_notes_dao() -> List[Note]:
    query = "SELECT * FROM notes WHERE archived = True;"
    return await database.fetch_all(query=query)

async def delete_note_by_id_dao(note_id: int):
    query = "DELETE FROM notes WHERE id = :id RETURNING id;"
    values = {"id": note_id}
    return await database.execute(query=query, values=values)

async def toggle_archive_note_by_id_dao(note_id: int):
    query = "UPDATE notes SET archived = NOT archived WHERE id = :id RETURNING id, title, content, archived;"
    values = {"id": note_id}
    return await database.fetch_one(query=query, values=values)

async def update_note_by_id_dao(note_id: int, title: str, content: str, archived: bool):
    query = "UPDATE notes SET title = :title, content = :content, archived = :archived WHERE id = :id RETURNING id, title, content, archived;"
    values = {"id": note_id, "title": title, "content": content, "archived": archived}
    return await database.fetch_one(query=query, values=values)
