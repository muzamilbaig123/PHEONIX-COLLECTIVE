"use client";

import React from "react";

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  options: { label: string; value: string }[];
  errorMessage?: string;
  isWhiteTheme?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  label,
  value,
  options,
  errorMessage,
  isWhiteTheme = false,
  onChange,
}) => {
  const textColor = isWhiteTheme ? "text-white" : "text-[#202020]";
  const borderColor = isWhiteTheme
    ? "border-white focus:border-white"
    : "border-[#202020]";
  const errorBorderColor = "border-red-500 focus:border-red-500";

  return (
    <div className="relative flex flex-col">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`peer block min-h-[auto] w-full border-b-2 px-3 py-[0.50rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
          ${errorMessage ? errorBorderColor : borderColor} 
          bg-transparent ${textColor}`}
      >
        <option value="" disabled></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value === "" && (
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-0 -top-1 mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out 
          peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] 
          ${errorMessage ? "text-red-500" : textColor}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomSelect;
