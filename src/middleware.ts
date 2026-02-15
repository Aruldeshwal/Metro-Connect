// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; // Import NextResponse

// Define your public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/details',
  '/set-route',
  '/about',
  '/api(.*)',
  '/contact',
  '/privacy',
  '/conditions'
]);

// Export the default middleware function
export default clerkMiddleware(async (auth, req) => {
  // Check if the current route is not public AND the user is not authenticated
  const user = await auth();
  if (!isPublicRoute(req) && !user.userId) {
    // Perform a redirect to the sign-up page
    const redirectUrl = new URL('/signup', req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }
});

// Configure which paths the middleware applies to
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
  ],
};