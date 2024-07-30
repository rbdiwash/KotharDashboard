import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  required = false,
  className,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <>
      {label && (
        <label
          className="block uppercase text-slate-600 text-xs font-bold mb-2"
          htmlFor={label}
        >
          {label || "label"} {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
      <div className="flex items-center gap-1 rounded border  border-1 focus:outline-none focus:ring w-full ease-linear transition-all duration-150 disabled:text-gray-400 ">
        {startIcon && <div className="pl-2">{startIcon}</div>}
        <input
          type={type || "text"}
          className={
            "placeholder-slate-300 text-slate-600 bg-white  text-sm  focus:bg-none p-2 focus:outline-none focus:outline-0 w-full " +
            className
          }
          placeholder={placeholder || label}
          name={name}
          required={required}
          {...props}
        />
        {endIcon && endIcon}
      </div>
    </>
  );
};

export default InputField;
