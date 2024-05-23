import React from 'react';

const ImgBanner = ({ className, src }) => <>
    {/* <div className={className}>
        <img src={src} alt="Upcoming" className="h-auto" width={2000} height={50} />
    </div> */}
    <section className={`w-[98.75vw] flex justify-center ${className}`} id='events'>
        <div className='w-[80vw] 2xl:w-[1500px]'>
            <h3 className='sm:text-[2rem] text-[2.4rem] text-[#C9C8CA] font-thin font-sans uppercase text-center sm:-mb-4 leading-[50px] mb-5'>Get your Tickets Now to the Hottest</h3>
            <h1 className='uppercase text-[#FFFFFF] sm:text-[5.5rem] text-[3rem] font-sans sm:font-extrabold font-bold text-center sm:leading-[90px] leading-[60px]'>upcoming events</h1>
        </div>
    </section>
</>

export default ImgBanner;