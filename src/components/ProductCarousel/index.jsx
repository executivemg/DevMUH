"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { format } from 'date-fns';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';

const ProductCarousel = ({ className }) => {
    const [events, setEvents] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        console.log(session)
    }, [session])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('/api/events');
                if (response.status === 200) {
                    setEvents(response?.data?.data);
                } else {
                    console.error('Error: Unexpected response structure', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, []);
    return (
        <section className={`w-[98.75vw] flex justify-center ${className}`} id='events'>
            <div className='w-[80vw] 2xl:w-[1500px]'>
                <Carousel
                    className="product-carousel"
                    responsive={{
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
                    }}
                    infinite={true}
                >
                    {events?.length > 1 ? events?.map(item => {
                        const month = format(item?.dateOfEvent, 'MMMM');
                        const day = format(item?.dateOfEvent, 'd');
                        return (
                            <div
                                className="flex max-sm:space-x-4 md:space-x-6 lg:space-x-8" key={item?.id}>
                                <div className="w-[500px] max-sm:w-full md:w-[400px] cursor-pointer relative shadow-sm mr-4 max-sm:mr-2 shadow-gray-400 bg-white rounded-xl overflow-hidden">
                                    <div className="h-auto w-full md:w-full max-sm:w-full overflow-hidden">
                                        <img
                                            className="w-full object-cover h-[350px]"
                                            src={item?.img}
                                            alt="product image"
                                            width={1000}
                                            height={500}
                                        />
                                    </div>
                                    <div className='flex justify-between items-start py-3 px-5 w-full'>

                                        <p className='w-[20%] text-2xl font-normal text-center leading-5 uppercase'>
                                            {month} <span className='text-5xl font-bold'>{day}</span>
                                        </p>

                                        <div className='w-[74%]'>
                                            <p className='uppercase text-2xl font-bold line-clamp-1'>{item?.eventTitle}</p>

                                            <p className='mt-1 text-lg text-gray-500 line-clamp-3'>{item?.description}</p>
                                        </div>

                                    </div>

                                    <Link href={{
                                        pathname: `/${item.interestedInCustomDomain}`,

                                    }}>
                                        <button className='w-full mt-4 bg-[#2C3BFA] py-4 left-0 text-2xl font-bold uppercase text-white'>Book Now</button>
                                    </Link>
                                </div>
                            </div>
                        )
                    }) : <div className="h-[100vh] flex justify-center items-center">
                        <PropagateLoader color="#2C3BFA" cssOverride={{}} loading size={10} />
                    </div>}
                </Carousel>
                <div className='mt-6 flex justify-center'>
                    <button className='bg-[#2C3BFA] hover:bg-[#2c3afad7] text-white px-5 py-3 font-semibold text-xl rounded-xl'>View All</button>
                </div>
            </div>
        </section>
    )
}

export default ProductCarousel;
