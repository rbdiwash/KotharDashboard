import {
  Autocomplete,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, student_status } from "const/constants";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AcademicInfo from "./AcademicInfo";
import DocumentsAndAddress from "./DocumentsAndAddress";
import GeneralInfo from "./GeneralInfo";
import TestInfo from "./TestInfo";
import UniversityInfo from "./UniversityInfo";
import WorkExperience from "./WorkExperience";
import useKothar from "context/useKothar";
import { useEffect } from "react";
const AddStudent = () => {
  const [{ token }, { refetchStudent }] = useKothar();
  const navigate = useNavigate();

  const [generalInfo, setGeneralInfo] = useState({
    gender: null,
    clientId: null,
    maritalStatus: [],
    emergency: { name: "", email: "", contact: null, relation: null },
    course: null,
    university: null,
    state: [],
    intake: [],
    fee: null,
    caseOfficer: null,
    reference: null,
    status: null,
  });
  const [addressInfo, setAddressInfo] = useState({
    permanent: { country: null, state: null, city: null, zip: null },
    temp: { country: null, state: null, city: null, zip: null },
    passport: { country: null, placeOfBirth: null },
    passportFile: null,
    moreThanOneCitizen: null,
    secondCountryName: "",
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
    testName1: null,
    score1: null,
    uniqueId1: null,
    doe1: null,
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

  const data = {
    ...generalInfo,
    course: generalInfo?.course?.id,
    university: generalInfo?.university?.id,
    state: generalInfo?.state?.value,
    intake: generalInfo?.intake?.value,
    status: generalInfo?.status?.label,
    maritalStatus: generalInfo?.maritalStatus?.value,
    ...{
      ...addressInfo,
      permanent: {
        ...addressInfo?.permanent,
        state: addressInfo?.permanent?.state?.value,
      },
      temp: {
        ...addressInfo?.temp,
        state: addressInfo?.temp?.state?.value,
      },
    },
    academicInfo: {
      ...academicInfo,
      tenth: {
        ...academicInfo?.tenth,
        board: academicInfo?.tenth?.board?.value,
        gradingSystem: academicInfo?.tenth?.gradingSystem?.value,
      },
      higher: {
        ...academicInfo?.higher,
        board: academicInfo?.higher?.board?.value,
        gradingSystem: academicInfo?.higher?.gradingSystem?.value,
      },
      bachelor: {
        ...academicInfo?.bachelor,
        board: academicInfo?.bachelor?.board?.value,
        gradingSystem: academicInfo?.bachelor?.gradingSystem?.value,
      },
    },
    // workInfo: { ...workInfo },
    testInfo: {
      ...testInfo,
      testName1: testInfo?.testName1?.value,
      testName2: testInfo?.testName2?.value,
    },
  };

  const { mutate } = useMutation(postData, {
    onSuccess() {
      toast.success(
        data?.id ? "Data updated Successfully" : "Data added Successfully"
      );
      refetchStudent();
      // setTimeout(() => {
      navigate("/admin/student");
      // }, 2000);
    },
    onError() {
      toast.error(data?.id ? "Error Updating Data" : "Error Submitting Data");
    },
  });
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const value = state?.item;
      setGeneralInfo({
        name: value?.name,
        address: value?.address,
        dob: value?.dob,
        gender: value?.gender,
        email: value?.email,
        number: value?.number,
        passportNumber: value?.passportNumber,
        visaExpiry: value?.visaExpiry,
        visaStatus: value?.visaStatus,
        passportExpiry: value?.passportExpiry,
        dateOfIssue: value?.dateOfIssue,
        id: value?.clientId,
        maritalStatus: value?.maritalStatus,
        emergency: {
          name: value?.emergency?.name,
          email: value?.emergency?.email,
          contact: value?.emergency?.contact,
          relation: value?.emergency?.relation,
        },
        course: value?.course,
        university: value?.university,
        state: [],
        intake: [value?.intake],
        fee: value?.fee,
        caseOfficer: value?.caseOfficer,
        reference: value?.reference,
        status: value?.status,
      });
      setAddressInfo({
        ...addressInfo,
        permanent: value?.permanent,
        temp: value?.temp,
        passport: value?.passport,
        passportFile: value?.passportFile,
        moreThanOneCitizen: value?.moreThanOneCitizen,
        secondCountryName: value?.secondCountryName,
        livingInAnotherCountry: value?.livingInAnotherCountry,
        secondLivingCountryName: value?.secondLivingCountryName,
        refusedFromAnyCountry: value?.refusedFromAnyCountry,
        refusedCountryName: value?.refusedCountryName,
        seriousMedicalCondition: value?.seriousMedicalCondition,
        medicalCause: value?.medicalCause,
        criminalOffence: value?.criminalOffence,
        causeOfCriminalOffence: value?.causeOfCriminalOffence,
        immigrationToOtherCountry: value?.immigrationToOtherCountry,
        immigratedCountry: value?.immigratedCountry,
      });
      setAcademicInfo(value.academicInfo);
    }
  }, [state]);

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

              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Switch
                      sx={{ m: 0 }}
                      onChange={(e) => {
                        setGeneralInfo({
                          ...generalInfo,
                          status: e.target.checked,
                        });
                      }}
                      checked={data?.status}
                    />
                  }
                  label="Complete"
                />
                <Autocomplete
                  onChange={(e, value) => {
                    setGeneralInfo((prevState) => ({
                      ...prevState,
                      status: value,
                    }));
                  }}
                  value={data?.status}
                  placeholder="Select Student Status"
                  options={student_status}
                  disablePortal
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Student Status"
                      required
                    />
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
