import React from 'react';

const ImgBanner = ({ className, src }) => <>
    {/* <div className={className}>
        <img src={src} alt="Upcoming" className="h-auto" width={2000} height={50} />
    </div> */}
    <div className='flex justify-center mt-10'>
        <div>
            <h3 className='text-[2.7rem] text-[#C9C8CA] font-thin font-sans uppercase text-center sm:-mb-4 -mb-0'>Get your Tickets Now to the Hottest</h3>
            <h1 className='uppercase text-[#FFFFFF] text-[5.5rem] font-sans font-extrabold text-center leading-[90px]'>upcoming events</h1>
        </div>
    </div>
</>

export default ImgBanner;