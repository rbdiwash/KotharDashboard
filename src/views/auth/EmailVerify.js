import {
    Alert,
    Button
} from "@mui/material";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EmailVerify() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [message, setMessage] = useState();

  const { code } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/api/reset-password`, {
        password: data?.password,
        code,
      })
      .then((res) => {
        navigate("/");
        // setErrorMessage(false);
      })
      .catch((err) => {
        console.log(err?.data?.message);
        // navigate("/admin/dashboard");
      });
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
                    Verify Email
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
                      label="Email"
                      placeholder="Type your registered Email"
                      name="email"
                      required
                      type="email"
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Username"
                      placeholder="Type your username"
                      name="email"
                      required
                      type="email"
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  {message && <Alert severity="success">{message}</Alert>}

                  <div className="text-center mt-6">
                    <Button
                      variant="contained"
                      className="w-full"
                      type="submit"
                    >
                      Reset Password
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
