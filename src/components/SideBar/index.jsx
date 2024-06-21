"use client";
import { Fragment, useEffect, useState, } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { Divider } from "@mui/material";

export default function SideBar({ showSideBar, setShowSideBar }) {
    let [subtotal, setSubtotal] = useState(0);



    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };


    useEffect(() => {
        const total = cartItems.reduce((acc, obj) => {
            return acc + (obj.price * obj.quantity);
        }, 0);
        setSubtotal(total);
    }, [cartItems])

    /* const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ interestedInCustomDomain: id, quantity }));
    }; */

    const handleopen = () => {
        setShowSideBar(false);
    };
    return (
        <div className="relative">
            <Transition.Root show={showSideBar} as={Fragment} >
                <Dialog as="div" className="relative z-[10001!important]" onClose={handleopen}>
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
                                        <div className="flex h-full flex-col bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
                                                <div className="flex items-start justify-between pt-6 sticky top-0 bg-white pb-4">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setShowSideBar(false)}>
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    {cartItems?.map((item, i) => (

                                                        <div key={i} className="mb-7">
                                                            <div className="flex gap-4 items-center">
                                                                <img src={item?.event_images[0]?.image_url} alt="" className="h-24 w-24 object-cover rounded-2xl" />

                                                                <div>
                                                                    <h1 className="text-xl font-semibold">{item?.eventTitle}</h1>

                                                                    <div className="flex gap-3 items-center mt-1">

                                                                        <h3 className="font-semibold">Category:
                                                                            <span className="font-normal">{item?.category}</span>,
                                                                        </h3>

                                                                        <h3 className="font-semibold">Quantity:
                                                                            <span className="font-normal">{item?.quantity}</span>,
                                                                        </h3>

                                                                    </div>

                                                                    <div className="flex gap-3 items-center mt-1">

                                                                        <h3 className="font-semibold">Per Amount: $
                                                                            <span className="font-normal">{item?.price},</span>
                                                                        </h3>

                                                                        <h3 className="font-semibold">Total: $
                                                                            <span className="font-normal">{item?.price * item?.quantity}</span>
                                                                        </h3>

                                                                    </div>

                                                                    <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 w-fit p-3 rounded-lg text-white mt-2">Remove From Cart</button>
                                                                </div>

                                                            </div>
                                                            <div className="mt-4">
                                                                <Divider />
                                                            </div>
                                                        </div>

                                                    ))}
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
                                                            setShowSideBar(false);
                                                        }}
                                                        href="/cart"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{" "}
                                                        <button type="button" className="font-medium text-black hover:text-indigo-500" onClick={() => setShowSideBar(false)}>
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
        </div >
    );
}
