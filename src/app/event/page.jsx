/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import seat from './floorplan';
import SeatPicker from './components/seat_picker';

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

  return (
    <div className='w-full min-h-screen text-white py-[4rem] font-poppins '>
      
      {/* :::::::::::::::::::::: SEAT ARRANGEMENT */}
      <SeatPicker 
        open={openSeats} 
        toggleDrawer={toggleDrawer} 
        seats={eventData.floorplanLayout} 
      />

      <div className='relative flex max-w-[75rem] mx-auto p-[1rem] md:p-[2rem] '>
        {/* :::::::::::::::::::::::: IMAGE INFO */}
        <div className='sticky top-[2rem] left-0 flex flex-col w-full md:w-[50%] md:h-[40rem] rounded-[16px] overflow-hidden shadow-[0_0_2px_4px_rgba(150,150,255,0.2)] '>
          <img
            src={eventData?.image || '/assets/images/mode_0_event_plan.jpg'}
            alt='Event'
            className='relative z-1 w-full h-full object-contain '
          />

          <div className='relative blur-[5px] w-full h-0 '>
            <img
              src={eventData?.image || '/assets/images/mode_0_event_plan.jpg'}
              alt='Event'
              className='absolute z-[-1] bottom-0 left-0 blur-[5px] w-full h-full object-cover '
            />
          </div>
         
        </div>

        {/* :::::::::::::::::::::::: TEXT INFORMATION */}
        <div className='flex flex-col gap-[1rem] w-full md:max-w-[35rem] px-[2rem] md:px-[4rem] '>
          {/* :::::::::::::::: EVENT TITLE */}
          <h2 className='text-white font-[700] text-[2.5rem] '>{eventData?.eventName}</h2>
          
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
                <p className='text-gray text-[0.875rem]'>Owner (Host)</p>
                <p className='text-gray-light text-[0.875rem]'>{eventData?.name || 'Luthor'}</p>
              </div>
            </div>
            <p className='text-gray text-[0.875rem]'>Contact: <span className='text-gray-light'>{eventData?.contactPhone}</span></p>
            <p className='text-gray text-[0.875rem]'>Email: <span className='text-gray-light'> {eventData?.contactEmail}</span></p>
          </div>

          {/* :::::::::::::::::: TIME & LOCATION */}
          <div className='flex flex-col '>
            <p className='text-gray-light text-[0.875rem] uppercase font-[600] mt-[1rem] '>Location</p>

            <div className='flex flex-col '>
              {/* :::::::::::::::::::::: LOCATION */}
              <p className='text-gray text-[0.875rem]'>Address: <span className='text-gray-light'>{eventData?.address}</span></p>
              <p className='text-gray text-[0.875rem]'>Zip code: {eventData?.zipCode}</p>
              <p className='text-gray text-[0.875rem]'>City: <span className='text-gray-light'>{eventData?.state}</span></p>
              <p className='text-gray text-[0.875rem]'>State: <span className='text-gray-light'>{eventData?.city}</span></p>
            </div>

            <p className='text-gray-light text-[0.875rem] uppercase font-[600] mt-[1rem] '>Time</p>       

            <div className='flex flex-col '>
              {/* :::::::::::::::::::::: TIME  */}
              <p className='text-gray text-[0.875rem]'>From: <span className='text-gray-light'>{eventData?.startTime}</span></p>
              <p className='text-gray text-[0.875rem]'>To: <span className='text-gray-light'> {eventData?.endTime}</span></p>
            </div>
            
            <p className='text-gray-light text-[0.875rem] uppercase font-[600] mt-[1rem] '>Date</p>       

            <div className='flex flex-col '>
              {/* :::::::::::::::::::::: DATE  */}
              <p className='text-gray text-[0.875rem]'>From: <span className='text-gray-light'>{eventData?.startDate}</span></p>
              <p className='text-gray text-[0.875rem]'>To: <span className='text-gray-light'>{eventData?.endDate}</span></p>
            </div>
          </div>

          {/* :::::::::::::::::::::::::: CTA */}
          <div className='flex flex-col gap-[1rem] items-center w-full p-[2rem] rounded-[8px] border-solid border-gray/50 border-[1px] shadow-[0_0_2px_4px_rgba(150,150,255,0.2)] '>
            <p className='text-gray text-[0.875rem] font-[600] '>Don&apos;t have a ticket? Get your tickets with ease now.</p>
            <button
              onClick={()=>setOpenSeats(!openSeats)}
              className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] font-[600] rounded-[32px] bg-primary text-white hover:text-black hover:bg-gray-light border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
            >Buy Seat Ticket</button>
            <button
              className='flex items-center justify-center text-center w-full max-w-[22rem] h-[3rem] text-[0.875rem] font-[600] rounded-[32px] bg-base text-white hover:bg-base-hover border-solid border-[1px] border-white/20 active:bg-opacity-[70%] ease-200'
            >Quick Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage