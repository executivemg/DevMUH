/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import seat from './floorplan';
import SeatPicker from './components/seat_picker';
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";

const EventPage = () => {
  const [eventData, setEventData] = React.useState({
    eventName: "Rana Nightout",
    ticketPrice: "25.00",
    ticketQuantity: "45",
    ticketSold: "34",
    contactPhone: "1234567890",
    contactEmail: "ranaeventmailer@gmail.com",
    startDate: "Monday, 12th May",
    endDate: "Tuesday, 13th May",
    startTime: "22:00",
    endTime: "04:00",
    description: "This is an open to all employees inclusive night out. It emcompases fun filled activities before the dance.",
    address: "St 12, Grandline road",
    city: "Laugh tale",
    state: "Luisi",
    zipCode: "129845",
    floorplan: "yes", //

    // :::::::::::::::::::::::: FLOOR PLAN
    floorplanMode: 0,
    floorplanImage: "/assets/images/mode_0_event_plan.jpg",
    floorplanLayout: [...seat?.seats] || [], //
  });

  const [openSeats, setOpenSeats] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpenSeats(newOpen);
  };

  // ::::::::::::::::::::::::::: IMAGE STATE
  const [openImage, setOpenImage] = useState(false);

  return (
    <div className='w-full min-h-screen text-white py-[4rem] font-poppins '>
      
      {/* :::::::::::::::::::::: SEAT ARRANGEMENT */}
      <SeatPicker 
        open={openSeats} 
        toggleDrawer={toggleDrawer} 
        seats={eventData.floorplanLayout} 
      />

      <div className='relative flex max-lg:flex-col gap-y-[3rem] max-w-[75rem] mx-auto p-[2rem] md:max-lg:px-[4rem]'>
        {/* :::::::::::::::::::::::: IMAGE INFO */}
        <div className='lg:sticky top-[2rem] left-0 flex flex-col w-full lg:w-[50%] lg:h-[40rem] rounded-[16px] overflow-hidden shadow-[0_0_4px_2px_rgba(150,150,255,0.2)] '>
          <img
            src={eventData?.image || '/assets/images/mode_0_event_plan.jpg'}
            alt='Event'
            className='relative z-1 w-full h-full object-contain '
          />

          <div className='relative w-full h-0 '>
            <img
              src={eventData?.image || '/assets/images/mode_0_event_plan.jpg'}
              alt='Event'
              className='absolute z-[-1] bottom-0 left-0 blur-[5px] w-full h-full object-cover '
            />

            <button
              onClick={()=>setOpenImage(!openImage)}
              className='absolute z-[100] bottom-[1rem] right-[1rem] flex items-center justify-center w-[3rem] h-[3rem] rounded-[8px] bg-white text-primary hover:bg-base hover:text-white ease-250 border-solid border-primary border-[1px] '
            >
              {openImage? 
              <RiZoomOutLine className='text-[1.5rem]' /> : 
              <RiZoomInLine className='text-[1.5rem]' />}
            </button>
          </div>
        </div>

        {/* :::::::::::::::::::::::: TEXT INFORMATION */}
        <div className='flex justify-center w-full lg:w-[50%] lg:px-[2rem] '>
          <div className='flex flex-col gap-[1rem] w-full lg:max-w-[30rem] '>
            {/* :::::::::::::::: EVENT TITLE */}
            <h2 className='text-white font-[700] text-[2.5rem] md:text-[3rem] '>{eventData?.eventName}</h2>
            
            {/* :::::::::::::::: EVENT PRICE */}
            <div className='flex items-center gap-[1rem] '>
              <p className='text-[1rem] font-[700] border-solid border-base border-[2px] rounded-[4px] text-base px-[0.5rem] py-[0.125rem] hover:scale-[1.03] hover:shadow-[0_0_5px_2px_rgba(255,255,255,0.2)] ease-250 cursor-pointer '>${eventData?.ticketPrice}</p>
              <p className='text-gray text-[1.05rem] font-[700] '>{Number(eventData?.ticketQuantity) - Number(eventData?.ticketSold)} seats available </p>
            </div>

            {/* :::::::::::::::: EVENT DESCRIPTION */}
            <p className='text-[1rem] text-gray font-[400] '>{eventData?.description}</p>
            <a 
              href={`${window.location.origin}/event/${eventData?.domain}`}
              className='underline text-base font-[400] text-[1rem] '
            
            >{window.location.origin}/event/{eventData?.domain}</a>

            {/* :::::::::::::::: EVENT OWNER INFO */}
            <div className='flex flex-col gap-[0.25rem]'>
              <div className='flex gap-[1rem] items-center'>
                <img
                  src={eventData?.owner_image || '/assets/images/mode_0_event_plan.jpg'}
                  alt=''
                  className='w-[3rem] h-[3rem] min-w-[3rem] object-cover rounded-[50rem] '
                />
                <div className='flex flex-col '>
                  <p className='text-gray text-[0.875rem] md:text-[1rem]'>Owner (Host)</p>
                  <p className='text-gray-light text-[0.875rem] md:text-[1rem]'>{eventData?.name || 'Luthor'}</p>
                </div>
              </div>
              <p className='text-gray text-[0.875rem] md:text-[1rem]'>Contact: <span className='text-gray-light'>{eventData?.contactPhone}</span></p>
              <p className='text-gray text-[0.875rem] md:text-[1rem]'>Email: <span className='text-gray-light'> {eventData?.contactEmail}</span></p>
            </div>

            {/* :::::::::::::::::: TIME & LOCATION */}
            <div className='flex flex-col '>
              <p className='text-gray-light text-[0.875rem] md:text-[1rem] uppercase font-[600] mt-[1rem] '>Location</p>

              <div className='flex flex-col '>
                {/* :::::::::::::::::::::: LOCATION */}
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>Address: <span className='text-gray-light'>{eventData?.address}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>Zip code: {eventData?.zipCode}</p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>City: <span className='text-gray-light'>{eventData?.state}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>State: <span className='text-gray-light'>{eventData?.city}</span></p>
              </div>

              <p className='text-gray-light text-[0.875rem] md:text-[1rem] uppercase font-[600] mt-[1rem] '>Time</p>       

              <div className='flex flex-col '>
                {/* :::::::::::::::::::::: TIME  */}
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>From: <span className='text-gray-light'>{eventData?.startTime}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>To: <span className='text-gray-light'> {eventData?.endTime}</span></p>
              </div>
              
              <p className='text-gray-light text-[0.875rem] md:text-[1rem] uppercase font-[600] mt-[1rem] '>Date</p>       

              <div className='flex flex-col '>
                {/* :::::::::::::::::::::: DATE  */}
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>From: <span className='text-gray-light'>{eventData?.startDate}</span></p>
                <p className='text-gray text-[0.875rem] md:text-[1rem]'>To: <span className='text-gray-light'>{eventData?.endDate}</span></p>
              </div>
            </div>

            {/* :::::::::::::::::::::::::: CTA */}
            <div className='flex flex-col gap-[1rem] items-center w-full p-[2rem] rounded-[8px] border-solid border-gray/20 border-[1px] shadow-[0_0_2px_4px_rgba(150,150,255,0.1)] '>
              <p className='text-gray text-[0.875rem] md:text-[1rem] font-[600] '>Don&apos;t have a ticket? Get your tickets with ease now.</p>
              <button
                onClick={()=>setOpenSeats(!openSeats)}
                className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] md:text-[1rem] font-[600] rounded-[32px] bg-primary text-white hover:text-black hover:bg-gray-light border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
              >Buy Seat Ticket</button>
              <button
                className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] md:text-[1rem] font-[600] rounded-[32px] bg-base text-white hover:bg-base-hover border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
              >Quick Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage