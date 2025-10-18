import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function POST(request: Request) {
  try {
    const { password, booksData } = await request.json();

    // Basic authentication check (for development simplicity)
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.ts');
    let fileContent = await readFile(dataFilePath, 'utf-8');

    // Find the rawBooks array and replace its content
    const rawBooksRegex = /(export const rawBooks: Book\[\] = )(\[\s*[\s\S]*?\s*\];)/;
    const newBooksJson = JSON.stringify(booksData, null, 2);

    if (rawBooksRegex.test(fileContent)) {
      fileContent = fileContent.replace(rawBooksRegex, `$1${newBooksJson};`);
    } else {
      // If rawBooks array is not found, append it (shouldn't happen if file structure is stable)
      console.warn("rawBooks array not found in data.ts, appending it.");
      fileContent += `\n\nexport const rawBooks: Book[] = ${newBooksJson};\n`;
    }

    await writeFile(dataFilePath, fileContent, 'utf-8');

    return NextResponse.json({ message: 'Books data updated successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to update books data:', error);
    return NextResponse.json({ error: error.message || 'Failed to update books data' }, { status: 500 });
  }
}