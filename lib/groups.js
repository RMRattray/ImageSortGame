import { promises as fs } from 'fs';

export async function getImageJSONData() {
    const file = await fs.readFile(process.cwd() + '/public/images.json', 'utf8');
    return file;
}