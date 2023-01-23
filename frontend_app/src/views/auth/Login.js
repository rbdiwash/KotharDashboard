import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import InputField from "components/Input/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [message, setMessage] = useState({});
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
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err?.data?.message);
        // setMessage({ error: err?.data?.message || "Error" });
      });
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in Admin
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Email"
                      placeholder="Email"
                      name="email"
                      required
                      type="email"
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
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
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <Checkbox id="customCheckLogin" type="checkbox" />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="text-center mt-6">
                    <Button
                      variant="contained"
                      className="w-full"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
