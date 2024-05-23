"use client";

import { Inter } from "next/font/google";
import Head from 'next/head';
import "./globals.css";
import "./App.css"
import Layout from "@/components/layout/layout";
const inter = Inter({ subsets: ["latin"] });
import { FilterContextProvider } from "@/context/FilterContext";
import { CartProvider } from "@/context/CartContext";
import { PopupProvider } from "@/context/PopupContext";
import Provider from "@/components/provider/provider";
// REDUX
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store'; 
// NEXT-UI
import { NextUIProvider } from "@nextui-org/react";

// export const metadata = {
//   title: "Event Rush | Rana Event",
//   description: "Event Rush is an event planner/management platform for creating and hosting events",
// };

export default function RootLayout({ children }) {
  return (
    <html className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-100" lang="en">
      <Head>
        <title>Event Rush | Rana Event</title>
        <meta name="description" content="Event Rush is an event planner/management platform for creating and hosting events" />
      </Head>

      <link rel="icon" href="/image/logoer.avif" sizes="any" />
      <body className={inter.className}>
        <NextUIProvider>
          <ReduxProvider store={store}>
            <Provider>
              <PopupProvider>
                <CartProvider>
                  <FilterContextProvider>
                    <Layout>
                      {children}
                    </Layout>
                  </FilterContextProvider>
                </CartProvider>
              </PopupProvider>
            </Provider>
          </ReduxProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
