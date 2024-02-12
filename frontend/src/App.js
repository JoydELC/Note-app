import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import ActiveNotesList from './components/ActiveNotesList';
import ArchivedNotesList from './components/ArchivedNotesList';
import notesAPI from './services/api';
import './styles/styles.css'

function App() {
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeNotesData = await notesAPI.getActiveNotes();
        const archivedNotesData = await notesAPI.getArchivedNotes();
        setActiveNotes(activeNotesData);
        setArchivedNotes(archivedNotesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const createNewNote = async (note) => {
    try {
      const createdNote = await notesAPI.createNote(note);
      setActiveNotes([...activeNotes, createdNote]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const archiveNote = async (noteId) => {
    try {
      await notesAPI.toggleArchiveNote(noteId);
      const updatedActiveNotes = activeNotes.filter((note) => note.id !== noteId);
      const archivedNote = activeNotes.find((note) => note.id === noteId);
      setArchivedNotes([...archivedNotes, archivedNote]);
      setActiveNotes(updatedActiveNotes);
    } catch (error) {
      console.error('Failed to archive note:', error);
    }
  };

  const setActiveNote = async (noteId) => {
    try {
      await notesAPI.toggleArchiveNote(noteId);
      const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== noteId);
      const activeNote = archivedNotes.find((note) => note.id === noteId);
      setActiveNotes([...activeNotes, activeNote]);
      setArchivedNotes(updatedArchivedNotes);
    } catch (error) {
      console.error('Failed to set note as active:', error);
    }
  };

  const updateNote = async (noteId, title, content, archived) => {
    try {
      await notesAPI.updateNote(noteId, title, content); 
      const updatedActiveNotes = activeNotes.map((note) =>
        note.id === noteId ? { ...note, title, content } : note
      );
      const updatedArchivedNotes = archivedNotes.map((note) =>
        note.id === noteId ? { ...note, title, content } : note
      );
      setActiveNotes(updatedActiveNotes);
      setArchivedNotes(updatedArchivedNotes);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await notesAPI.deleteNote(noteId);
      const updatedActiveNotes = activeNotes.filter((note) => note.id !== noteId);
      const updatedArchivedNotes = archivedNotes.filter((note) => note.id !== noteId);
      setActiveNotes(updatedActiveNotes);
      setArchivedNotes(updatedArchivedNotes);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
<div className="app-container">
  <h1>Note App</h1>
  <NoteForm onCreateNote={createNewNote} />
  <div className="notes-container">
    <ActiveNotesList activeNotes={activeNotes} onArchiveNote={archiveNote} onUpdateNote={updateNote} onDeleteNote={deleteNote} />
    <ArchivedNotesList archivedNotes={archivedNotes} onSetActiveNote={setActiveNote} onUpdateNote={updateNote} onDeleteNote={deleteNote} />
  </div>
</div>

  );
}

export default App;
