"use client";

import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RiAddLine, RiProfileLine, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FormControl, TextField, InputAdornment } from "@mui/material";

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
const TextForm: React.FC<{
  onAdd: (item: ItemData) => {}
}> = ({ onAdd }) => {

  const [itemUpdate, setItemUpdate] = useState({name: "", alias: "", price: "", people: "", serveware: ""});
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    cl(itemUpdate);
  }, [itemUpdate]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    onAdd(itemUpdate);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[3rem] items-center max-w-[45rem] lg:w-full ">
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
        value={itemUpdate.name}
        className='min-w-[10rem] lg:w-full'
        placeholder="e.g. Parlour 1"
        onChange={onChange}
      />
          
      <div className='flex flex-col gap-[3rem] '>
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
          value={itemUpdate.alias}
          placeholder="e.g. P 1"
          onChange={onChange}
          className='h-[4rem] mt-[1rem]'
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
          value={itemUpdate.price}
          placeholder="e.g. 100"
          onChange={onChange}
          className='h-[4rem] mt-[1rem]'
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
          value={itemUpdate.people}
          placeholder="e.g. 3"
          onChange={onChange}
          className='h-[4rem] mt-[1rem]'
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
          value={itemUpdate.serveware}
          placeholder="e.g. 5"
          onChange={onChange}
          className='h-[4rem] mt-[1rem]'
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end h-[2.5rem] min-w-[2.5rem] rounded-[8px] bg-myPrimary text-white"
      >
        Create Seat
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm;