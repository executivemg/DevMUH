import React from "react";
import Image from "next/image";
const Cta = ({ imageSrc }) => {
  return (
    <div className="bg-[#2C3BFA] flex justify-center   text-center">
      <div className="text-white text-[3rem] font-bold">
        {imageSrc ? (
          <Image src={imageSrc} alt="CTA Image" className=" h-auto" width={2000} height={50} />
        ) : (
          <h1>
            Get your ticket Now <br />
            <span className="text-[4rem] font-bold">upcoming events</span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cta;
