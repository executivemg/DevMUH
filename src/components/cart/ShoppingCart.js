"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ShoppingCart = () => {
	const router = useRouter();
	const { cart, removeFromCart, updateQuantity, proquantity, setProquantity } = useCart();
	const { data: session } = useSession();

	let [subtotal, setSubtotal] = useState(0);
	let [loading, setLoading] = useState(false);
	let [quantity, setQuantity] = useState("");
	let [productName, setProductName] = useState("");
	let [unitAmount, setUnitAmount] = useState("");
	const handlePayment = async (e) => {
		e.preventDefault();
		/* setLoading(true);
		const userEmail = session?.user?.email;
		const username = session?.user?.name
		if (session) {
			const { data } = await axios.post(
				"/api/payment",
				{ quantity, productName, unitAmount, userEmail, username },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setLoading(false);
			// console.log(data);
			window.location.assign(data?.url);
		} else {
			setLoading(false);
			toast.error("Please Login to continue checkout");
			router.push("/login");
		} */
	};

	const convertToUnit = (total) => {
		const unitAmount = Math.round(total * 100);
		return unitAmount;
	};
	useEffect(() => {
		let total = 0;
		let price = 0;
		let quantity;
		let name;
		cart.forEach((product) => {
			total += product.ticketPrice * product.quantity;
			price = product.ticketPrice;
			quantity = product.quantity;
			name = product.firstName + " " + product.lastName;
		});
		setSubtotal(total);
		setQuantity(quantity);
		setProductName(name);
		setUnitAmount(() => convertToUnit(price));
	}, [cart]);

	const handleremoveCart = (id) => {
		removeFromCart(id);
		toast.success("item removed successfully!");
	};

	const total = cart.reduce((acc, item) => {
		return (acc + item.price) * item.quantity;
	}, 0);

	return (
		<div className="font-[sans-serif]">
			<div className="grid lg:grid-cols-3">
				<div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
					<div className="flex border-b pb-4">
						<h2 className="text-2xl font-extrabold text-[#333] flex-1">Shopping Cart</h2>
						<h3 className="text-xl font-extrabold text-[#333]">{`${cart.length} item`}</h3>
					</div>
					<div>
						<table className="mt-6 w-full border-collapse divide-y">
							<thead className="whitespace-nowrap text-left">
								<tr>
									<th className="text-base text-[#333] p-4">Description</th>
									<th className="text-base text-[#333] p-4">Quantity</th>
									<th className="text-base text-[#333] p-4">Price</th>
								</tr>
							</thead>
							{cart.map((item, index) => {
								return (
									<tbody className="whitespace-nowrap divide-y " key={index}>
										<tr>
											<td className="py-6 px-4">
												<div className="flex items-center gap-6 w-max">
													<div className="h-36 shrink-0">
														<img src={item.flyerURLs[0]} className="w-full h-full object-contain" alt="product image" />
													</div>
													<div>
														<p className="text-md font-bold text-[#333]">{item.className}</p>
														<button
															onClick={() => {
																handleremoveCart(item.id);
															}}
															type="button"
															className="mt-4 font-semibold text-red-400 text-sm">
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
											</td>
											<td className="py-6 px-4">
												<p className="text-gray-500 ">{item.quantity}</p>
											</td>
											<td className="py-6 px-4">
												<h4 className="text-md font-bold text-[#333]">${item.ticketPrice}</h4>
											</td>
										</tr>
										{/* More rows can be added similarly */}
									</tbody>
								);
							})}
						</table>
					</div>
				</div>
				<div className="bg-gray-50 p-10">
					<h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
					<ul className="text-[#333] divide-y mt-6">
						<li className="flex flex-wrap gap-4 text-md py-4">
							Subtotal <span className="ml-auto font-bold">${subtotal}</span>
						</li>
						<li className="flex flex-wrap gap-4 text-md py-4">
							Shipping <span className="ml-auto font-bold">$0.00</span>
						</li>
						<li className="flex flex-wrap gap-4 text-md py-4">
							Tax <span className="ml-auto font-bold">$0.00</span>
						</li>
						<li className="flex flex-wrap gap-4 text-md py-4 font-bold">
							Total <span className="ml-auto">${subtotal.toFixed(2)}</span>
						</li>
					</ul>
					{loading ? (
						<div className=" w-full flex justify-center items-center p-10">
							<PropagateLoader color="#363bd6" cssOverride={{}} loading size={10} />
						</div>
					) : (
						<button type="button" className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded" onClick={handlePayment}>
							Check out
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
