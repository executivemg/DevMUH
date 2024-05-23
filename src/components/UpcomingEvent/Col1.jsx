"use client"
import { Add, LocalActivity, Remove } from '@mui/icons-material'
import React, { useState } from 'react'

const common = `px-[5%] py-4 cursor-pointer text-white border-b border-[1px] border-[#28242F]`
const active = `bg-gradient-to-r from-[#2C3BFA] to-[#B10C61] hover:from-[#B10C61] hover:to-[#2C3BFA] text-white `
const controls = `p-3 border-gray-500 border-[1.5px] rounded-lg text-gray-400 cursor-pointer`

const Col1 = () => {
    const [student, setStudent] = useState(true)
    const [Vip, setVip] = useState(false)
    const [general, setGeneral] = useState(false)
    
    const [count, setCount] = useState(1)

    const handleClick = itemName => {
        const stateMap = {
            student: setStudent,
            Vip: setVip,
            general: setGeneral,
        };

        Object.keys(stateMap).forEach(key => {
            stateMap[key](key === itemName);
        });
    }
    return (
        <>
            <div className='w-full border-[1.54px] border-gray-700 rounded-3xl overflow-x-hidden'>

                <div onClick={() => handleClick("student")} className={`${common} ${student ? active : "bg-[#0D0915]"} flex justify-between items-center`}>
                    <h1>Students Discount</h1>
                    <p>$25.00</p>
                </div>

                <div onClick={() => handleClick("Vip")} className={`${common} ${Vip ? active : "bg-[#0D0915]"} flex justify-between items-center`}>
                    <h1>VIP Experience</h1>
                    <p>$100.00</p>
                </div>

                <div onClick={() => handleClick("general")} className={`${common} ${general ? active : "bg-[#0D0915]"} flex justify-between items-center`}>
                    <h1>General Admission</h1>
                    <p>$40.00</p>
                </div>

            </div>

            <p className='w-full text-right text-xs font-bold text-gray-500 py-3'>Sales close: Sat, Jul 22, 8:00 AM (EST).</p>

            <div className='flex w-full items-center justify-between mt-2'>

                <div className='flex gap-5 items-center'>

                    <div className={controls} onClick={() => (count > 1) && setCount(count - 1)}><Remove /></div>

                    <p className='text-white text-2xl font-semibold'>{count}</p>

                    <div className={controls} onClick={() => setCount(count + 1)}><Add /></div>

                </div>

                <button className='flex items-center gap-2 rounded-md px-[4%] py-4 font-semibold text-white bg-gradient-to-r from-[#2C3BFA] to-[#B10C61] hover:from-[#B10C61] hover:to-[#2C3BFA] text-xl'> <LocalActivity /> Buy Ticket</button>

            </div>
        </>
    )
}

export default Col1