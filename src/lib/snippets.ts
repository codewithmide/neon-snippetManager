import { neon } from '@neondatabase/serverless';

// An async function to get snippets
export async function getSnippets() {
  const databaseUrl = "postgresql://codewithmide:9QPrwx3bsYnh@ep-solitary-tooth-79977739.us-east-2.aws.neon.tech/neondb";

  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return [];
  }

  const sql = neon(databaseUrl);

  try {
    const response = await sql`SELECT * FROM snippets ORDER BY id DESC`;
    return response;
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return [];
  }
}

// An async function to add snippets
export async function addSnippet(title: string, snippet: string) {
  const databaseUrl = "postgresql://codewithmide:9QPrwx3bsYnh@ep-solitary-tooth-79977739.us-east-2.aws.neon.tech/neondb";

  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }

  const sql = neon(databaseUrl);

  const response = await sql`INSERT INTO snippets (title, snippet) VALUES (${title}, ${snippet}) RETURNING *`;
  return response;
}
