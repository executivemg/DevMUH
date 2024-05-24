import React from 'react';

const cl = console.log.bind(console);

interface InputFieldProps {
  label?: string; 
  name?: string; 
  type?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  icon?: any;
  onChange?: (e: any) => void; 
}

const InputField: React.FC<InputFieldProps> = ({
  label = "label",
  name = "",
  type = 'text',
  value = "",
  placeholder = 'Enter',
  className = "",
  icon = null,
  onChange
}) => {

  return (
    <div className={`relative flex items-center justify-center h-[2.25rem] ${!className && 'min-w-[5rem] lg:min-w-[8rem]'} outline outline-[2px] outline-gray-400 rounded-[8px] ${className}`}>
      {/* ::::::::::::::::::::::::::::::::::: LABEL */}
      <label 
        htmlFor={name} 
        className='absolute top-[-1rem] left-[1rem] px-[0.5rem] py-[0.25rem] bg-white font-semibold text-[0.75rem] text-gray-500 '
      >
        {label}
      </label>

      {/* ::::::::::::::::::::::::::::::::::: INPUT */}
      <input 
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        className="w-full h-full text-[1.05rem] bg-white placeholder:text-gray-500 text-gray-700 pl-[0.5rem] focus:outline-blue-500 rounded-[8px]"
      />

      {/* ::::::::::::::::::::::::::::::::::: ICON */}
      <div className='absolute right-[0.5rem] '>
        {icon}
      </div>
    </div>
  )
}

export default InputField