"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import GoogleMap from "@/components/map/GoogleMap";
import Quantity from "@/components/cart/Quantity";
import { usePopup } from "@/context/PopupContext";
import { useSearchParams } from "next/navigation";
import { GetEvent } from "@/helper/Event";

const Page = ({ params }) => {
	const { addToCart, proquantity, setProquantity } = useCart();
	const { price, setPrice, variantsDes, setVariantsdes } = usePopup();
	const [event, setEvent] = useState(null);
	const searchParams = useSearchParams();

	const prices = searchParams.get("price");
	const id = params.id;

	const handleCart = (product, proquantity) => {
		addToCart(product, proquantity);
		setProquantity(1);
		toast.success("Added to cart successfully!");
	};

	/* useEffect(() => {
		const fetchEvents = async () => {
			try {
				const url = `/api/create-event`;
				const data = await GetEvent(url);
				setEvent(data.data);
			} catch (error) {
				console.error("Error fetching events:", error);
			}
		};

		fetchEvents();
		setPrice(prices);
	}, []); */

	const handleDetails = (price, des) => {
		setPrice(price);
		setVariantsdes(des);
	};

	return (
		<div className="">
			{event === null ? (
				<div>loading</div>
			) : (
				<div className="container mx-auto px-4">
					{event.map((item, index) => {
						return (
							item._id === id ||
							(item.eventTitle === id.replace(/%20/g, " ") && (
								<div key={index} className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
									<div className="lg:col-span-3 lg:row-end-1">
										<div className="lg:flex lg:items-start">
											<div className="lg:order-2 lg:ml-5">
												<div className="max-w-xl overflow-hidden rounded-lg">
													<img className="h-full w-full max-w-full object-cover" src={item.flyerURLs} alt="" />
												</div>
											</div>
											<div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
												<div className="flex flex-row items-start lg:flex-col">
													<button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center">
														<img className="h-full w-full object-cover" src={item.flyerURLs} alt="" />
													</button>
													<button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
														<img className="h-full w-full object-cover" src={item.flyerURLs} alt="" />
													</button>
													<button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
														<img className="h-full w-full object-cover" src={item.flyerURLs} alt="" />
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 ">
										<h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{item.eventTitle}</h1>
										<div className="mt-3 flex select-none flex-wrap items-center gap-1">
											{/* {item.variants.map((variant, index) => (
												<label key={index} className="">
													<input type="radio" name="type" value={variant.type} className="peer sr-only" onChange={() => handleDetails(variant.price, variant.description)} />
													<p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">{variant.type}</p>
												</label>
											))} */}
											<p className="text-gray-600 mt-2 font-semibold">{variantsDes}</p>
										</div>
										<div className="mt-10 grid grid-cols-1 space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
											<div className=" grid grid-cols-2  h-10 mb-10 mr-8">
												<h1 className=" text-3xl font-bold mt-[-1px]">${prices === null ? item.ticketPrice : price}</h1>
												<Quantity quantity={proquantity} productID={item.id} />
											</div>
											<Button
												onClick={() => {
													handleCart(item, proquantity);
												}}
												className="flex justify-center items-center max-sm:mt-[-50px]">
												<svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
													<path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
												</svg>
												Add to cart
											</Button>
											<div className="flex justify-center">
												<Button className="mt-4 flex justify-between items-center w-44 mr-4">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
														/>
													</svg>
													Contact the organizer
												</Button>
												<Button className="mt-4 flex justify-between w-32 items-center">
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
														/>
													</svg>
													Share
												</Button>
											</div>
										</div>

										<div className="lg:col-span-3">
											<div className="border-b border-gray-300">
												<nav className="flex gap-4">
													<a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
														Description
													</a>
												</nav>
											</div>
											<div className="mt-8 flow-root sm:mt-12">
												<p className=" text-black">{item.description}</p>
											</div>
										</div>
										<div className="lg:col-span-3">
											<div className="border-b border-gray-300">
												<nav className="flex gap-4">
													<a href="#" title="" className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
														Location
													</a>
												</nav>
											</div>
										</div>

										<GoogleMap />
									</div>
								</div>
							))
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Page;
