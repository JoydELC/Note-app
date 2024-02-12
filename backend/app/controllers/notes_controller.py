# notes_controller.py
from fastapi import APIRouter, HTTPException
from app.services.notes_service import create_new_note, get_active_user_notes, get_archived_user_notes, delete_note_by_id, toggle_archive_note_by_id, update_note_by_id
from app.models.note import Note

router = APIRouter()

@router.post("/notes/")
async def create_note(note: Note):
    created_note = await create_new_note(note)
    return created_note

@router.get("/notes/active/")
async def get_active_notes():
    return await get_active_user_notes()

@router.get("/notes/archived/")
async def get_archived_notes():
    return await get_archived_user_notes()

@router.delete("/notes/{note_id}")
async def delete_note(note_id: int):
    deleted_note_id = await delete_note_by_id(note_id)
    if deleted_note_id:
        return {"message": f"Note with id {note_id} deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail=f"Note with id {note_id} not found")


@router.put("/notes/{note_id}/archive_toggle")
async def toggle_archive(note_id: int):
    toggled_note = await toggle_archive_note_by_id(note_id)
    if toggled_note:
        return toggled_note
    else:
        raise HTTPException(status_code=404, detail=f"Note with id {note_id} not found")

@router.put("/notes/{note_id}")
async def update_note(note_id: int, note: Note):
    updated_note = await update_note_by_id(note_id, note)
    if updated_note:
        return updated_note
    else:
        raise HTTPException(status_code=404, detail=f"Note with id {note_id} not found")
