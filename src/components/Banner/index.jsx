"use client";

import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

const h1 = `text-3xl text-white font-bold`
const p = `text-white text-lg`

const Banner = ({ video, className }) => {
    const [timer, setTimer] = useState(false);

    /* useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/api/sendsms')
                // console.log(res?.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        })();
    }, []); */


    return (
        <section className={`w-full ${className}`} id="top">
            <div className="relative inset-0">
                <video autoPlay muted loop className="w-full md:h-full h-[80vh] object-cover relative">
                    <source src={video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black opacity-40" />
            </div>

        </section>
    );
};

export default Banner;