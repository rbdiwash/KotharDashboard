import { Autocomplete, Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, student_status } from "const/constants";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AcademicInfo from "./AcademicInfo";
import DocumentsAndAddress from "./DocumentsAndAddress";
import GeneralInfo from "./GeneralInfo";
import TestInfo from "./TestInfo";
import UniversityInfo from "./UniversityInfo";
import WorkExperience from "./WorkExperience";
const AddStudent = () => {
  const steps = [
    "General Information",
    "Documents and Address",
    "Academic Qualification",
    "Work Experience",
    "Test",
  ];

  const [generalInfo, setGeneralInfo] = useState({
    gender: null,
    clientId: null,
    maritalStatus: null,
    emergency: { name: "", email: "", contact: null, relation: null },
    course: null,
    university: null,
    state: null,
    intake: null,
    fee: null,
    caseOfficer: null,
    reference: null,
    status: null, 
  });
  const [addressInfo, setAddressInfo] = useState({
    permanent: { country: null, state: null, city: null, zip: null },
    temo: { country: null, state: null, city: null, zip: null },
    passport: { country: null, placeOfBirth: null },
    passportFile: null,
    moreThanOneCitizen: null,
    secondCountryName: null,
    livingInAnotherCountry: null,
    secondLivingCountryName: null,
    refusedFromAnyCountry: null,
    refusedCountryName: null,
    seriousMedicalCondition: null,
    medicalCause: null,
    criminalOffence: null,
    causeOfCriminalOffence: null,
    immigrationToOtherCountry: null,
    immigratedCountry: null,
  });
  const [academicInfo, setAcademicInfo] = useState({
    tenthDocuments: [],
    higherDocuments: [],
    bachelorDocuments: [],
    tenth: {
      board: null,
      gradingSystem: null,
      nameOfSchool: null,
      primaryMediumOfInstruction: null,
      countryOfStudy: null,
      stateOfStudy: null,
      score: null,
      scoreOutOf: null,
      passsOutYear: null,
      degree: null,
      degreeTitle: null,
    },
    higher: {
      board: null,
      gradingSystem: null,
      name: null,
      primaryMediumOfInstruction: null,
      countryOfStudy: null,
      stateOfStudy: null,
      score: null,
      scoreOutOf: null,
      passsOutYear: null,
      degree: null,
      degreeTitle: null,
    },
    bachelor: {
      board: null,

      gradingSystem: null,
      name: null,
      primaryMediumOfInstruction: null,
      countryOfStudy: null,
      stateOfStudy: null,
      score: null,
      scoreOutOf: null,
      passsOutYear: null,
      degree: null,
      degreeTitle: null,
    },
  });
  const [workInfo, setWorkInfo] = useState([]);
  const [testInfo, setTestInfo] = useState({
    testName: null,
    score: null,
    uniqueId: null,
    doe: null,
    document1: null,
    speaking: null,
    listening: null,
    reading: null,
    writing: null,
    testName2: null,
    score2: null,
    uniqueId2: null,
    doe2: null,
    document2: null,
  });

  const navigate = useNavigate();

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
      await axios.put(`${API_URL}/student/${data?.id}`, payload);
    } else {
      await axios.post(`${API_URL}/student`, payload);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...data,
      // status: "all",
    });
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
                    status: value.value,
                  }));
                }}
                required
                value={data?.status}
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
                <Title title={"Personal Details"} />
                <GeneralInfo {...{ generalInfo, setGeneralInfo }} />
                <Title title={"Documents and Address"} />
                <DocumentsAndAddress
                  {...{ addressInfo, setAddressInfo, generalInfo }}
                />
                <Title title={"Academic Qualification"} />
                <AcademicInfo {...{ academicInfo, setAcademicInfo }} />
                {/* <Title title={"Work Experience"} />
                <WorkExperience {...{ workInfo, setWorkInfo }} /> */}
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
