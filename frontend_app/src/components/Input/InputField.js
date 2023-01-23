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
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label || "label"}
      </label>
      <input
        type={type || "text"}
        className={
          "border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 " +
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
