"use client";
import { Fragment, useState, useContext, useEffect } from "react";
import { FilterContext } from "@/context/FilterContext";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SideBar() {
	const { showSidebar, setShowSidebar } = useContext(FilterContext);
	const { cart, removeFromCart } = useCart();

	const totalPrice = cart.reduce((acc, item) => {
		return (acc + item.price) * item.quantity;
	}, 0);
	let [subtotal, setSubtotal] = useState(0);
	useEffect(() => {
		let total = 0;
		cart.forEach((product) => {
			total += product.ticketPrice * product.quantity;
		});
		setSubtotal(total);
	}, [cart]);

	const handleopen = () => {
		setShowSidebar(false);
	};

	const handleremoveCart = (id) => {
		removeFromCart(id);
		toast.success("item removed successfully!");
	};
	return (
		<div className="relative z-[999999]">
			<Transition.Root show={showSidebar} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleopen}>
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-hidden">
						<div className="absolute inset-0 overflow-hidden">
							<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-700"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-700"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full">
									<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
										<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
											<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
													<div className="ml-3 flex h-7 items-center">
														<button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setShowSidebar(false)}>
															<span className="absolute -inset-0.5" />
															<span className="sr-only">Close panel</span>
															<XMarkIcon className="h-6 w-6" aria-hidden="true" />
														</button>
													</div>
												</div>

												<div className="mt-8">
													<div className="flow-root">
														<ul role="list" className="-my-6 divide-y divide-gray-200">
															{cart.map((product) => {
																return (
																	<li key={product.id} className="flex py-6">
																		<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																			<img src={product.flyerURLs[0]} alt="product image" className="h-full w-full object-cover object-center" />
																		</div>

																		<div className="ml-4 flex flex-1 flex-col">
																			<div>
																				<div className="flex justify-between text-base font-medium text-gray-900">
																					<h3>
																						{/* <a href={product.href}> */}
																						{product.firstName + product.lastName}
																						{/* </a> */}
																					</h3>
																					<p className="ml-4">${product.ticketPrice}</p>
																				</div>
																				<p className="mt-1 text-sm text-gray-500">{product.color}</p>
																			</div>
																			<div className="flex flex-1 items-end justify-between text-sm">
																				<p className="text-gray-500">Qty {product.quantity}</p>

																				<div className="flex">
																					<button
																						onClick={() => {
																							handleremoveCart(product.id);
																						}}
																						type="button"
																						className="font-medium text--600 text-red-400 hover:text-red-500">
																						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
																							<path
																								fillRule="evenodd"
																								d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
																								clipRule="evenodd"
																							/>
																						</svg>
																					</button>
																				</div>
																			</div>
																		</div>
																	</li>
																);
															})}
														</ul>
													</div>
												</div>
											</div>

											<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
												<div className="flex justify-between text-base font-medium text-gray-900">
													<p>Subtotal</p>
													<p className=" font-bold">${subtotal.toFixed(2)}</p>
												</div>
												<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
												<div className="mt-6 `">
													<Link
														onClick={() => {
															setShowSidebar(false);
														}}
														href="/cart"
														className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
														Checkout
													</Link>
												</div>
												<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
													<p>
														or{" "}
														<button type="button" className="font-medium text-black hover:text-indigo-500" onClick={() => setShowSidebar(false)}>
															Continue Shopping
															<span aria-hidden="true"> &rarr;</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</div>
	);
}
