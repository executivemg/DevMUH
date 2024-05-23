"use client"

import { Agenda, Banner, Footer, Header, Highlights, ImgBanner, Marquee, MarqueeImgs, ProductCarousel, Testimonials, Upcoming, UpcomingEvent, VideoCont } from "@/components";
import "./globals.css"
import data from "../constant/data.json";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return <>
    <Header />
    <Banner video={data.videos.video1} className={"mt-14"} />
    <div className="mt-10 overflow-x-hidden">
      <ImgBanner src="/upcomingBanner.png" className="" />
      <ProductCarousel className="sm:pt-16 pt-20" />
      <ProductCarousel className="pt-20" />

      {/* <Upcoming /> */}
      <VideoCont />
      <ProductCarousel className="pt-52" />
      <Marquee />
      <Banner video={data.videos.video2} className="mt-52" />
      {/* <UpcomingEvent /> */}
      <Highlights />
      <Marquee />
      <Banner video={data.videos.video3} className="mt-44" />
      <ProductCarousel className="pt-52" />
      <MarqueeImgs />
      {/* <Testimonials /> */}
      {/* <Agenda /> */}
    </div>
    <Footer />
  </>
}