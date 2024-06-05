"use client";

import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Add, LocalActivity, Remove } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import { Footer, Header } from "@/components";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

const common = `px-[5%] py-4 cursor-pointer text-white border-b border-[1px] border-[#28242F] flex justify-between items-center`;
const active = `bg-gradient-to-r from-[#2C3BFA] to-[#B10C61] text-white hover:from-[#B10C61] hover:to-[#2C3BFA]`;
const controls = `p-3 border-gray-500 border-[1.5px] rounded-lg text-gray-400 cursor-pointer`;
const gradient = `bg-gradient-to-b from-[#2C3BFA] to-[#B10C61]`;
const itemCenter = `flex items-center`;

const Page = ({ params }) => {
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(false);
  const [Vip, setVip] = useState(false);
  const [general, setGeneral] = useState(true);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const res = await axios.get(`/event/${id}`, {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (isMounted) {
          console.log(res?.data?.data);
          setProduct(res?.data?.data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    const event = {
      ...product,
      quantity: count,
      price: student
        ? product?.ticket_price
        : Vip
          ? product?.ticket_price
          : general
            ? product?.ticket_price
            : undefined,
      category: student
        ? "Student"
        : Vip
          ? "Vip"
          : general
            ? "General"
            : undefined,
    };
    dispatch(addToCart(event));
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleClick = (itemName) => {
    const stateMap = {
      student: setStudent,
      Vip: setVip,
      general: setGeneral,
    };

    Object.keys(stateMap).forEach((key) => {
      stateMap[key](key === itemName);
    });
  };

  return (
    <>
      <Header />
      <section className="lg:w-[98.75vw] w-[98vw] flex justify-center mt-[180px]">
        {product ? (
          <div className="md:w-[80vw] w-[90vw] 2xl:w-[1500px] grid md:grid-cols-2 grid-cols-1 gap-12 items-center">
            <div className="">
              <div className={`w-[90%] rounded-2xl ${gradient}`}>
                <img
                  src={product?.event_images[0]?.image_url}
                  className="rounded-2xl min-w-[100%] max-h-[500px] object-cover translate-x-9 -translate-y-9 shadow-lg shadow-gray-600"
                />
              </div>
            </div>
            <div className="w-full">
              <div className={`${itemCenter} gap-3 cont`}>
                <div className="w-10 h-[2px] bg-[#2C3BFA] transition-all duration-500 wid"></div>
                <h2 className="text-3xl font-bold text-white">Ticket</h2>
              </div>

              <h1 className="text-5xl text-transparent bord font-bold mt-6">
                {product?.name}
              </h1>
              <p className="text-[#BDBDBE] text-xl font-light mb-1 mt-4">
                {format(product?.start_date, "MMMM dd yyyy")}
              </p>
              <p className="text-[#BDBDBE] text-xl font-light">
                {product?.start_time} AM
              </p>

              <div className="w-full border-[1.54px] border-gray-700 rounded-3xl overflow-x-hidden mt-4">
                {[
                  {
                    param: "general",
                    condition: general,
                    h1: "General Admission",
                    p: product?.ticket_price,
                  },
                  {
                    param: "Vip",
                    condition: Vip,
                    h1: "VIP Experience",
                    p: product?.ticket_price,
                  },
                  {
                    param: "student",
                    condition: student,
                    h1: "Student Admission",
                    p: product?.ticket_price,
                  },
                ]?.map((val, i) => (
                  <PriceCmp
                    key={i}
                    condition={val.condition}
                    h1={val.h1}
                    param={val.param}
                    p={val.p}
                    handleClick={handleClick}
                  />
                ))}
              </div>

              <div
                className={`${itemCenter} w-full sm:justify-between justify-center sm:gap-2 gap-8 flex-wrap mt-4`}
              >
                <div className={`${itemCenter} gap-5`}>
                  <button
                    className={controls}
                    onClick={() => count > 1 && setCount(count - 1)}
                  >
                    <Remove />
                  </button>

                  <p className="text-white text-2xl font-semibold">{count}</p>

                  <button
                    className={controls}
                    onClick={() => setCount(count + 1)}
                  >
                    <Add />
                  </button>
                </div>

                <button
                  className={`${itemCenter} gap-2 rounded-md px-[4%] py-4 font-semibold ${active} text-xl`}
                  onClick={handleAddToCart}
                >
                  {" "}
                  <LocalActivity className="-rotate-45" /> Add To Cart
                </button>
              </div>

              <div className="w-full justify-center items-center flex mt-7">
                <button className={`${active} py-6 rounded-xl w-[70%]`}>
                  Contact Organizer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[100vh] flex justify-center items-center">
            <PropagateLoader
              color="#2C3BFA"
              cssOverride={{}}
              loading
              size={10}
            />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Page;

const PriceCmp = ({ param, condition, h1, p, handleClick }) => (
  <div
    onClick={() => handleClick(param)}
    className={`${condition ? active : "bg-[#0D0915]"} ${common}`}
  >
    <h1>{h1}</h1>
    <p>${p}</p>
  </div>
);
