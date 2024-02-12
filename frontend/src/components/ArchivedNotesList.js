import React, { useState } from 'react';

function ArchivedNotesList({ archivedNotes, onSetActiveNote, onUpdateNote, onDeleteNote }) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEditNote = (noteId, title, content) => {
    setEditingNoteId(noteId);
    setEditedTitle(title);
    setEditedContent(content);
  };

  const handleUpdateNote = async (noteId) => {
    try {
      await onUpdateNote(noteId, editedTitle, editedContent); 
      setEditingNoteId(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await onDeleteNote(noteId);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
<div className='notes-container'>
  <h2>Archived Notes</h2>
  <ul className='notes-list'>
    {archivedNotes.map((note) => (
      <div className="arc-note-container" key={note.id}>
        <div className="note-content">
          <div className="title-container">
            <strong>{note.title}</strong>
          </div>
          <div className="arc-content-container">
            <p>{note.content}</p>
          </div>
          <div className="arc-button-container">
            <button onClick={() => handleEditNote(note.id, note.title, note.content)}>Edit</button>
            <button onClick={() => onSetActiveNote(note.id)}>Active</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        </div>
      </div>
    ))}
  </ul>
</div>

  );
}

export default ArchivedNotesList;
