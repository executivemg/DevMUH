import { NextResponse } from "next/server";

const isDevServer = process.env.DEVELOPMENT_SERVER === "true" || false;

console.log('is development server: ', isDevServer);

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
	const path = request.nextUrl.pathname;
	const isPath = path === "/login" || path === "/signup";
	const token = request.cookies.get(isDevServer?
		'next-auth.session-token' :
		'__Secure-next-auth.session-token '
	);
	if (isPath && token) {
		return NextResponse.rewrite(new URL("/", request.url));
	}

	if (path === "/create-event" && !token) {
		return NextResponse.rewrite(new URL("/signup", request.url));
	}
	if (path === "/organizer" && !token) {
		return NextResponse.rewrite(new URL("/login", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/login", "/create-event", "/signup", "/organizer"],
};
