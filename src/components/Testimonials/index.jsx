import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { DateRange } from '@mui/icons-material'

const cont = 'bg-[#0B0713] border-[3px] border-[#ffffff1c] rounded-3xl p-6'

const Testimonials = () => (
    <section className='w-[98.75vw] flex justify-center pt-80'>
        <div className='sm:w-[80vw] w-[90vw] 2xl:w-[1500px]'>
            <Carousel>
                <CarouselContent>
                    {[
                        {
                            name: "Alice Johnson",
                            review: "The event was fantastic! I learned so much and met some great people.",
                            date: "May 01, 2024",
                            picture: "https://randomuser.me/api/portraits/women/1.jpg"
                        },
                        {
                            name: "Bob Smith",
                            review: "Very well organized and the speakers were top-notch. Looking forward to the next one!",
                            date: "May 02, 2024",
                            picture: "https://randomuser.me/api/portraits/men/1.jpg"
                        },
                        {
                            name: "Catherine Lee",
                            review: "I enjoyed the event, but I wish there were more networking opportunities.",
                            date: "May 03, 2024",
                            picture: "https://randomuser.me/api/portraits/women/2.jpg"
                        },
                        {
                            name: "David Brown",
                            review: "A wonderful experience! The sessions were very informative and engaging.",
                            date: "May 04, 2024",
                            picture: "https://randomuser.me/api/portraits/men/2.jpg"
                        },
                        {
                            name: "Emma Davis",
                            review: "The event exceeded my expectations. Great job by the organizers!",
                            date: "May 05, 2024",
                            picture: "https://randomuser.me/api/portraits/women/3.jpg"
                        },
                        {
                            name: "Frank Wilson",
                            review: "Good event, but some sessions were too long and could be more concise.",
                            date: "May 06, 2024",
                            picture: "https://randomuser.me/api/portraits/men/3.jpg"
                        }
                    ].map((data, i) => (
                        <CarouselItem key={i} className={`sm:basis-full md:basis-1/2 lg:basis-1/3 ${cont}`}>
                            <img src={data?.picture} className='w-full object-cover rounded-3xl' alt="" />
                            <div className='flex items-center gap-[3%] text-[#BDBDBE] my-6 text-xl'>
                                <DateRange fontSize='medium' /> <p>{data?.date}</p>
                            </div>
                            <p className='text-gray-600'><span className='font-extrabold text-lg uppercase'>{data?.name}:</span> {data?.review}</p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    </section>
)

export default Testimonials
