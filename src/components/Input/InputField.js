import React from "react";

const InputField = ({
  label,
  type,
  placeholder,
  name,
  required = false,
  className,
  ...props
}) => {
  return (
    <>
      <label
        className="block uppercase text-slate-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label || "label"}
      </label>
      <input
        type={type || "text"}
        className={
          "p-3 placeholder-slate-300 text-slate-600 bg-white rounded border border-1 text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " +
          className
        }
        placeholder={placeholder}
        name={name}
        required={required}
        {...props}
      />
    </>
  );
};

export default InputField;
