import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import InputField from "components/Input/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  console.log("🚀  data", data);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("admin/login", data)
      .then((res) => {
        setData({
          username: "",
          password: "",
        });
        localStorage.setItem("token", res?.data?.accessToken);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        // console.log(err?.data?.message);
        navigate("/admin/dashboard");
      });
  };

  const handleValidation = () => {
    if (data.password !== data?.cpassword) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-5/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h3 className="text-slate-500 text-xl font-bold uppercase">
                    Register a new account
                  </h3>
                </div>

                <hr className="mt-6 border-b-1 border-slate-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-6">
                    <TextField
                      label="Full Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="name"
                      required
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-6">
                    <TextField
                      label="Email"
                      variant="outlined"
                      size="small"
                      name="email"
                      required
                      fullWidth
                      type="email"
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-6">
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      size="small"
                      name="contact"
                      type="number"
                      required
                      fullWidth
                      value={data?.contact}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 mb-6 gap-8">
                    <FormControl
                      variant="outlined"
                      size="small"
                      error={errorMessage}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errorMessage && (
                        <FormHelperText id="component-error-text">
                          {"Password and Confirm password are not matching."}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl variant="outlined" size="small">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        type={showPassword ? "text" : "password"}
                        name="cpassword"
                        onKeyUp={handleValidation}
                        onChange={handleInputChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                    </FormControl>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-slate-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-sky-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <Button variant="contained" type="submit" fullWidth>
                      Create Account
                    </Button>
                  </div>
                </form>
              </div>
            </div>{" "}
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-full text-center">
                <Link to="/" className="text-slate-200">
                  <small>Already an account? Go back to Login</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
