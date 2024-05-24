"use client";

import {
  Agenda,
  Banner,
  Footer,
  Header,
  Highlights,
  ImgBanner,
  MarqueeTxt,
  MarqueeImgs,
  ProductCarousel,
  Testimonials,
  Upcoming,
  UpcomingEvent,
  VideoCont,
} from "@/components";
import "./globals.css";
import data from "../constant/data.json";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Header />
      <Banner video={data.videos.video1} className={"mt-14"} />
      <div className="mt-10 overflow-x-hidden">
        <ImgBanner src="/upcomingBanner.png" className="" />
        <ProductCarousel className="pt-16" />
        <ProductCarousel className="pt-20" />

        {/* <Upcoming /> */}
        <VideoCont />
        <ProductCarousel className="pt-24" />
        <MarqueeTxt />
        <Banner video={data.videos.video2} className="mt-20" />
        {/* <UpcomingEvent /> */}
        <Highlights className="pt-16" />
        <MarqueeTxt />
        <Banner video={data.videos.video3} className="mt-24" />
        <ProductCarousel className="pt-24" />
        <MarqueeImgs />
        {/* <Testimonials /> */}
        {/* <Agenda /> */}
      </div>
      <Footer />
    </>
  );
}
