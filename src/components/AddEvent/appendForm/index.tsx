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
    table_head_data: 'text-secondary font-[600] ',
    table_body_data: 'text-secondary re ',
  }

  return (
    <div className="flex flex-col gap-[1.5rem] items-center w-full ">
      <table className='w-full '>
        <thead className='w-full'>
          <tr className='w-full bg-[#252fdd] px-[0.5rem] py-[0.25rem] rounded-[4px] '>
            <td className={styles.table_head_data}>Name</td>
            <td className={styles.table_head_data}>Alias</td>
            <td className={styles.table_head_data}>Price</td>
            <td className={styles.table_head_data}>People</td>
            <td className={styles.table_head_data}>Wares</td>
          </tr>
        </thead>
        <tbody className='w-full bg-[#252fdd] '>
        {items.map((item, index) => (
          <tr 
            key={index}
            className={`group relative w-full ${index%2===0 && 'bg-[#252fdd]'} `}
          >
            <td className={styles.table_body_data}>{item.name}</td>
            <td className={styles.table_body_data}>{item.alias}</td>
            <td className={styles.table_body_data}>{item.price}</td>
            <td className={styles.table_body_data}>{item.people}</td>
            <td className={styles.table_body_data}>{item.serveware}</td>

            {/* BUTTON */}
            <button
              type="button"
              className="absolute top-0 right-[-1rem] z-[10] flex items-center justify-center sm:justify-self-end h-[2.5rem] min-w-[2.5rem] rounded-[8px] bg-red-200 group-hover:bg-red-500 text-white group-hover:right-0 invisible group-hover:visible ease-250 "
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