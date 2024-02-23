import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import axios from "const/axios";
import { API_URL } from "const/constants";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const useStateAndActions = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [wholeLoading, setWholeLoading] = useState(false);

  const getData = async () => {
    const res = await axios.get(`organization`);
    return res?.data?.data;
  };

  const { data: consultancyList, refetch: refetchConsultancy } = useQuery(
    ["organization"],
    getData,
    {
      refetchOnWindowFocus: false,
      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );
  const getClientData = async () => {
    const res = await axios.get(`clients`);
    return res?.data?.data;
  };
  const { data: clientList, refetch: refetchClient } = useQuery(
    ["client"],
    getClientData,
    {
      refetchOnWindowFocus: false,
      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );
  const getUniData = async () => {
    const res = await axios.get(`university`);

    return res?.data?.data;
  };

  const { data: uniData, refetch: refetchUniData } = useQuery(
    ["university"],
    getUniData,
    {
      refetchOnWindowFocus: false,
      retry: false,

      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );

  const getCourseData = async () => {
    const res = await axios.get(`course`);
    return res?.data?.data;
  };
  const { data: courseList, refetch: refetchCourseList } = useQuery(
    ["course"],
    getCourseData,
    {
      refetchOnWindowFocus: false,
      retry: false,

      //   onError: () => {
      //     toast.error("Error Fetching Data");
      //   },
    }
  );
  const getStudent = async () => {
    const res = await axios.get(`student`);
    return res?.data?.data;
  };
  const { data: studentList, refetch: refetchStudent } = useQuery(
    ["student"],
    getStudent,
    {
      refetchOnWindowFocus: false,
      retry: false,

      //   onError: () => {
      //     toast.error("Error Fetching Data");
      //   },
    }
  );
  const getUsers = async () => {
    const res = await axios.get(`users`, {});
    return res?.data?.data;
  };
  const { data: usersList, refetch: refetchUsers } = useQuery(
    ["users"],
    getUsers,
    {
      refetchOnWindowFocus: false,
      retry: false,

      //   onError: () => {
      //     toast.error("Error Fetching Data");
      //   },
    }
  );

  const getInvoiceList = async () => {
    const res = await axios.get(`${API_URL}/invoice`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: invoiceList, refetch: refetchInvoiceList } = useQuery(
    ["invoice"],
    getInvoiceList,
    {
      refetchOnWindowFocus: false,
    }
  );
  const getVisaList = async (params) => {
    let url =
      typeof params === "string"
        ? `${API_URL}/visa-applications?${params}`
        : `${API_URL}/visa-applications`;
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: visaList, refetch: refetchVisaList } = useQuery(
    ["visaList"],
    getVisaList,
    {
      refetchOnWindowFocus: false,
    }
  );
  const getRPLList = async (params) => {
    let url =
      typeof params === "string"
        ? `${API_URL}/rpl/?${params}`
        : `${API_URL}/rpl`;
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: rplList, refetch: refetchRPLList } = useQuery(
    ["rplList"],
    getRPLList,
    {
      refetchOnWindowFocus: false,
    }
  );
  const getSkillAssessmentList = async () => {
    const res = await axios.get(`${API_URL}/skill-assessment`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: skillList, refetch: refetchSkillList } = useQuery(
    ["skill"],
    getSkillAssessmentList,
    {
      refetchOnWindowFocus: false,
    }
  );
  const getInsuranceList = async () => {
    const res = await axios.get(`${API_URL}/insurance`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: insuranceList, refetch: refetchInsuranceList } = useQuery(
    ["insurance"],
    getInsuranceList,
    {
      refetchOnWindowFocus: false,
    }
  );
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (token) {
      refetchConsultancy();
      refetchUniData();
      refetchCourseList();
      refetchStudent();
      refetchUsers();
      refetchClient();
      refetchInvoiceList();
      refetchVisaList();
      refetchSkillList();
      refetchInsuranceList();
      refetchRPLList();
    }
  }, [token]);

  const state = {
    clientList,
    consultancyList,
    uniData,
    courseList,
    studentList,
    usersList,
    invoiceList,
    token,
    wholeLoading,
    visaList,
    skillList,
    insuranceList,
    rplList,
  };
  const actions = {
    refetchClient,
    refetchConsultancy,
    refetchUniData,
    refetchCourseList,
    refetchStudent,
    refetchUsers,
    refetchInvoiceList,
    refetchVisaList,
    refetchSkillList,
    refetchRPLList,
    refetchInsuranceList,
    getRPLList,
    getVisaList,
    setToken,
    setWholeLoading,
  };

  return [state, actions];
};
export default useStateAndActions;
