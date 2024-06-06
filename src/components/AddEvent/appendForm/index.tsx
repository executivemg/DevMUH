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
    table_head_data: 'text-secondary font-[600] '
  }

  return (
    <div className="flex flex-col gap-[1.5rem] items-center max-w-[45rem] lg:w-full ">
      <table>
        <thead>
          <tr className='grid grid-cols-16 w-full'>
            <td className={styles.table_head_data + ' span-cols-4'}>Name</td>
            <td className={styles.table_head_data}>Alias</td>
            <td className={styles.table_head_data}>Price</td>
            <td className={styles.table_head_data}>People</td>
            <td className={styles.table_head_data}>Wares</td>
          </tr>
        </thead>
        <tbody>
        {items.map((item, index) => (
          <tr 
            key={index}
            className='group relative w-full'
          >
            <td>{item.name}</td>
            <td>{item.name}</td>
            <td>{item.name}</td>
            <td>{item.name}</td>
            <td>{item.name}</td>

            {/* BUTTON */}
            <button
              type="button"
              className="absolute top-0 right-[-1rem] flex items-center justify-center sm:justify-self-end h-[2.5rem] min-w-[2.5rem] rounded-[8px] bg-red-200 group-hover:bg-red-500 text-white group-hover:right-0 invisible group-hover:visible ease-250 "
              onClick={() => onDelete(index)}
            >
              <RiDeleteBin6Line />
            </button>
          </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemAppendForm;