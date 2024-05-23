"use client"

import { ArrowForward } from '@mui/icons-material';
import React, { useState } from 'react';

const active = `bg-[#04000A] text-[#C3C3C4]`
const inActive = `bg-transparent text-[#7F808B]`

const Agenda = () => {
    const [day1, setDay1] = useState(true)
    const [day2, setDay2] = useState(false)
    const [day3, setDay3] = useState(false)

    const handleClick = itemName => {
        const stateMap = {
            day1: setDay1,
            day2: setDay2,
            day3: setDay3,
        };

        Object.keys(stateMap).forEach(key => {
            stateMap[key](key === itemName);
        });
    }
    return (
        <section className='w-[98.75vw] flex justify-center pt-28 relative'>
            <div className="sm:w-[80vw] w-[90vw] 2xl:w-[1500px] flex justify-between">

                <div className="w-[35%] h-fit sticky top-28 mr-16">
                    <div className='flex gap-3 items-center cont'>
                        <div className='w-12 h-[2px] bg-[#2C3BFA] transition-all duration-500 wid'></div>
                        <h2 className='text-3xl font-bold text-white'>Schedule</h2>
                    </div>
                    <h1 className='text-[#D2CFD0] text-6xl mt-4 w-full font-extrabold leading-[75px]'>Melody <span className='bord text-transparent'>Agenda</span></h1>

                    <p className='mt-8 text-gray-600 text-lg'>Captivating performances, interactive workshops, and delightful culinary delights await you at Harmonia Music Festival. Let the melodies transcend boundaries on this unforgettable musical journey.</p>

                    <div className='mt-16 flex gap-10 items-center ico'>
                        <p className='text-[#D2CFD0] text-xl border-b-[1px] border-[#D2CFD0]'>Download Agenda</p>
                        <a href='#top' className='w-[4rem!important] h-[4rem!important] rounded-full bg-[#333038] flex items-center justify-center border-2 text-white border-white'>
                            <ArrowForward className='text-white transition-all duration-500 rota rotate-45' fontSize='large' />
                        </a>
                    </div>
                </div>

                <div className="w-[60%]">
                    <div className="px-[4%] py-6 bg-[#0C0714] border-2 border-gray-600 rounded-3xl grid grid-cols-3">
                        <div onClick={() => handleClick("day1")} className={`py-7 rounded-3xl cursor-pointer ${day1 ? active : inActive}`}>
                            <h4 className='text-center text-2xl font-bold'>Day 1</h4>
                            <h3 className='text-center text-xl font-semibold mt-2'>August 25, 2024</h3>
                        </div>
                        <div onClick={() => handleClick("day2")} className={`py-7 rounded-3xl cursor-pointer ${day2 ? active : inActive}`}>
                            <h4 className='text-center text-2xl font-bold'>Day 2</h4>
                            <h3 className='text-center text-xl font-semibold mt-2'>August 26, 2024</h3>
                        </div>
                        <div onClick={() => handleClick("day3")} className={`py-7 rounded-3xl cursor-pointer ${day3 ? active : inActive}`}>
                            <h4 className='text-center text-2xl font-bold'>Day 3</h4>
                            <h3 className='text-center text-xl font-semibold mt-2'>August 27, 2024</h3>
                        </div>
                    </div>

                    <div className='text-[#D2D2D2] mt-20'>

                        <div className='flex gap-[10%] w-full pb-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1>11:00 AM</h1>
                            <p className='font-medium'>{day1 ? "Pre-Event Registration" : day2 ? "Food & Beverage Bazaar" : "Registration for Event"}</p>
                        </div>

                        <div className='flex gap-[10%] w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1>12:30 AM</h1>
                            <p className='font-medium'>Interactive Music Workshops</p>
                        </div>

                        <div className='flex gap-[10%]  w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1 className='w-fit'>02:00 PM</h1>
                            <div className='max-w-[68%]'>
                                <p className='font-medium'>{day1 ? "Food & Beverage Bazaar" : "Event Registration"}</p>
                                <p className='text-lg font-normal text-gray-500 mt-5'>{day1 ? "Delight in a culinary journey with a diverse array of delectable treats from local vendors. Savor gourmet dishes and specialty drinks amidst a vibrant atmosphere." : "Experience Harmonia: where melodies transcend boundaries. Immerse in captivating performances that ignite the stage. Unleash your musical senses and embrace rhythmic bliss."}</p>
                            </div>
                        </div>

                        <div className='flex gap-[10%]  w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1 className='w-fit'>04:00 PM</h1>
                            <div className='max-w-[68%]'>
                                <p className='font-medium'>Artistic Installations Unveiled</p>
                                <p className='text-lg font-normal text-gray-500 mt-5'>Immerse yourself in an artistic wonderland as enchanting installations come to life. Engage with visual and interactive displays that celebrate the harmony between music and art.</p>
                            </div>
                        </div>

                        <div className='flex gap-[10%] w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1>06:30 PM</h1>
                            <p className='font-medium max-w-[68%]'>Opening Ceremony with Celestial Rhythms</p>
                        </div>

                        <div className='flex gap-[10%]  w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1 className='w-fit'>08:00 PM</h1>
                            <div className='max-w-[68%]'>
                                <p className='font-medium'>Astral Beats on the Main Stage</p>
                                <p className='text-lg font-normal text-gray-500 mt-5'>Get ready to dance as the electrifying duo Astral Beats takes the main stage, delivering an immersive blend of electronic and live instruments.</p>
                            </div>
                        </div>

                        <div className='flex gap-[10%]  w-full py-8 border-b-2 border-b-gray-600 text-3xl font-bold'>
                            <h1 className='w-fit'>10:00 PM</h1>
                            <div className='max-w-[68%]'>
                                <p className='font-medium'>Starlit Serenade Sessions</p>
                                <p className='text-lg font-normal text-gray-500 mt-5'>Extend your night under the stars with intimate acoustic sessions. Unwind with soul-stirring melodies and acoustic performances by guest artists.</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default Agenda;
