"use client"

import userInfo from "@/ReusableFunctions/geUser";
import { Header } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import AddEvent from "@/components/AddEvent";

export default function Organizer() {
  const route = useRouter()
  const [isOrganizer, setOrganizer] = useState(false)
  useEffect(() => {
    if (typeof window !== undefined) {
      const userType = userInfo()?.personal?.user_type
      if (userType !== "1") {
        setOrganizer(false)
        route.push('/')
      } else {
        setOrganizer(true)
      }
    }
  }, [])
  !isOrganizer && <div className="h-screen w-screen flex justify-center items-center">
    <PropagateLoader
      color="#2C3BFA"
      cssOverride={{}}
      loading
      size={10}
    />
  </div>

  return (
    <>
      {isOrganizer && <>
        <Header navigate dashboard />
        <div className="mt-10 overflow-x-hidden">
          <AddEvent />
        </div>
      </>}
    </>
  );
}