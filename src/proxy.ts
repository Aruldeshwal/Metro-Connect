import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/*
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/api/webhook(.*)',
  '/contact',
  '/privacy',
  '/conditions',
]);

const isSignUpRoute = createRouteMatcher([
  '/details',
  '/set-route',
  '/signup(.*)',
]);

const isLoginRoute = createRouteMatcher([
  '/login(.*)',
]);
*/

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

/*
 if (
  !isPublicRoute(req) &&
  !isSignUpRoute(req) &&
  !userId
) {
    const redirectUrl = new URL('/signup', req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  if ((isSignUpRoute(req) || isLoginRoute(req)) && userId) {
    const redirectUrl = new URL('/dashboard', req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }*/

});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
  ],
};
