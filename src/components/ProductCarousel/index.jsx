"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { format } from "date-fns";
import axios from "../../axios";
import { PropagateLoader } from "react-spinners";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const EventCard = ({ item }) => {
  const month = format(new Date(item?.start_date), "MMM");
  const day = format(new Date(item?.start_date), "d");

  return (
    <div className="flex max-sm:space-x-4 md:space-x-6 lg:space-x-8">
      <div className="w-[500px] max-sm:w-full md:w-[400px] cursor-pointer relative shadow-sm mx-4 max-sm:mx-2 shadow-gray-400 bg-white rounded-xl overflow-hidden">
        <div className="h-auto w-full md:w-full max-sm:w-full overflow-hidden">
          <img
            className="w-full object-cover h-[350px]"
            src={item?.event_images[0]?.image_url}
            alt="product image"
            width={1000}
            height={500}
          />
        </div>
        <div className="flex justify-between items-start py-3 px-5 w-full">
          <p className="w-[20%] text-2xl font-normal text-center leading-5 uppercase">
            {month} <span className="text-5xl font-bold">{day}</span>
          </p>
          <div className="w-[74%]">
            <p className="uppercase text-2xl font-bold line-clamp-1">
              {item?.name}
            </p>
            <div
              className="mt-1 text-lg text-gray-500 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item?.ticket_desc }}
            />
          </div>
        </div>
        <Link href={`/${item.domain_url}`}>
          <button className="w-full mt-4 bg-[#2C3BFA] py-4 left-0 text-2xl font-bold uppercase text-white">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

const ProductCarousel = ({ className }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/event/list");
        if (response.status === 200) {
          setEvents(response.data.data);
        } else {
          console.error("Error: Unexpected response structure", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      return [];
    })();
  }, []);

  return (
    <section
      className={`w-[98.75vw] flex justify-center ${className}`}
      id="events"
    >
      <div className="w-[80vw] 2xl:w-[1500px]">
        <Carousel
          className="product-carousel"
          responsive={responsive}
          infinite={true}
        >
          {events.length >= 1 ? (
            events.map((item, i) => <EventCard key={i} item={item} />)
          ) : (
            <div className="h-[100vh] flex justify-center items-center">
              <PropagateLoader color="#2C3BFA" size={10} />
            </div>
          )}
        </Carousel>
        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 mt-8 rounded-md px-[4%] py-4 font-semibold text-white bg-gradient-to-r from-[#2C3BFA] to-[#B10C61] hover:from-[#B10C61] hover:to-[#2C3BFA] text-xl">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
