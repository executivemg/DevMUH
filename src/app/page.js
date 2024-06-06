"use client";

import {
  Banner,
  Footer,
  Header,
  Highlights,
  ImgBanner,
  MarqueeTxt,
  MarqueeImgs,
  ProductCarousel,
  VideoCont,
} from "@/components";
import "./globals.css";
import data from "../constant/data.json";
import React, { useEffect, useState } from "react";
import userInfo from "@/ReusableFunctions/geUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter()
  const [isBuyer, setBuyer] = useState(true)
  useEffect(() => {
    if (typeof window !== undefined) {
      const userType = userInfo()?.personal?.user_type
      if (userType === "1") {
        setBuyer(false)
        route.push('/organizer')
        return
      }
    }
  }, [])
  !isBuyer && <></>
  return <>
    {isBuyer && <>
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
    </>}
  </>
}
