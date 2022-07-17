import { NextResponse } from 'next/server';
import { parseCookies } from '../utils/parseCookies';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const cookies = parseCookies(req);

  const token = req.cookies.token;

  // console.log(token);
  if (pathname.includes('/api')) {
    return NextResponse.next();
  }
  if (!pathname.includes('/auth') && !token) {
    return NextResponse.redirect('/auth/login');
  } else if (pathname.includes('/auth') && token) {
    return NextResponse.redirect('/');
  }
}
