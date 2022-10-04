import type {NextRequest} from 'next/server';
import {getCookie} from '@utils/middleware.util';

export function middleware(req: NextRequest) {
  const {pathname, searchParams, hostname} = req.nextUrl;

  console.log(pathname, searchParams, hostname);

  const base = getCookie(req.headers);

  console.log(base);
  // return new Response('Hello, world!');
}
