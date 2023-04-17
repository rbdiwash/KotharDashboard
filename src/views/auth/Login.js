import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import InputField from "components/Input/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "const/constants";

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
      .post(`${API_URL}/signin`, data)
      .then((res) => {
        setMessage({ success: res?.data?.message });
        setData({
          username: "",
          password: "",
        });
        localStorage.setItem("token", res?.data?.accessToken);
        // navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err?.data?.message);
        // setMessage({ error: err?.data?.message || "Error" });
        // navigate("/admin/dashboard");
      });
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-[60vh]">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h3 className="text-slate-500 text-xl font-bold uppercase">
                    Sign in
                  </h3>
                </div>

                <hr className="mt-6 border-b-1 border-slate-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Username"
                      placeholder="Username"
                      name="username"
                      required
                      type="text"
                      value={data?.username}
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

                  <div className="text-center mt-6">
                    <Button variant="contained" fullWidth type="submit">
                      Sign In
                    </Button>
                  </div>
                  <div className="text-center mt-6">
                    <Button variant="outlined" component={Link} to="/register">
                      Sign up
                    </Button>
                  </div>
                </form>
              </div>
            </div>{" "}
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <Link to="/forgot" className="text-slate-200">
                  <small>Forgot Password?</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
