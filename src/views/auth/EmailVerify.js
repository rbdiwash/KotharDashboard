import { Alert, Button } from "@mui/material";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmailVerify() {
  const navigate = useNavigate();
  const [data, setCode] = useState();
  const handleInputChange = (e) => {
    const { value } = e.target;
    setCode(value);
  };
  const [message, setMessage] = useState();

  const { code } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/email/otp/verify`, {
        code: "string",
        email: "string",
        username: "string",
      })
      .then((res) => {
        navigate("/login");
        toast.success("Your email has been verified, Please login to continue");
      })
      .catch((err) => {
        console.log(err?.data?.message);
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
                      label="Enter the code you received on your email"
                      placeholder="Enter the code"
                      name="code"
                      required
                      value={code}
                      onChange={handleInputChange}
                    />
                  </div>
                  If you haven't received the code or the code is expired,
                  request a new code.{" "}
                  <a className="underline text-blue-500 cursor-pointer">
                    Send Again
                  </a>
                  {message && <Alert severity="success">{message}</Alert>}
                  <div className="text-center mt-6">
                    <Button
                      variant="contained"
                      className="w-full"
                      type="submit"
                      disabled={!data}
                    >
                      Verify Email
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
