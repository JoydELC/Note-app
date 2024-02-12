import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
});

const notesAPI = {
  createNote: async (note) => {
    try {
      const response = await api.post('/notes/', note);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create note: ${error}`);
    }
  },
  
  getActiveNotes: async () => {
    try {
      const response = await api.get('/notes/active/');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch active notes: ${error}`);
    }
  },

  getArchivedNotes: async () => {
    try {
      const response = await api.get('/notes/archived/');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch archived notes: ${error}`);
    }
  },

  deleteNote: async (noteId) => {
    try {
      const response = await api.delete(`/notes/${noteId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete note with id ${noteId}: ${error}`);
    }
  },

  toggleArchiveNote: async (noteId) => {
    try {
      const response = await api.put(`/notes/${noteId}/archive_toggle`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to toggle archive for note with id ${noteId}: ${error}`);
    }
  },

  updateNote: async (noteId, title, content, archived) => {
    try {
      const response = await api.put(`/notes/${noteId}`, { title, content, archived });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update note with id ${noteId}: ${error}`);
    }
  },
  
  
};

export default notesAPI;
