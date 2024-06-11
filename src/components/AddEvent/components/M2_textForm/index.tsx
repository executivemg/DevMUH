"use client";

import React, { useState, useEffect } from "react";
import { RiAddLine, RiProfileLine, RiMoneyDollarCircleLine, RiListView } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FormControl, TextField, InputAdornment } from "@mui/material";
// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setFloorCategory } from '@/store/slices/floorSlice';

const cl = console.log.bind(console);

// Data structure for form items
interface ItemData {
  name: string;
  price: string;
  number: string;
  desc: string;
}

// Component for individual item inputs
const TextForm = () => {
  const dispatch = useDispatch();

  const [itemUpdate, setItemUpdate] = useState<ItemData>({ 
    name: "", 
    price: "",
    number: "0",
    desc: ""
  });
  const items = useSelector((state: RootState) => state.floorData.categories);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    cl(itemUpdate);
  }, [itemUpdate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFloorCategory([...items, itemUpdate]));
    setItemUpdate({ name: "", price: "", number: "0", desc: "" });
  };

  const styles = {
    input: {
      width: '100%'
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-lg:px-[1rem] w-full lg:max-w-[18rem] pb-[5rem] ">
      <TextField
        label="Category Name"
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
        placeholder="e.g. VIPs"
        onChange={onChange}
      />
          
      <div className='flex flex-col gap-[2rem] w-full '>
        <TextField
          label="Number of Seats"
          variant='outlined'
          name={`number`}
          type="text"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiProfileLine className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={itemUpdate.number}
          placeholder="e.g. 15"
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
          label="Description"
          variant='outlined'
          name={`desc`}
          type="text"
          InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RiListView className='text-[1.25rem] text-slate-400 ' />
            </InputAdornment>
            ),
          }}
          value={itemUpdate.desc}
          placeholder="Children below 12 years are not allowed here"
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="flex items-center justify-center sm:justify-self-end h-[3.5rem] w-full rounded-[8px] bg-[#2C3BFA] text-white"
        onClick={onSubmit}
      >
        Create Seat
        <RiAddLine />
      </button>
    </form>
  );
};

export default TextForm;