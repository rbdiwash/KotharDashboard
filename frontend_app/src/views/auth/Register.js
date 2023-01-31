import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [message, setMessage] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  console.log("🚀  showPassword", showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("admin/login", data)
      .then((res) => {
        setMessage({ success: res?.data?.message });
        setData({
          username: "",
          password: "",
        });
        localStorage.setItem("token", res?.data?.accessToken);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        // console.log(err?.data?.message);
        // setMessage({ error: err?.data?.message || "Error" });
        navigate("/admin/dashboard");
      });
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Full Name"
                      placeholder="Full Name"
                      name="email"
                      required
                      type="email"
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Email"
                      placeholder="Enter Valid Email"
                      name="email"
                      required
                      type="email"
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Contact No."
                      placeholder="Enter Phone Number"
                      name="contact"
                      required
                      type="number"
                      value={data?.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 mb-3">
                    <InputField
                      type="password"
                      placeholder="Password"
                      name="password"
                      label="Password"
                      required
                      value={data?.password}
                      onChange={handleInputChange}
                    />
                    <TextField
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      size="small"
                      value={data?.password}
                      className="bg-white h-[90vh]"
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />{" "}
                    <TextField
                      type="password"
                      placeholder="Re-type Password"
                      name="cpassword"
                      required
                      size="small"
                      value={data?.cpassword}
                      className="bg-white h-[90vh]"
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>{" "}
                  <div className="relative md:w-1/2 mb-3">
                    <InputField
                      type="password"
                      placeholder="Password"
                      name="password"
                      label="Password"
                      required
                      value={data?.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
