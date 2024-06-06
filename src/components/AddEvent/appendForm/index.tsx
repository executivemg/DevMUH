"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line, RiProfileLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TextField, InputAdornment } from "@mui/material";

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
  item: ItemData;
  index: number;
  onDelete: (index: number) => void;
  onChange: (index: number, field: keyof ItemData, value: string | number) => void;
}> = ({ 
  item={
    name: '',
    alias: '',
    price: '',
    people: '',
    serveware: ''
  }, 
  index,
  onDelete,
  onChange 
}) => {
  return (
    <div className="flex flex-col gap-[1.5rem] items-center max-w-[45rem] lg:w-full ">
      <TextField
        label="Name"
        variant='outlined'
        name={`name`}
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdOutlineDriveFileRenameOutline className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
          ),
        }}
        value={item.name}
        className='min-w-[10rem] lg:w-full'
        placeholder="e.g. Parlour 1"
        onChange={(e: any) => onChange(index, "name", e.target.value)}
      />
          
      <div className='flex flex-col gap-[1.5rem] '>
        <TextField
          label="Alias"
          variant='outlined'
          name={`alias`}
          type="text"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiProfileLine className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={item.alias}
          placeholder="e.g. P 1"
          onChange={(e: any) => onChange(index, "alias", e.target.value)}
        />
        <TextField
          label="Price"
          variant='outlined'
          name={`price`}
          type="number"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={item.price}
          placeholder="e.g. 100"
          onChange={(e: any) => onChange(index, "price", e.target.value)}
        />
        <TextField
          label="People"
          variant='outlined'
          name={`people`}
          type="number"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={item.people}
          placeholder="e.g. 3"
          onChange={(e: any) => onChange(index, "people", e.target.value)}
        />
        <TextField
          label="Serve Wares"
          variant='outlined'
          name={`serveware`}
          type="number"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiMoneyDollarCircleLine className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={item.serveware}
          placeholder="e.g. 5"
          onChange={(e: any) => onChange(index, "serveware", e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        type="button"
        className="flex items-center justify-center sm:justify-self-end h-[2.5rem] min-w-[2.5rem] rounded-[8px] bg-red-500 text-white"
        onClick={() => onDelete(index)}
      >
        <RiDeleteBin6Line />
      </button>
    </div>
  );
};

export default ItemAppendForm;