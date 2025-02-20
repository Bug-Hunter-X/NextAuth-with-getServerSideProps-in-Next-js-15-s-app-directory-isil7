```javascript
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  }
};

export default NextAuth(authOptions);
```
```javascript
// app/middleware.js
import { NextResponse } from 'next/server';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export async function middleware(req) {
  const session = await unstable_getServerSession(req, req.nextUrl, authOptions);

  if (!session && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Continue to the page
}

export const config = {
  matcher: ['/about']
};
```
```javascript
// app/about/page.js
import { session } from 'next-auth/client';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>Logged in as: {session?.user?.email}</p>
    </div>
  );
}
```