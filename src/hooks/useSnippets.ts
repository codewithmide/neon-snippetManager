import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { getSnippets } from '@/lib/snippets';
import { useUser } from "@clerk/nextjs";

type Snippet = Record<string, any>;

export function useSnippets() {
  const [snippets, setSnippets] = useState<Record<string, any>[]>([]);
  const setSnippetsState: Dispatch<SetStateAction<Record<string, any>[]>> = setSnippets;
  const [userId, setUserId] = useState<string | null>(null);
  const user = useUser();

  useEffect(() => {
    setUserId(user?.user?.id || null);
}, [user]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getSnippets(userId);
      setSnippets(data || []);
    } catch (error) {
      console.error('Failed to fetch snippets:', error);
    }
  };

  fetchData();
}, [userId, setSnippets]);


  return { snippets, setSnippets: setSnippetsState };
}