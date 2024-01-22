import { Autocomplete, Button, TextField } from "@mui/material";
import InputField from "components/Input/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Typography from "@mui/material/Typography";
import GeneralInfo from "./GeneralInfo";
import AcademicInfo from "./AcademicInfo";
import TestInfo from "./TestInfo";
import DocumentsAndAddress from "./DocumentsAndAddress";
import WorkExperience from "./WorkExperience";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_URL } from "const/constants";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import UniversityInfo from "./UniversityInfo";
import { student_status } from "const/constants";
const AddStudent = () => {
  const steps = [
    "General Information",
    "Documents and Address",
    "Academic Qualification",
    "Work Experience",
    "Test",
  ];

  const [generalInfo, setGeneralInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [academicInfo, setAcademicInfo] = useState({});
  const [workInfo, setWorkInfo] = useState([]);
  const [testInfo, setTestInfo] = useState({});

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const data = {
    ...generalInfo,
    ...addressInfo,
    academicInfo,
    workInfo,
    testInfo,
  };
  const { isLoading, isError, error, mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  async function postData(payload) {
    if (data?.id) {
      await axios.put(`${API_URL}/organization/update`, payload);
    } else {
      await axios.post(`${API_URL}/student/offshore/payloads`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
          }
        >
          <div className="rounded-t mb-0 px-10 py-3 border-0">
            <div className="flex justify-between items-center">
              <div className="relative flex justify-start gap-4 items-center">
                <IoArrowBack
                  className="text-xl cursor-pointer"
                  onClick={() => navigate(-1)}
                />
                <h3 className={"font-semibold text-xl text-slate-700"}>
                  Add Student
                </h3>
              </div>
              <Autocomplete
                onChange={(e, value) => {
                  setGeneralInfo((prevState) => ({
                    ...prevState,
                    student_status: value,
                  }));
                }}
                required
                value={data?.student_status}
                placeholder="Select Student Status"
                options={student_status}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Select Student Status" />
                )}
                ListboxProps={{
                  style: {
                    maxHeight: "180px",
                  },
                }}
                size="small"
                sx={{ width: 300 }}
              />
            </div>
          </div>
          <div className="block w-full overflow-x-auto mt-4 studentForm">
            <div className="flex-auto lg:px-10 py-3 pt-0">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {/* <Box sx={{ width: "100%" }}>
                  <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {allStepsCompleted() ? (
                      <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                          {activeStep === 0 ? (
                            <GeneralInfo {...{ generalInfo, setGeneralInfo }} />
                          ) : activeStep === 1 ? (
                            <DocumentsAndAddress
                              {...{ addressInfo, setAddressInfo }}
                            />
                          ) : activeStep === 2 ? (
                            <AcademicInfo
                              {...{ academicInfo, setAcademicInfo }}
                            />
                          ) : activeStep === 3 ? (
                            <WorkExperience {...{ workInfo, setWorkInfo }} />
                          ) : (
                            <TestInfo {...{ testInfo, setTestInfo }} />
                          )}
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            variant="contained"
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          <Button
                            onClick={handleNext}
                            sx={{ mr: 1 }}
                            variant="contained"
                          >
                            Next
                          </Button>
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography
                                variant="caption"
                                sx={{ display: "inline-block" }}
                              >
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button
                                onClick={handleComplete}
                                variant="contained"
                                type="submit"
                              >
                                {completedSteps() === totalSteps() - 1
                                  ? "Finish"
                                  : "Complete Step"}
                              </Button>
                            ))}
                        </Box>
                      </>
                    )}
                  </div>
                </Box> */}
                <Title title={"Personal Details"} />
                <GeneralInfo {...{ generalInfo, setGeneralInfo }} />
                <Title title={"Documents and Address"} />
                <DocumentsAndAddress {...{ addressInfo, setAddressInfo }} />
                <Title title={"Academic Qualification"} />
                <AcademicInfo {...{ academicInfo, setAcademicInfo }} />
                <Title title={"Work Experience"} />
                <WorkExperience {...{ workInfo, setWorkInfo }} />
                <Title title={"Language Test"} />
                <TestInfo {...{ testInfo, setTestInfo }} />{" "}
                <Title title={"Course & University"} />
                <UniversityInfo {...{ generalInfo, setGeneralInfo }} />
                <div className="w-full flex justify-end mt-2 gap-4">
                  {/* <Button variant="outlined" component={Link} to=""> */}
                  <Button variant="outlined" onClick={() => navigate(-1)} to="">
                    Go Back
                  </Button>
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

export default AddStudent;

const Title = ({ title }) => {
  return (
    <p className="text-xl font-semibold tracking-wider bg-orange-500 p-2 text-white">
      {title}
    </p>
  );
};
