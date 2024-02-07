import { Autocomplete, Button, TextField, makeStyles } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "const/axios";
import InputField from "components/Input/InputField";
import { API_URL } from "const/constants";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import useKothar from "context/useKothar";
import { months } from "const/constants";

const AddCourse = ({ color = "light" }) => {
  const [data, setData] = useState({
    duration: null,
    fee: null,
    intake: [],
    level: null,
    name: null,
    universities: [],
  });
  console.log(data);
  const [{ uniData }, { refetchCourseList }] = useKothar();

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setData({
        ...state?.item,
        // university: {
        //   name: state?.item?.university,
        //   id: state?.item?.universityId,
        // },
        intake: months.filter(({ value: id1 }) =>
          state?.item?.intake?.split("/").some((id2) => id2 === id1)
        ),

        // months.find((item) => item?.value === state?.item?.intake),
      });
    }
  }, [state]);

  const { mutate } = useMutation(postData, {
    onSuccess(suc) {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      navigate("/admin/course");
      refetchCourseList();
    },
    onError(err) {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });

  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/course/update/${payload?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/course/register`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      intake: data?.intake?.map((item) => item?.value).join("/"),
      universities: data?.universities?.map((item) => item?.name),
    });
  };

  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-10 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full  max-w-full flex justify-start gap-4 items-center">
                <IoArrowBack
                  className="text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <h3
                  className={
                    "font-semibold text-xl " +
                    (color === "light" ? "text-slate-700" : "text-white")
                  }
                >
                  Add Course
                </h3>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-8">
            <div className="flex-auto lg:px-10 py-10 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8 justify-end items-end">
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Name"
                      placeholder="Name"
                      name="name"
                      required
                      type="text"
                      value={data?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      label="Level"
                      placeholder="Level"
                      name="level"
                      required
                      type="text"
                      value={data?.level}
                      onChange={handleInputChange}
                    />
                  </div>{" "}
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Duration of Course in Year"
                      name="duration"
                      label="Duration of Course in Year"
                      required
                      value={data?.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="input-label">Select University *</label>
                    <Autocomplete
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          universities: value,
                        }));
                      }}
                      required
                      multiple
                      // value={data?.university}
                      options={uniData || []}
                      getOptionLabel={(option) => option?.name || ""}
                      getOptionValue={(option) => option?.id}
                      disablePortal
                      renderInput={(params) => (
                        <TextField {...params} label="Select University" />
                      )}
                      ListboxProps={{
                        style: {
                          maxHeight: "180px",
                        },
                      }}
                      size="small"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="input-label">Select Intake *</label>
                    <Autocomplete
                      onChange={(e, value) => {
                        setData((prevState) => ({
                          ...prevState,
                          intake: value,
                        }));
                      }}
                      required
                      multiple
                      value={data?.intake}
                      placeholder="Select Intake"
                      options={months}
                      disablePortal
                      renderInput={(params) => (
                        <TextField {...params} label="Select Intake" />
                      )}
                      ListboxProps={{
                        style: {
                          maxHeight: "180px",
                        },
                      }}
                      size="small"
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <InputField
                      type="text"
                      placeholder="Fees (per semester) in AUD"
                      name="fee"
                      label="Fees (per semester)"
                      required
                      value={data?.fee}
                      onChange={handleInputChange}
                    />
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

export default AddCourse;
