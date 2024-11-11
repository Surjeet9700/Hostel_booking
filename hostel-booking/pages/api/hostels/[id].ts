import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const response = await fetch(`http://localhost:4000/api/hostels/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hostel details: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching hostel details:', error);
    res.status(500).json({ error: 'Failed to fetch hostel details' });
  }
}