import { Button, FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [data, setData] = useState({
    name: null,
    password: null,
    mobileNumber: null,
    email: null,
    username: null,
    type: "ADMIN",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post(`${API_URL}/register/user`, {
      ...data,
      organizationId: 1,
      mfa: "true",
    });
    console.log("🚀  response:", response);
  };
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded  bg-white"
          }
        >
          <div className="rounded-t mb-0 px-10 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex justify-between">
                <h3 className={"font-semibold text-xl text-slate-700"}>
                  Add Admins/Users
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-8">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Full Name"
                      placeholder="Enter Full Name"
                      name="name"
                      required
                      type="text"
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Username"
                      placeholder="Enter Username"
                      name="username"
                      required
                      type="text"
                      value={data?.username}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <InputField
                      type="email"
                      placeholder="University Email"
                      name="email"
                      label="Email"
                      required
                      value={data?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="number"
                      placeholder="Mobile Number"
                      name="abn"
                      label="Mobile Number"
                      required
                      value={data?.mobileNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Password"
                      name="password"
                      label="Password"
                      required
                      value={data?.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      User Type
                    </label>
                    <FormControl fullWidth size="small">
                      <Select
                        value={data?.type}
                        name="type"
                        onChange={handleInputChange}
                        required
                      >
                        <MenuItem value={"ADMIN"}>Admin</MenuItem>
                        <MenuItem value={"USER"}>User</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="w-full flex justify-end mt-6 gap-4">
                  {/* <Button variant="outlined" component={Link} to=""> */}
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>{" "}
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
