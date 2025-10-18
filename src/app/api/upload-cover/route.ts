import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'covers');
    const filePath = path.join(uploadDir, uniqueFileName);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file to the public/covers directory
    await writeFile(filePath, buffer);

    // Construct the public URL for the uploaded file
    const publicUrl = `/covers/${uniqueFileName}`;

    return NextResponse.json({ publicUrl }, { status: 200 });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}