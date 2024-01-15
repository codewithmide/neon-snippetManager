import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

export const getSnippets = async (user_id: string | null) => {
    if (!databaseUrl) {
      console.error("DATABASE_URL is not defined.");
      return [];
    }
  
    const sql = neon(databaseUrl);
    try {
        const response = await sql`SELECT * FROM snippets WHERE user_id = ${user_id || ''} ORDER BY id DESC`;
        return response;
    } catch (error) {
        console.error("Error fetching snippets:", error);
        return [];
    }
};

export const addSnippet = async (title: string, snippet: string, user_id: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);
  const response = await sql`INSERT INTO snippets (title, snippet, user_id) VALUES (${title}, ${snippet}, ${user_id}) RETURNING *`;
  return response;
};

export const deleteSnippet = async (id: number) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return;
  }
  const sql = neon(databaseUrl);
  try {
    const response = await sql`DELETE FROM snippets WHERE id = ${id}`;
    return response;
  } catch (error) {
    console.error("Error deleting snippet:", error);
  }
};