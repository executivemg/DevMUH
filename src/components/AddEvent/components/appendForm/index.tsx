"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line, RiMenuFoldLine, RiCloseFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SwipeableDrawer
} from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setFloorItems } from '@/store/slices/floorSlice';

const cl = console.log.bind(console);

// Data structure for form items
interface ItemData {
  name: string;
  alias: string;
  price: string;
  people: string;
  serveware: string;
}

// Component for individual item inputs
const ItemAppendForm = () => {
  const styles = {
    table_head_data: 'text-base-light uppercase text-[0.625rem] tracking-[2px] font-[500] ',
    table_body_data: 'text-secondary ',
  }

  const [openDrawer, setOpenDrawer] = useState(false)

  const items = useSelector((state: RootState) => state.floorData.items);
  const dispatch = useDispatch();

  const onDelete = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    dispatch(setFloorItems(updatedItems));
  };


  return (
    <div className={`fixed right-0 ${openDrawer? 'translate-x-0 bg-black/90 ' : 'translate-x-[80%]'} transition-all ease-in-out duration-[0.5s] z-[10] flex w-screen h-full shadow-[0_2px_3px_5px_rgba(44,59,250,0.1)] rounded-l-[8px] `}>
      <div 
        className={`relative ${openDrawer? 'visiblle opacity-100 flex-1' : 'invisible opacity-0'} h-full cursor-pointer` }
        onClick={()=>setOpenDrawer(false)}
      ></div>

      <TableContainer component={Paper} className='bg-gray-950 overflow-x-hidden w-full max-w-[45rem] px-[1rem] '>
        <div className='flex gap-[2rem] py-[1rem] '>
          <button className='text-base bg-base-light/10 p-[0.5rem] rounded-[4px] hover:bg-base-light/20 ease-250'
            onClick={()=>setOpenDrawer(!openDrawer)}
          >
            {!openDrawer? 
            <RiMenuFoldLine /> :
            <RiCloseFill />}
          </button>
          <p className='text-[0.875rem] font-mono uppercase text-base font-[600] '>List of Seats</p>
        </div>
        <Table sx={{ minWidth: 650 }} style={{borderRadius: '4px'}} aria-label="simple table"
          className='border-[1px] border-solid border-base-light/20 border-collapse rounded-[4px] '
        >
          <TableHead className='bg-base-dark'>
            <TableRow>
              <TableCell className='text-base font-[600] font-mono text-[0.75rem] uppercase'>Name</TableCell>
              <TableCell className='text-base font-[600] font-mono text-[0.75rem] uppercase' align="right">Alias</TableCell>
              <TableCell className='text-base font-[600] font-mono text-[0.75rem] uppercase' align="right">Price ($)</TableCell>
              <TableCell className='text-base font-[600] font-mono text-[0.75rem] uppercase' align="right">People</TableCell>
              <TableCell className='text-base font-[600] font-mono text-[0.75rem] uppercase' align="right">Wares</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='bg-base/20'>
            {items.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={`group relative ${index%2 === 0 && 'bg-base-light/20'}`}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.alias}</TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.people}</TableCell>
                <TableCell align="right">{item.serveware}</TableCell>
                <button
                  type="button"
                  className="absolute top-[0.325rem] right-[-1rem] z-[30] flex items-center justify-center sm:justify-self-end h-[calc(100%-0.875rem)] px-[0.5rem] rounded-[4px] group-hover:bg-slate-700 group-hover:hover:bg-red-800 text-white group-hover:right-[0.5rem] invisible group-hover:visible ease-250 shadow-[0_0_5px_1px_rgba(255,255,255,0.15)] "
                  onClick={() => onDelete(index)}
                >
                  <RiDeleteBin6Line className='text-[0.875rem]' />
                </button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemAppendForm;