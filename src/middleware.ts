// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define your public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher([
  '/',                   // Your main landing page (if public)
  '/login(.*)',           // Ensure this EXACT pattern for login
  '/signup(.*)',          // Ensure this EXACT pattern for signup
  '/newuser(.*)',         // And for your new user onboarding page
  '/api/webhooks/clerk',   // And your webhook endpoint
  // Add any other routes that should be accessible without authentication
]);

// Export the default middleware function
export default clerkMiddleware(async (auth, req) => {
  const user = await auth();
  console.log('--- Middleware Log ---');
  console.log('Request Path:', req.nextUrl.pathname); // Log the incoming path
  console.log('Is Public Route?:', isPublicRoute(req)); // Log the evaluation result
  console.log('User ID:', user.userId); // Log user ID (will be null for unauthenticated)
  console.log('--- End Middleware Log ---');

  // If the current route is NOT a public route, protect it
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

// Configure which paths the middleware applies to
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)',
  ],
};