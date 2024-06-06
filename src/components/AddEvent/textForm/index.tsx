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

  const styles = {
    input: {
      width: '100%'
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-[18rem] ">
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
        style={styles.input}
        placeholder="e.g. Parlour 1"
        onChange={onChange}
      />
          
      <div className='flex flex-col gap-[2rem] w-full '>
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
          style={styles.input}
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
          style={styles.input}
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
          style={styles.input}
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
          style={styles.input}
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end h-[3.5rem] w-full rounded-[8px] bg-[#2C3BFA] text-white font-[600]"
      >
        Create Seat
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm;