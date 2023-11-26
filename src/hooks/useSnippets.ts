import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import { getSnippets } from '@/lib/snippets';

type Snippet = Record<string, any>;

export function useSnippets() {
  const [snippets, setSnippets] = useState<Record<string, any>[]>([]);

  // Explicitly type the setSnippets function
  const setSnippetsState: Dispatch<SetStateAction<Record<string, any>[]>> = setSnippets;

  return { snippets, setSnippets: setSnippetsState };
}
