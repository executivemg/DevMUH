"use client";

import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
import { Delete } from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import userInfo from "@/ReusableFunctions/geUser";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userNumber, setUserNumber] = useState("");

  let [subtotal, setSubtotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = userInfo();
      if (user && user.personal) {
        let email = user.personal.email;
        let phone = user.personal.phone;
        setUserEmail(email);
        setUserNumber(phone);
      }
    }
  }, [cartItems]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const { data } = await axios.post(
        "/api/payment",
        {
          cartItems,
          email: userEmail,
          phone: userNumber,
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.assign(data?.url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, obj) => {
      return acc + obj.price * obj.quantity;
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Toaster />
      <div className="font-[sans-serif] bg-black text-white">
        <div className="grid lg:grid-cols-3">
          <div className="lg:col-span-2 p-10 bg-black overflow-x-auto">
            <div className="flex border-b pb-4">
              <h2 className="text-4xl font-extrabold flex-1 text-transparent bord">
                Shopping Cart
              </h2>
            </div>
            <div>
              <table className="mt-6 w-full border-collapse divide-y">
                <thead className="whitespace-nowrap text-left">
                  <tr>
                    <th className="text-base p-4">Description</th>
                    <th className="text-base p-4">Quantity</th>
                    <th className="text-base p-4">Price</th>
                  </tr>
                </thead>
                {cartItems?.map((item, index) => {
                  return (
                    <tbody className="whitespace-nowrap divide-y" key={index}>
                      <tr>
                        <td className="py-6 px-4">
                          <div className="flex items-center gap-6 w-max">
                            <div className="h-36 shrink-0">
                              <img
                                src={item?.event_images[0]?.image_url}
                                className="w-36 h-full object-cover rounded-lg"
                                alt="product image"
                              />
                            </div>
                            <div className="flex items-center gap-1 mt-4">
                              <Delete className="text-red-500" />
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                type="button"
                                className="font-semibold text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <p className="text-gray-500 ">{item.quantity}</p>
                        </td>
                        <td className="py-6 px-4">
                          <h4 className="text-md font-bold">${item.price}</h4>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="bg-black p-10">
            <h3 className="text-xl font-extrabold border-b pb-4">
              Order Summary
            </h3>
            <ul className="divide-y mt-6">
              <li className="flex flex-wrap gap-4 text-md py-4">
                Subtotal{" "}
                <span className="ml-auto font-bold">
                  ${subtotal.toFixed(2)}
                </span>
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
              <div className="w-full flex justify-center items-center p-10">
                <PropagateLoader
                  color="#363bd6"
                  cssOverride={{}}
                  loading
                  size={10}
                />
              </div>
            ) : (
              <button
                type="button"
                className="mt-6 text-md px-6 py-2.5 w-full bg-[#2C3BFA] hover:bg-blue-700 rounded"
                onClick={handlePayment}
              >
                Check out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
