import { Done, LocalActivity, ShoppingCart } from '@mui/icons-material';
import React from 'react'

const Highlights = () => (
    <section className='w-[98.75vw] flex justify-center bg-[#0C0614] mt-52 py-28 px-24'>
        <div className='sm:w-[80vw!important] w-[90vw!important] 2xl:w-[1500px!important]'>
            <div className='flex md:justify-between md:items-center md:flex-row flex-col md:gap-0 gap-8'>
                <div>
                    <div className='flex gap-3 items-center cont'>
                        <div className='w-14 h-[2px] bg-[#2C3BFA] transition-all duration-500 wid'></div>
                        <h2 className='text-2xl font-bold text-white'>Highlights</h2>
                    </div>
                    <h1 className='sm:text-6xl text-5xl font-bold mt-2 text-white text-center md:text-left'>Event Rush</h1>
                    <h2 className='bord text-transparent text-6xl font-black sm:mt-0 mt-4 text-center md:text-left'>All Tickets Guaranteed Authentic</h2>
                </div>
                <div className='md:w-[45%!important] w-[100%!important] flex justify-center'>
                    <img src='/qrcode2.jpg' className='w-96' />
                </div >
            </div>

            <div className='mt-10 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-3'>
                {
                    [
                        { p: "Choose Events & Tickets", Icon: Done },
                        { p: "Buy Directly from Organizers", Icon: ShoppingCart },
                        { p: "Receive Tickets", Icon: LocalActivity }
                    ].map((val, i) => <Grid data={val} key={i} />)
                }
            </div>

        </div>
    </section>
)

export default Highlights

const Grid = ({ data }) => (
    <>
        <div className='px-10 py-12 border-2 border-gray-600 rounded-3xl hover:bg-gradient-to-b hover:from-[#B10C61] hover:to-[#2C3BFA] duration-1000 transition-all gridCont'>
            <data.Icon className="text-[#2C3BFA] icon" fontSize="large" />

            <h1 className='text-[#D2D2D2] text-3xl font-extrabold mt-8'>{data?.p}</h1>
        </div>
    </>
);
