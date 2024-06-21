import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { Avatar } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'

const CarouselCmp = () => {
    return (
        <Carousel>
            <CarouselContent>

                <CarouselItem>
                    <div className="w-full h-[270px] bg-gradient-to-b from-[#B10C61] to-[#2C3BFA] px-6 py-9 flex flex-col justify-between rounded-3xl">
                        <div className='flex gap-5 items-center'>
                            <div className='flex'>
                                <Avatar src='/profile/1.png' className='border-[#ACB5C1] border-[3px] rounded-full h-12 w-12' />
                                <Avatar src='/profile/2.png' className='-ml-2 border-[#ACB5C1] border-[3px] rounded-full h-12 w-12' />
                                <Avatar src='/profile/3.png' className='-ml-2 border-[#ACB5C1] border-[3px] rounded-full h-12 w-12' />
                            </div>
                            <p className='text-xl text-white'> <span className='font-extrabold'>+355</span> Attending </p>
                        </div>
                        <div className='flex items-end h-full'>
                            <h1 className='text-4xl font-extrabold text-white flex-[1] leading-[40px]'>SECURE YOUR SPOT NOW</h1>
                            <Arrow />
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem>
                    <div className="flex-1 h-[270px] bg-gradient-to-b from-[#B10C61] to-[#2C3BFA] px-6 py-9 flex flex-col justify-between rounded-3xl">

                        <div className='w-full flex gap-5'>
                            <h1 className='text-white text-7xl font-extrabold w-fit'>248</h1>
                            <h2 className='text-4xl text-white font-bold leading-9'>Seats Available</h2>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='w-[70%] p-1 bg-white rounded-[35px] text-lg flex justify-between items-center'>
                                <div className='w-[75%] py-4 px-6 bg-gradient-to-r from-[#B10C61] to-[#2C3BFA] text-white font-bold rounded-[35px]'>73% filled</div>
                                <p className='px-4 text-[#2C3BFA] font-semibold'>17%</p>
                            </div>
                            <Arrow />
                        </div>

                    </div>
                </CarouselItem>

            </CarouselContent>
        </Carousel>

    )
}

export default CarouselCmp

const Arrow = () => (
    <a href='#top' className='w-[4rem!important] h-[4rem!important] rounded-full bg-[#7E38B0] flex items-center justify-center border-2 text-white border-white ico'>
        <ArrowForward className='text-white -rotate-45 arrow transition-all duration-500' fontSize='large' />
    </a>
)