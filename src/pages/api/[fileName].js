import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { fileName } = req.query;
  const filePath = path.join(process.cwd(), 'content', `${fileName}.json`);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent); // Parse the JSON content
    res.status(200).json(jsonData); // Send the parsed JSON data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
}
