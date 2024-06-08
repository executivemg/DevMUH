import React from 'react';
import { RiUploadLine } from 'react-icons/ri';

interface UploadImageProps {
  label?: string; 
  name: string; 
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  accept?: string; 
  maxSize?: number; 
  errorMessage?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  label = 'Upload file',
  name,
  onChange,
  accept = 'image/*', 
  maxSize = 1024 * 1024 * 50, 
  errorMessage
}) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return; 

    // Validate file type
    if (!file.type.match(accept)) {
      console.error('Invalid file type. Please select a valid image.');
      return;
    }

    if (file.size > maxSize) {
      console.error('File size exceeds limit. Please select a file under 5MB.');
      return;
    }

    // Call the onChange handler if provided, passing the selected file
    onChange?.(event);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full space-x-6 ">
      <span className='mb-2 text-[1.25rem] w-full font-bold text-teal-900 pl-[1rem]'>{label}:</span>
      <label
        htmlFor={name}
        className="flex flex-col justify-center items-center gap-[1rem] bg-teal-50 h-[25rem] w-full max-w-[45rem] rounded-[8px] border-dashed border-[1px] border-slate-600 "
      >
        <div className='flex flex-col justify-center items-center gap-[1rem] '>
          <RiUploadLine className='text-[1.5rem] text-slate-600 ' />
          <p className='text-[0.875rem] text-teal-900'>Drag and Drop or</p>
          <p className='text-[0.875rem] text-teal-900'>Upload Image</p>
        </div>
        <span className='sr-only'>{name}</span>

        <input
          className="block invisible w-full text-md text-slate-500 file:mr-[1rem] file:py-[0.875rem] file:px-[1.25rem] file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          aria-describedby={`${name}_help`}
          id={name}
          name={name}
          // value={value}
          type="file"
          onChange={handleFileChange}
        />
      </label>

      {errorMessage && 
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      }
      {/* <p className="mt-1 text-[0.75rem] text-slate-500" id={`${name}_help`}>
        Supported file types: {accept.replace(/\//g, ', ')} (MAX. {Math.floor(maxSize / (1024 * 1024))}MB).
      </p> */}
    </div>
  )
}

export default UploadImage;