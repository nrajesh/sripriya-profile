import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  // In a real application, you would hash this password and compare it securely.
  // For this example, we're using a simple environment variable.
  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ authenticated: true });
  } else {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}