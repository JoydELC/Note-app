import React, { useState } from 'react';

function ActiveNotesList({ activeNotes, onArchiveNote, onUpdateNote, onDeleteNote }) {
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
<div className="notes-container">
  <h2>Active Notes</h2>
  <ul className="notes-list">
    {activeNotes.map((note) => (
      <div className="note-container" key={note.id}>
        {editingNoteId === note.id ? (
          <form onSubmit={() => handleUpdateNote(note.id)}>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
            <button type="submit">Save</button>
          </form>
        ) : (
<div className="note-content">
  <div className="title-container">
    <strong>{note.title}</strong>
  </div>
  <div className="content-container">
    <p>{note.content}</p>
  </div>
  <div className="button-container">
    <button onClick={() => handleEditNote(note.id, note.title, note.content)}>Edit</button>
    <button onClick={() => onArchiveNote(note.id)}>Archive</button>
    <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
  </div>
</div>

        )}
      </div>
    ))}
  </ul>
</div>

  );
}

export default ActiveNotesList;
