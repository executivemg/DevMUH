"use client";
import React, { useEffect, useState } from "react";
import { TiSocialFacebook, TiSocialInstagram, TiSocialPinterest } from "react-icons/ti";
import { RiTiktokFill } from "react-icons/ri";
import { FaSnapchatGhost, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaInbox } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosCart } from "react-icons/io";
import Link from "next/link";

const Footer = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 400);
		};

		handleResize(); // Set initial state
		window.addEventListener("resize", handleResize); // Add event listener for resize

		// Cleanup on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<footer className="bg-black text-white text-md lg:px-[150px] uppercase max-sm:py-5 max-sm:px-4 md:py-10 mt-2 relative bottom-0">
			<div className="container mx-auto sm:px-8 md:px-16 lg:px-24 xl:px-32">
				<div className="grid grid-cols-1 -max-sm:grid-cols-2 md:grid-cols-4 gap-8">
					{/* Shop Section */}
					{/* <div className=" max-sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Shop</h2>
            <ul className="list-none text-gray-400 text-sm">
              <li className="mb-3">Events</li>
            </ul>
          </div> */}

					{/* Information Section */}
					<div className="max-sm:col-span-1">
						<h2 className="text-lg font-semibold mb-4">Information</h2>
						<ul className="list-none text-gray-400 text-sm">
							<li className="mb-3">Comparisons and Pricing</li>
							<li className="mb-3">Company</li>
							<li className="mb-3">CEO</li>
							<li className="mb-3">Terms and Conditions</li>
							<li className="mb-3">Privacy Policy</li>
						</ul>
					</div>

					{/* Customer Service Section */}
					<div>
						<h2 className="text-lg font-semibold mb-4">Customer Service</h2>
						<ul className="list-none text-gray-400 text-sm">
							<li className="mb-3">Payment Transfer Form</li>
							<li className="mb-3">Create an event</li>
							<li className="mb-3">Contact Us</li>
						</ul>
					</div>

					{/* Search Section */}
					<div className="">
						<h2 className="text-md font-semibold mb-4 ">Newsletter Sign Up</h2>
						<p className=" w-[300px] text-[10px]  text-gray-400  mb-4">Sign up for exclusive updates, new arrivals & insider only discounts</p>
						<div className="flex flex-col md:flex-row">
							<input type="text" placeholder="Enter your email" className="px-4 py-2 mb-2 md:mb-0 w-full md:w-[20rem] border focus:outline-none focus:ring-2 bg-black mr-2" />
							<button className="px-4 py-2 bg-white text-black font-semibold ">Subscribe</button>
						</div>
						<div className="flex flex-row max-sm:justify-center justify-evenly w-[300px] mt-6">
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<TiSocialFacebook />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<TiSocialInstagram />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<TiSocialPinterest />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<RiTiktokFill />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<FaSnapchatGhost />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<FaYoutube />
							</div>
							<div className="mr-2 mt-4 w-10 h-8 rounded-full bg-white text-black flex justify-center items-center ">
								<FaTwitter />
							</div>
						</div>
					</div>
				</div>
			</div>
			{isMobile && (
				<div className=" max-sm:w-full fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200  bottom-0 left-1/2   ">
					<div className="grid h-full max-w-lg grid-cols-5 mx-auto">
						<Link href="/">
							<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5   hover:bg-gray-50  ">
								<IoHomeOutline className="w-5 h-5 mb-1 text-black dark:text-black group-hover:text-blue-600 dark:group-hover:text-blue-500" />
								<p className="text-black   text-[12px]">Home</p>
							</button>
						</Link>
						<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5   hover:bg-gray-50  ">
							<FiSearch className="w-5 h-5 mb-1 text-black dark:text-black group-hover:text-blue-600 dark:group-hover:text-blue-500" />
							<p className="text-black   text-[12px]">Search</p>
						</button>

						<div className="flex items-center justify-center">
							<Link href={"/organizer"}>
								<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5   hover:bg-gray-50  ">
									<FaInbox className="w-5 h-5 mb-1 text-black dark:text-black group-hover:text-blue-600 dark:group-hover:text-blue-500" />
									<p className="text-black   text-[12px]">Collection</p>
								</button>
							</Link>
						</div>
						<Link href={"/organizer"}>
							<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5   hover:bg-gray-50  ">
								<RiAccountCircleFill className="w-5 h-5 mb-1 text-black dark:text-black group-hover:text-blue-600 dark:group-hover:text-blue-500" />
								<p className="text-black   text-[12px]">Account</p>
							</button>
						</Link>
						<Link href="/cart">
							<button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5   hover:bg-gray-50  ">
								<IoIosCart className="w-5 h-5 mb-1 text-black dark:text-black group-hover:text-blue-600 dark:group-hover:text-blue-500" />
								<p className="text-black   text-[12px]">Cart</p>
							</button>
						</Link>
					</div>
				</div>
			)}
		</footer>
	);
};

export default Footer;
