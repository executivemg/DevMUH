import React from 'react'
import Marquee from 'react-fast-marquee';

const MarqueeTxt = () => (
    <section className='pt-20'>
        <Marquee pauseOnClick speed={150}>
            <div className="text-white overflow-y-hidden font-bold sm:text-9xl text-4xl flex gap-1 w-full whitespace-nowrap">
                <TxtBorder val="THE HOTTEST EVENTS" />{"  "}  /CONCERTS {"  "} <TxtBorder val="/PARTIES" /> {"  "} IN THE WORLD!
            </div>
        </Marquee>
    </section>
)

export default MarqueeTxt

const TxtBorder = ({ val }) => (
    <span className='bord text-transparent bg-[#0F000E] mx-8'>
        {val}
    </span>
)