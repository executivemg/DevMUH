"use client";

import { useState, useEffect } from 'react';
import axios from '../../axios';
import EventCard from '@/components/event_card';
import { Skeleton } from '@mui/material';

const EventSection = ({ className }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/events");
        if (response.status === 200) {
          setEvents(response.data.data);
        } else {
          console.error("Error: Unexpected response structure", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
      
      console.log('events: ', events);
    })();
  }, []);

  return (
    <section className={`flex flex-col gap-[1rem] justify-center w-full ${className}`}>
      <div className="flex gap-[2rem] justify-evenly flex-wrap w-full ">
        {loading ? (
          [...Array(4).keys()].map((_, index) => (
            <div key={index} className="w-[20rem] md:w-[22rem]">
              <Skeleton variant="rectangular" width="100%" height={300} />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
              <Skeleton width="50%" />
              <Skeleton width="70%" />
            </div>
          ))
        ) : events.length === 0 ? (
          <p className="text-base-light text-[1.25rem]">No events to show</p>
        ) : (
          events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))
        )}
      </div>
      
      <div className="flex justify-center w-full ">
        <button className="flex text-center justify-center items-center w-[12rem] py-[0.5rem] rounded-[8px] text-[0.875rem] text-white bg-base hover:bg-primary outline outline-base-light outline-0 hover:outline-[1px] shadow-[0_2px_15px_5px_rgba(150,150,255,0.1)] hover:shadow-[0_2px_15px_10px_rgba(150,150,255,0.2)] transition-all ease-in-out duration-500">
          View All
        </button>
      </div>
    </section>
  );
};

export default EventSection;
