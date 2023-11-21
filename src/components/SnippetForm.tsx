import React, { useState } from 'react';

const SnippetForm = ({ onAddSnippet }: { onAddSnippet: any }) => {
  const [title, setTitle] = useState('');
  const [snippet, setsnippet] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !snippet) {
      // Handle validation error
      return;
    }

    try {
      await onAddSnippet(title, snippet);
      // Clear form after successful submission
      setTitle('');
      setsnippet('');
    } catch (error) {
      console.error("Failed to add snippet:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter your snippet title"
          className="w-full rounded-md p-3 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="snippet"
          id="snippet"
          rows={6}
          placeholder="Paste your code snippet"
          className="rounded-md w-full p-3 text-black"
          value={snippet}
          onChange={(e) => setsnippet(e.target.value)}
        />
        <button type="submit" className="bg-white px-8 py-3 text-black font-semibold rounded-md">
          Save Snippet
        </button>
      </form>
    </div>
  );
};

export default SnippetForm;
