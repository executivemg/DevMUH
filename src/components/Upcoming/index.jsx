"use client"

import React, { useState, useEffect } from 'react';

const h1 = `text-8xl text-transparent font-bold bord`
const p = `-ml-4 font-bold text-2xl text-white`

const Upcoming = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateCountdown = () => {
      const endDate = new Date('November 17, 2024 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        // Countdown ended
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='w-[98.75vw] flex justify-center z-50 -mt-36'>
      <div className='sm:w-[80vw] w-[90vw] 2xl:w-[1500px] justify-center pt-40'>
        <div className='w-full text-center text-white mb-20'>
          <h3 className='text-2xl'>GET YOUR TICKETS NOW TO THE HOTTEST</h3>
          <h1 className='text-6xl font-bold'>UPCOMING EVENTS</h1>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <h1 className={`${h1}`}>{countdown.days}</h1>
            <p className={`${p}`}>Days</p>
          </div>
          <div className='flex items-center'>
            <h1 className={`${h1}`}>{countdown.hours}</h1>
            <p className={`${p}`}>Hours</p>
          </div>
          <div className='flex items-center'>
            <h1 className={`${h1}`}>{countdown.minutes}</h1>
            <p className={`${p}`}>Minutes</p>
          </div>
          <div className='flex items-center'>
            <h1 className={`${h1}`}>{countdown.seconds}</h1>
            <p className={`${p}`}>Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
