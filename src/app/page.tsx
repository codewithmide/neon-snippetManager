"use client"

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getSnippets, addSnippet, deleteSnippet } from "@/lib/snippets";
import SnippetForm from "@/components/snippetForm";
import SnippetList from "@/components/snippetList";
import { useSnippets } from "@/hooks/useSnippets";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const user = useUser();
  const { snippets, setSnippets } = useSnippets();

  const fetchData = async () => {
    try {
      const user_id = user?.user?.id || null;
      const data = await getSnippets(user_id);
      setSnippets(data || []);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setSnippets, fetchData]);  

  const handleAddSnippet = async (title: string, snippet: string, userId: string) => {
    try {
      const response = await addSnippet(title, snippet, userId);
      if (response) {
        setSnippets((prevSnippets) => [...response, ...prevSnippets]);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Failed to add snippet:", error);
    };
  };
    

  const handleDeleteSnippet = async (id: number) => {
    try {
      await deleteSnippet(id);
      setSnippets(snippets.filter(snippet => snippet.id !== id));
    } catch (error) {
      console.error("Failed to delete snippet:", error);
    }
  };
  
  return (
    <div className="w-full min-h-screen font-bold font-sansSerif bg-black overflow-x-hidden flex-col flex items-center gap-16">
      {/* Header */}
      <nav className="w-11/12 border-white border-b py-6 flex items-center justify-between">
        <div className="tracking-wide text-xl font-semibold">SnippetHive</div>
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      {/* Header Ends */}

      {/* Body */}
      <main className="flex justify-between w-11/12">
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
          <SnippetList onDelete={handleDeleteSnippet} snippets={snippets} />
        </div>
      </main>
      {/* Body Ends */}
    </div>
  )
}