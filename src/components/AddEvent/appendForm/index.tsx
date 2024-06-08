"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line, RiProfileLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import {
  TextField, 
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
const ItemAppendForm: React.FC<{
  items: [ItemData];
  index: number;
  onDelete: (index: number) => void;
  onChange: (index: number, field: keyof ItemData, value: string | number) => void;
}> = ({ 
  items, 
  index,
  onDelete,
}) => {
  const styles = {
    table_head_data: 'text-base-light uppercase text-[0.625rem] tracking-[2px] font-[500] ',
    table_body_data: 'text-secondary ',
  }

  return (
    <div className="fixed right-0 z-[10] flex w-screen h-full shadow-[0_2px_3px_5px_rgba(44,59,250,0.1)] rounded-l-[8px] ">
      <div className='bg-black/90 flex-1 h-full cursor-pointer'></div>

      <TableContainer component={Paper} className='bg-base-dark overflow-x-hidden w-full max-w-[45rem] px-[1rem] '>
        <div className='flex justify-between gap-[2rem] py-[1rem] '>
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