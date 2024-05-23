"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

/* export const metadata = {
  title: "Event Rush | Rana Event",
  description: "Event Rush is an event planner/management platform for creating and hosting events",
}; */

export default function RootLayout({ children }) {
  return (
    <html className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-100" lang="en">
      <Head>
        <title>Event Rush | Rana Event</title>
        <meta name="description" content="Event Rush is an event planner/management platform for creating and hosting events" />
        <link rel="icon" href="/image/logoer.avif" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Provider store={store}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
