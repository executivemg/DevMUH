"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { SideBar } from '..';

const btn = `border-white border-[1px] py-2 px-6 rounded-xl`;
const li = `cursor-pointer transition-colors duration-500`;

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { data: session } = useSession();
    const [showSideBar, setShowSideBar] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);

    const totalQuantity = cartItems.length;

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 2) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
            <div className={`bg-[#2C3BFA] w-[98.75vw] flex justify-center text-white absolute top-0 py-2 ${isScrolled ? 'top-2' : ''}`}>
                <div className='sm:w-[80vw] w-[90vw] 2xl:w-[1500px] flex justify-between items-center'>
                    <h1 className='text-white font-semibold text-lg line-clamp-1'>Your exclusive access to the hottest events, concerts parties, and celebrations in the world!</h1>
                    {session ? (
                        <div>
                            <div className="cursor-pointer" onClick={handleMenu}>
                                <IconButton>
                                    <AccountCircle fontSize='medium' className='text-white' />
                                </IconButton>
                            </div>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem>Dashboard</MenuItem>
                                <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link href={'/login'} className='text-xl text-white font-bold'>Login</Link>
                    )}
                </div>
            </div>
            <div className={`w-[98.75vw] flex justify-center fixed transition-all duration-1000 ${!isScrolled ? 'top-16' : 'top-3'} z-[1001!important]`}>
                <header className={`sm:w-[80vw] w-[90vw] 2xl:w-[1500px] px-3 flex items-center justify-between  rounded-2xl border border-[#2C3BFA] text-2xl ${!isScrolled ? "backdrop-blur-3xl" : "backdrop-blur-3xl  "} z-10 shadow-2xl shadow-[#ffffff47] font-semibold`}>
                    <Link href={'/'}>
                        <Image src={'/logo.png'} alt="Logo" className="h-auto max-sm:w-[4rem]  w-auto max-w-[6rem] mx-auto md:mx-0" width={100} height={100} />
                    </Link>

                    <ul className='flex items-center sm:gap-[18%] gap-4'>
                        <li className={`border-b-[#2C3BFA] border-b-[2px] text-[#2C3BFA] ${li}`}>Home</li>
                        <a href='#events' className={`hover:text-[#2C3BFA] hover:border-b-[#2C3BFA] text-white hover:border-b-[2px] ${li} mt-1`}>Events</a>
                    </ul>

                    <div
                        onClick={() => setShowSideBar(true)}
                        className="relative col-span-1 sm:col-span-1 flex mt-4 ml-4 w-[50px]">
                        <IoCartOutline className="cursor-pointer h-8 w-8 md:h-10 md:w-10 text-white" />
                        <div className="absolute bg-[#2C3BFA] w-6 h-6 rounded-full text-white text-center right-0 top-0 text-sm flex justify-center items-center">
                            <span>{totalQuantity}</span> {/* Display total cart quantity */}
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;