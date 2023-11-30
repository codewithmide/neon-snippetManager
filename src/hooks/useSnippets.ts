import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { getSnippets } from '@/lib/snippets';

type Snippet = Record<string, any>;

export function useSnippets() {
  const [snippets, setSnippets] = useState<Record<string, any>[]>([]);

  const setSnippetsState: Dispatch<SetStateAction<Record<string, any>[]>> = setSnippets;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSnippets();
        setSnippets(data || []);
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      }
    };

    fetchData();
  }, [setSnippets]);

  return { snippets, setSnippets: setSnippetsState };
}