import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth((req) => {
  const { auth, nextUrl } = req;
  const isLoggedIn = !!auth?.user;
  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard) {
    if (isLoggedIn) return;
    return Response.redirect(new URL('/login', nextUrl));
  } else if (isLoggedIn) {
    if (nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\.png$).*)'],
};
