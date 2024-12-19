"use client";

import React from "react";

interface CustomInputProps {
  id: string | undefined;
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  errorMessage?: string;
  isWhiteTheme?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  id,
  label,
  type,
  value,
  errorMessage,
  isWhiteTheme = false,
  onChange,
}) => {
  const textColor = isWhiteTheme ? "text-white" : "text-[#202020]";
  const borderColor = isWhiteTheme
    ? "border-white focus:border-white"
    : "border-[#202020] focus:border-[#202020]";
  const errorBorderColor = "border-rose-600 focus:border-rose-600";

  return (
    <div className="relative flex flex-col">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`peer block min-h-[auto] w-full border-b-2 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear 
          ${errorMessage ? errorBorderColor : borderColor}
          bg-transparent ${textColor}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 -top-2 mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out 
    ${
      value
        ? `-translate-y-[0.9rem] scale-[0.8] ${
            errorMessage ? "text-rose-600" : textColor
          }`
        : `peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 ${
            errorMessage ? "text-rose-600" : textColor
          }`
    }`}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
