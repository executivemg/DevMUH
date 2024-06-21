"use client";

const EventCard = () => {
  return (
    <div className='flex flex-col w-[22rem] md:w-[24rem] rounded-[24px] overflow-hidden'>
      <div className='relative w-full flex justify-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='/assets/images/mode_0_event_plan.jpg'
          alt='Event'
          className='w-full min-w-full h-[25rem] object-cover '
        />

        {/* ::::::::::::::::::::: CTAs */}
        <a href='/'
          className='absolute z-[5] bottom-[-3rem] group-hover:bottom-[1rem] flex text-center justify-center items-center w-[8rem] py-[0.5rem] rounded-[16px] text-[0.875rem] text-white bg-base hover:base-hover ease-250 shadow-[0_2px_15px_5px_rgba(150,150,255,0.1)]'
        >Buy Ticket</a>
      </div>

      {/* ::::::::::::::::::::: TEXT CONTENT */}
      <div>
        <div>
          <h2>Amazing Hangout</h2>
          <p>$34</p>
        </div>

      </div>
    </div>
  )
}

export default EventCard;