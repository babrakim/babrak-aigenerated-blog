import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { fileName } = req.query;

  try {
    // Assuming your JSON files are stored in a 'data' directory
    const filePath = path.join(process.cwd(), 'content', `${fileName}.json`);

    // Read the file content asynchronously using fs.promises.readFile
    const fileContent = await fs.promises.readFile(filePath, 'utf8');

    // Parse the JSON content
    const data = JSON.parse(fileContent);

    res.status(200).json({ content: data });
  } catch (error) {
    console.error('Failed to read file', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
}
