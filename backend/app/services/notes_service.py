# notes_service.py
from typing import List
from app.models.note import Note
from app.dao.note_dao import create_note_dao, get_active_notes_dao, get_archived_notes_dao, delete_note_by_id_dao, toggle_archive_note_by_id_dao, update_note_by_id_dao

async def create_new_note(note: Note) -> Note:
    return await create_note_dao(note)

async def get_active_user_notes() -> List[Note]:
    return await get_active_notes_dao()

async def get_archived_user_notes() -> List[Note]:
    return await get_archived_notes_dao()

async def delete_note_by_id(note_id: int) -> int:
    return await delete_note_by_id_dao(note_id)

async def toggle_archive_note_by_id(note_id: int) -> Note:
    return await toggle_archive_note_by_id_dao(note_id)

async def update_note_by_id(note_id: int, note: Note) -> Note:
    return await update_note_by_id_dao(note_id, note.title, note.content, note.archived)

