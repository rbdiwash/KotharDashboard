import React from "react";

const SearchField = ({
  type,
  searchText,
  setSearchText ,
}) => {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <form className="flex-row min-w-[600px] flex-wrap items-center border  rounded mr-3">
        <div className="relative flex w-full flex-wrap items-stretch">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300  bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-search"></i>
          </span>
          <input
            value={searchText}
            type="text"
            placeholder={`Search ${type || ""} here...`}
            className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
            onChange={handleChange}
          />
        </div>
      </form>
    </>
  );
};

export default SearchField;
