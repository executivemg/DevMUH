"use client";

const EventCard = () => {
  return (
    <div className='group flex flex-col w-full sm:w-[20rem] md:w-[22rem] rounded-[16px] overflow-hidden font-poppins cursor-pointer '>
      <div className='relative w-full flex justify-center overflow-hidden'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/assets/images/mode_0_event_plan.jpg'
          alt='Event'
          className='w-full min-w-full h-[25.625rem] object-cover border-solid border-base-light/60 border-[1px] rounded-[16px] '
        />

        {/* ::::::::::::::::::::: CTAs */}
        <a href='/'
          className='absolute z-[5] bottom-[-3rem] group-hover:bottom-[1rem] flex text-center justify-center items-center w-[12rem] py-[0.5rem] rounded-[12px] text-[1.05rem] text-white bg-base hover:bg-primary outline outline-base-light outline-0 hover:outline-[1px] shadow-[0_2px_15px_5px_rgba(150,150,255,0.1)] hover:shadow-[0_2px_15px_10px_rgba(150,150,255,0.2)] transition-all ease-in-out duration-500 '
        >Buy Ticket</a>
      </div>

      {/* ::::::::::::::::::::: TEXT CONTENT */}
      <div className='flex flex-col gap-[0.875rem] pb-[2rem] pt-[0.875rem] '>
        <div className='flex justify-between items-center w-full'>
          <h2 className='text-white'>Amazing Hangout</h2>
          <p className='text-base-light text-[0.75rem] font-[] border-solid border-[2px] border-base-light/50 rounded-[4px] px-[0.5rem] py-[0.1rem]'>$34</p>
        </div>
        <div className='flex justify-end w-full'>
          <p className='text-base-light text-[0.875rem]'>32 seats available</p>
        </div>

        <div className='bg-base-light/50 h-[1px] w-full' />

        <div className='flex justify-between items-center w-full'>
          <p className='text-base-light text-[0.625rem] tracking-[1.5px] uppercase '>Location:</p>
          <p className='text-base-light text-[0.875rem]'>Swan hotel, Akure city</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard;