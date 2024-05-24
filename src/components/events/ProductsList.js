"use client";
import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ProductData } from "@/constant/data";
import Link from "next/link";

const ProductsList = () => {
  const [showDetails, setShowDetails] = useState(null);

  const handleMouseEnter = (index) => {
    setShowDetails(index);
  };

  const handleMouseLeave = () => {
    setShowDetails(null);
  };

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-2 w-full">
      {ProductData.map((item, index) => (
        <Link key={index} href={{ pathname: `/events/${item.id}`, query: { price: item.price } }}>
          <div onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave} className=" text-center mx-4 my-4 h-auto w- relative shadow-sm shadow-gray-400">
            <div className=" relative">
              <img src={item.imageurl} alt="product image" />
              {showDetails === index && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                  <Link
                    href={{ pathname: `/events/${item.id}`, query: { price: item.price } }}
                    className="flex items-center justify-center w-full md:w-[318px] sm:w-[200px] max-sm:w-[360px] h-[50px] bg-white border-2 border-black uppercase hover:bg-black hover:text-white font-medium">
                    View Details
                  </Link>
                </div>
              )}
            </div>
            <div className="flex justify-center flex-col">
              <div className="text-[8px] mb-1 mt-1">{item.description}</div>
              <div className="text-[18px] font-bold">{item.name}</div>
              <div className="text-black font-normal text-[16px ] w-full flex flex-col max-sm:text-[8px] justify-between items-center">
                <div>
                  <div className=" flex flex-row  w-full">
                    <FaCalendarAlt className="mr-4 text-black " />
                    {item.date}
                  </div>
                  <div className="flex flex-row  w-full max-sm:text-[8px]">
                    <FaLocationDot className="mr-4" /> {item.location}
                  </div>
                </div>
                <div className="mt-1 bg-none">
                  <p className=" p-[2px] rounded-full text-black font-bold max-sm:text-[8px]  text-[20px]">{item.price}</p>
                </div>
              </div>
            </div>
            <div className="w-[220px]  max-sm:w-full h-auto rotate-90 left-[65%] md:left-[55%] max-sm:hidden  bottom-0 absolute">
              <img src="/image/barcode.png" alt=" barcode" className="max-sm:w-[60%] w-full h-atuo" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsList;
