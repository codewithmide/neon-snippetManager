"use client"

import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { getSnippets, addSnippet } from "@/lib/snippets";
import SnippetForm from "@/components/SnippetForm";
import SnippetList from "@/components/SnippetList";
import { IoStar } from 'react-icons/io5';
import { useSnippets } from "@/hooks/useSnippets";

export default function Home() {
  const { snippets, setSnippets } = useSnippets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSnippets();
        setSnippets(data || []); // Provide an empty array as a default value
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      }
    };

    fetchData();
  }, [setSnippets]);

  const handleAddSnippet = async (title: string, snippet: string) => {
    try {
      const response = await addSnippet(title, snippet);
      setSnippets([response, ...snippets]);
    } catch (error) {
      console.error("Failed to add snippet:", error);
    }
  };
  


  return (
    <div className="w-full min-h-screen font-bold font-sansSerif bg-black overflow-x-hidden flex-col flex items-center gap-16">
      {/* Header */}
      <nav className="w-11/12 border-white border-b py-6 flex items-center justify-between">
        <div>
          <div className="tracking-wide">SnippetHive</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold">
            <a
              href="https://github.com/codewithmide/neon-snippetManager"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <span>Leave a</span>{" "}
              <IoStar className="w-5 h-5 text-yellow-400"/>
              <span>on GitHub</span>
            </a>
          </span>
          <UserButton afterSignOutUrl="/" />
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
            <SnippetForm onAddSnippet={handleAddSnippet} />
          </div>
        </div>
        <div className="w-1/2 flex-col min-h-max flex items-start gap-6 pl-6">
          <h1 className="text-2xl">
            My snippet(s)
          </h1>
          <SnippetList snippets={snippets} />
        </div>
      </main>
      {/* Body Ends */}
    </div>
  )
}