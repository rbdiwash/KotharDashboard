import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="row flex flex-col justify-center items-center h-[70vh]">
        <h1
          className="text-center mb-5"
          style={{ fontSize: "100px", color: "#f33f3f" }}
        >
          Oops!
        </h1>
        <h1 className="text-primary text-3xl">404 - PAGE NOT FOUND</h1>
        <p className="mb-4  text-center my-6 ">
          The page you are looking for might have <br /> been removed or had its
          name changed or is not Unavailable.
        </p>
        <Link to="/admin" className="btn">
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
