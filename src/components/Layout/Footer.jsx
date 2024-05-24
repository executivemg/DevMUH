"use client"

import React from 'react'
import { Apple, ArrowRight, Email, Facebook, Instagram, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material'
import { IoLogoGooglePlaystore } from 'react-icons/io5'

const Footer = () => {
    return (
        <footer className='w-[98.75vw] flex justify-center pt-28 mt-20 pb-3 bg-black'>
            <div className="lg:w-[80vw] w-[90vw] 2xl:w-[1500px]">
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-16 items-start'>
                    <div className='text-7xl text-white font-semibold'>
                        <div className='flex justify-center'>
                            <img className='h-28' src="/contactus.png" alt="contactus" />
                        </div>
                        <div className='mt-8 border-white text-2xl font-light border-[1px] px-[5%] py-[26px] flex gap-[4%] justify-center'>
                            Contact Us
                            <div className='flex items-center'>
                                <span className='w-14 h-1 bg-white mt-px -mr-5'></span> <ArrowRight fontSize='large' />
                            </div>
                            <WhatsApp fontSize='large' />
                            <Email fontSize='large' />
                        </div>
                    </div>
                    <div className='text-7xl text-white font-semibold'>
                        <div className='flex justify-center'>
                            <img className='h-28' src="/follow.png" alt="follow" />
                        </div>
                        <div className='mt-8 border-white text-2xl font-light border-[1px] px-[5%] py-[26px] flex items-center gap-[4%] justify-center'>
                            <div className='flex items-center'>
                                <span className='w-14 h-1 bg-white mt-px -mr-5'></span> <ArrowRight fontSize='large' />
                            </div>
                            <div className='bg-white px-px py-1 flex items-center justify-center rounded-lg'>
                                <img src='/snap.png' className='object-contain w-[70%] h-[70%]' />
                            </div>
                            <Instagram fontSize='large' />
                            <LinkedIn fontSize='large' />
                            <Facebook fontSize='large' className='rounded-2xl' />
                            <Twitter fontSize='large' />
                        </div>
                    </div>
                    <div className='text-7xl text-white font-semibold'>
                        <div className='flex justify-center'>
                            <img className='h-28' src="/download.png" alt="download" />
                        </div>
                        <div className='mt-8 border-white text-2xl font-light border-[1px] px-[5%] py-5 flex items-center lg:gap-[4%] gap-[1px]'>
                            <div className='flex items-center'>
                                <span className='w-14 h-1 bg-white mt-px -mr-5'></span> <ArrowRight fontSize='large' />
                            </div>
                            <div className='w-full grid sm:grid-cols-2 grid-cols-1 gap-2'>
                                <div className='py-1 px-2 text-black bg-[#EDF0F2] flex items-center flex-nowrap gap-2'>
                                    <Apple />
                                    <p className='text-sm font-medium'>Soon on the Apple Store </p>
                                </div>
                                <div className='py-1 px-2 text-black bg-[#EDF0F2] flex items-center flex-nowrap gap-2'>
                                    <IoLogoGooglePlaystore className='h-10' />
                                    <p className='text-sm font-medium'>Soon on Google Play </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex mt-14 justify-center items-center'>
                    <img src="/footerIcon.png" className='w-[50%]' alt="" />
                </div>
                <div className='mt-8 flex flex-wrap justify-center gap-8 text-2xl text-[#959595] font-normal'>
                    <p> Privacy Policy </p>
                    <p> Terms and Condition </p>
                    <p> Refund Policy </p>
                </div>
                <p className='text-lg mt-7 font-medium text-[#959595] text-center'>2024 Event Rush LLc Holdings. All Reserved</p>
            </div>
        </footer>
    )
}

export default Footer