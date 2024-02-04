import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (accessToken) {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image).*)'
    '/',
    '/auth/login',
    '/auth/register',
  ],
};
