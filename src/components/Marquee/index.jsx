import React from 'react'

const Marquee = () => (
    <section className='w-[98.75vw] flex justify-center pt-44'>
        <div className='w-full 2xl:w-[1500px]'>
            <div className="overflow-hidden w-full">
                <div className="marquee text-white font-bold sm:text-9xl text-4xl animate-marquee flex gap-1 w-full whitespace-nowrap">
                    <TxtBorder val="THE HOTTEST EVENTS" />{"  "}  /CONCERTS {"  "} <TxtBorder val="/PARTIES" /> {"  "} IN THE WORLD!
                </div>
            </div>
        </div>
    </section>
)

export default Marquee

const TxtBorder = ({ val }) => (
    <span className='bord text-transparent bg-[#0F000E] mx-8'>
        {val}
    </span>
)