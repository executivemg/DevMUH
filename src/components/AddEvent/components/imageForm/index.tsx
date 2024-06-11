import React from 'react';
import { RiUploadLine } from 'react-icons/ri';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setFloorImage } from '@/store/slices/floorSlice';

interface UploadImageProps {
  name: string; 
  onChange?: React.ChangeEventHandler<HTMLInputElement>; 
  accept?: string; 
  maxSize?: number; 
  errorMessage?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  name,
  onChange,
  accept = 'image/*', 
  maxSize = 1024 * 1024 * 50, 
  errorMessage
}) => {
  const dispatch = useDispatch();
  const floorImage = useSelector((state: RootState) => state.floorData.floorImage);
  
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

    // Dispatch the setFloorImage action with the selected file
    try {
      const base64String = await convertToBase64(file);
      dispatch(setFloorImage(base64String));
    } catch (error) {
      console.error('Error converting file to Base64:', error);
    }

    onChange?.(event);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full space-x-6 ">
      {floorImage ? (
        <div className="relative h-[35rem] w-full max-w-[45rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={floorImage} 
            alt="Uploaded Floor Plan"
            className="object-contain h-full w-full rounded-[8px] cursor-pointer border-solid border-[2px] border-base/50"
            onClick={() => document.getElementById(name)?.click()}
          />
          <input
            className="block invisible h-full w-full absolute left-0 top-0 z-[5]"
            id={name+'2'}
            name={name}
            type="file"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <label
          htmlFor={name}
          className="flex flex-col justify-center items-center gap-[1rem] bg-base-light/20 h-[35rem] w-full max-w-[45rem] rounded-[8px] border-dashed border-[1px] border-base-light/50 cursor-pointer "
        >
          <div className='flex flex-col justify-center items-center gap-[1rem] '>
            <RiUploadLine className='text-[1.875rem] text-base-light ' />
            <p className='text-[0.875rem] text-base-light'>Add a Floor Plan</p>
            <p className='text-[0.75rem] text-base-light uppercase font-mono'>Upload Image</p>
          </div>
          <span className='sr-only'>{name}</span>

          <input
            className="block invisible w-full text-md text-slate-500 file:mr-[1rem] file:py-[0.875rem] file:px-[1.25rem] file:rounded-full file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            aria-describedby={`${name}_help`}
            id={name}
            name={name}
            type="file"
            onChange={handleFileChange}
          />
        </label>
      )}

      {errorMessage && 
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      }
    </div>
  )
}

export default UploadImage;
