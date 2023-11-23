import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { getSnippets } from '@/lib/snippets';

type Snippet = Record<string, any>;

export function useSnippets() {
  const [snippets, setSnippets] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSnippets()!;
        // Add the non-null assertion here
        setSnippets(data);
      } catch (error) {
        console.error('Failed to fetch snippets:', error);
      }
    };

    fetchData();
  }, []);

  // Explicitly type the setSnippets function
  const setSnippetsState: Dispatch<SetStateAction<Record<string, any>[]>> = setSnippets;

  return { snippets, setSnippets: setSnippetsState };
}
