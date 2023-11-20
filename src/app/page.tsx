"use client"

import { UserButton } from "@clerk/nextjs";
import { IoStar } from "react-icons/io5";
import { useState } from 'react';

export default function Home() {
  // Define state variables for snippet form
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');

  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE || '/api/snippets';

  // A function to handle snippet submission
  const handleSnippetSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, snippet }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save snippet: ${response.statusText}`);
      }

      console.log('Snippet saved successfully!');
    } catch (error) {
      console.error(error);
    }
  };
   

  // Function to fetch code snippets
  const fetchSnippets = async () => {
    try {
      const response = await fetch('/api/snippets');
      if (!response.ok) {
        throw new Error('Failed to fetch snippets');
      }
      const snippets = await response.json();
      return snippets;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <div className="w-full min-h-screen font-bold font-sansSerif bg-black overflow-x-hidden flex-col flex items-center gap-16">
      {/* Header */}
      <nav className="w-11/12 border-white border-b py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="tracking-wide">SnippetHive</div>
        </div>
        <div>
          <span className="font-bold">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <span>Star</span>{" "}
              <IoStar className="w-5 h-5 text-yellow-400"/>
              <span>on GitHub</span>
            </a>
          </span>
        </div>
      </nav>
      {/* Header Ends */}

      {/* Body */}
      <main className="flex items-center justify-between w-11/12">
        <div className="w-1/2 border-r border-white flex-col flex gap-6 pr-6">
          <h1 className="text-2xl">
            Save a code snippet
          </h1>
          <div>
            <form onSubmit={handleSnippetSubmit} method="post" className="flex flex-col items-start gap-4">
              <input type="text" name="title" id="title" placeholder="Enter your snippet title" className="w-full rounded-md p-3 text-black"/>
              <textarea name="snippet" id="snippet" rows={6} placeholder="Paste your code snippet" className="rounded-md w-full p-3 text-black"></textarea>
              <button type="submit" className="bg-white px-8 py-3 text-black font-semibold rounded-md">
                Save Snippet
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 flex-col min-h-max flex items-start gap-6 pl-6">
          <h1 className="text-2xl">
            My snippet(s)
          </h1>
        </div>
      </main>
      {/* Body Ends */}
    </div>
  )
}
