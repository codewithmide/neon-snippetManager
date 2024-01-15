"use client"

import React from 'react';

const SnippetList = ({ snippets, onDelete }: { snippets: any, onDelete: (id: number) => void }) => {

  // Function to copy the snippet to the clipboard
  const copyToClipboard = (snippet: string) => {
    navigator.clipboard.writeText(snippet).then(() => {
      alert("Copied");
    });
  };

  // Function to handle deleting a snippet
  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error("Failed to delete snippet:", error);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {snippets.map((snippet: any, id: number) => (
        <div key={id} className="bg-white text-black p-4 rounded shadow-md w-full">
          <p className="font-bold mb-2">{snippet.title}</p>
          <pre className="whitespace-pre-wrap text-sm bg-black text-white rounded p-3 mb-2">
            {snippet.snippet}
          </pre>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => copyToClipboard(snippet.snippet)}
              className="text-sm bg-gray-200 hover:bg-gray-300 rounded p-2 mr-2"
            >
              Copy
            </button>
            <button
              onClick={() => handleDelete(snippet.id)}
              className="text-sm bg-red-800 hover:bg-red-900 text-white rounded p-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SnippetList;