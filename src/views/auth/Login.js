import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import InputField from "components/Input/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "const/constants";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useKothar from "context/useKothar";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [{ token }, { setToken }] = useKothar();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = validateEmail(data?.username)
      ? { password: data?.password, email: data?.username }
      : { ...data, username: data?.username };

    mutate(payload);
  };

  async function postData(payload) {
    delete axios.defaults.headers.common["Authorization"];

    const resp = await axios.post(`${API_URL}/auth/authenticate`, payload);

    return resp;
  }

  const {
    data: loggedData,
    mutate,
    isLoading,
  } = useMutation(postData, {
    onSuccess: async (res) => {
      setData({
        username: "",
        password: "",
      });
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("userEmail", data?.username);
      localStorage.setItem("userDetail", JSON.stringify(res?.data?.userDetail));
      setToken(res?.data?.token);
      res?.data?.data?.mfa
        ? navigate("/email/verify")
        : navigate("/admin/dashboard");
      res?.data?.data?.mfa
        ? toast.success("Your email is not verified, verify to login.")
        : toast.success(res?.data?.message || "Loggeed in successfully");
    },
    onError(err) {
      console.log("🚀  err:", err);
      toast.error(err?.response?.data?.errorMessage ?? "Error");
    },
  });

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
                      label="Username/Email"
                      placeholder="Enter Username or E-mail"
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
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      startIcon={isLoading && <CircularProgress size={15} />}
                      disabled={isLoading}
                    >
                      Sign In
                    </Button>
                  </div>
                  {/* <div className="text-center mt-6">
                    <Button variant="outlined" component={Link} to="/register">
                      Sign up
                    </Button>
                  </div> */}
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
