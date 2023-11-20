import { Pool } from 'pg';
import type { NextApiRequest, NextApiResponse } from 'next';

// Create a new Pool object with SSL configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Adjust this based on your security requirements
  },
});

// Define the SnippetItem type
interface SnippetItem {
  id: string;
  title: string;
  snippet: string;
}

// Define the Data type
type Data = SnippetItem[] | { message: string };

// Export the default handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { title, snippet } = req.body;
        const { rows } = await pool.query('INSERT INTO snippets (title, snippet) VALUES ($1, $2) RETURNING id, title, snippet', [title, snippet]);
        res.status(201).json(rows[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
