import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'content');

  try {
    const fileNames = fs.readdirSync(directoryPath)
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => fileName.replace('.json', ''));
    
    res.status(200).json({ files: fileNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch file list' });
  }
}
