import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  return createMiddleware({
    locales: ['it', 'en', 'uk'],
    defaultLocale: 'it',
  })(request);
}

export const config = {
  matcher: ['/', '/(it|en|uk)/:path*'],
};
