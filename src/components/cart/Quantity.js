"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const Quantity = ({ quantity, productID }) => {
  const { proquantity, setProquantity, updateQuantity } = useCart();

  


  return (
    <div className="flex divide-x border w-max h-10">
      <button
        onClick={() => {
          setProquantity(quantity - 1);
        }}
        type="button"
        className="hover:bg-gray-800 hover:text-white  bg-gray-100 px-4 py-2 font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md"
      >
        {quantity}
      </button>
      <button
        onClick={() => {
          setProquantity(quantity + 1);
        }}
        type="button"
        className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-100 hover:text-black font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Quantity;
