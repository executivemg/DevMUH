"use client"

import { LocalActivity, Pause, PlayArrow } from '@mui/icons-material';
import React, { useState, useRef } from 'react';

const VideoCont = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const playButton = (
    <div className='backdrop-blur-3xl p-14 rounded-full'>
      <img src="/rotate.png" className='absolute top-1 left-1 w-[165px] h-[165px] rotate -z-50' alt="Rotate icon" />
      <div className='bg-white p-4 rounded-full cursor-pointer z-40' onClick={togglePlay}>
        {!playing ? <PlayArrow fontSize='large' /> : <Pause fontSize='large' />}
      </div>
    </div>
  );

  return (
    <section className='w-[98.75vw] flex justify-center sm:pt-32 pt-16'>
      <div className='sm:w-[80vw] w-[90vw] 2xl:w-[1500px] flex md:justify-between md:flex-row flex-col gap-4'>
        <div className='md:w-[35%] w-full'>
          <div className='flex gap-3 items-center'>
            <div className='w-10 h-[2px] bg-[#2C3BFA] transition-all duration-500'></div>
            <h2 className='text-3xl font-bold text-white'>Exclusive Entry to The Worlds Best!</h2>
          </div>
          <h1 className='mt-4 text-5xl font-bold text-white'>EVENT RUSH</h1>
          <p className='text-gray-600 font-semibold my-4'>
            Whether {"it's"} an intimate social gathering of 50+, a vibrant nightclub concert with a capacity of 500+, or a grand stadium event with reserved seating for 5000+, Event Rush stands as the premier destination for event goers worldwide as the go-to platform for the {"world's"} top promoters, offering a seamless experience for both organizers and attendees alike.
          </p>
          <button className='flex items-center gap-2 mt-8 rounded-md px-[4%] py-4 font-semibold text-white bg-gradient-to-r from-[#2C3BFA] to-[#B10C61] hover:from-[#B10C61] hover:to-[#2C3BFA] text-xl'>
            <LocalActivity /> Get Ticket
          </button>
        </div>
        <div className='relative md:w-[55%] w-full'>
          <div className='w-full h-full rounded-3xl bg-gradient-to-r from-[#2C3BFA] to-[#B10C61]'>
            <video
              ref={videoRef}
              autoPlay={playing}
              muted
              loop
              className="w-full h-full object-cover rounded-3xl md:absolute mt-8 md:mt-0 md:bottom-14 md:right-14 bottom-0 right-0 z-40">
              <source src='/videocont.mp4' type="video/mp4" />
            </video>
            {!playing && (
              <div className='absolute md:bottom-14 md:right-14 -bottom-8 z-40 w-full h-full flex justify-center items-center'>
                {playButton}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCont;