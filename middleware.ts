import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) auth().protect();
});

const isProtectedRoute = createRouteMatcher([
	'/dashboard',
	'/settings',
	'/code',
	'/music',
	'/video',
	'/conversation',
	'/image',
]);

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
