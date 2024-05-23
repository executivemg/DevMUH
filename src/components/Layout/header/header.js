"use client";
import React, { useState, useContext } from "react";
import { FilterContext } from "@/context/FilterContext";
import SearchBar from "./SearchBar ";
import TopBar from "../topbar/topbar";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import SideBar from "@/components/cart/sideBar";
import { useCart } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Header = () => {
	const { setShowSidebar, showSidebar } = useContext(FilterContext);
	const { cart } = useCart();
	const path = usePathname();

	return (
		<div>
			<Toaster />
			<SideBar />
			<TopBar />
			<div className={`grid grid-cols-5 gap-4 max-sm:grid-cols-4 max-sm:p-4`}>
				<div className="col-span-1 flex justify-center items-center ml-2 max-sm:col-span-1">
					<Link href="/">
						<Image src="/image/logo.jpeg" alt="Logo" className="h-auto max-sm:w-[4rem]  w-auto max-w-[6rem] mx-auto md:mx-0" width={100} height={100} />
					</Link>
				</div>
				<div className=" col-span-3 max-sm:col-span-2">
					<SearchBar />
				</div>
				<div
					onClick={() => {
						setShowSidebar(true);
					}}
					className="relative col-span-1 sm:col-span-1 flex mt-4 ml-4 w-[50px]">
					<IoCartOutline className=" cursor-pointer h-8 w-8 md:h-10 md:w-10 text-black" />
					<div className="absolute bg-black w-6 h-6 rounded-full text-white text-center right-0 top-0 ">
						<span>{cart.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
