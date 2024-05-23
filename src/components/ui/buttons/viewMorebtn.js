"use client"
import Link from "next/link";
import React from "react";
import { Button } from "@material-tailwind/react";

const viewMorebtn = () => {
  return (
    <div className="flex wi0full justify-center mb-4">
      <Link href='/events'>
        <Button className="bg-black text-white p-3 w-60    shadow-b-lg shadow-black   rounded-md">
          view all
        </Button>
      </Link>
    </div>
  );
};

export default viewMorebtn;
