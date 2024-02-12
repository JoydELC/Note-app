// NoteForm.js
import React, { useState } from 'react';

function NoteForm({ onCreateNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateNote({
      title,
      content,
      archived: false,
    });
    setTitle('');
    setContent('');
  };

  return (
<form onSubmit={handleSubmit}>
  <div className="input-container">
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div className="input-container">
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  </div>
  <button className="create-note" type="submit">Create Note</button>
</form>

  );
}

export default NoteForm;
