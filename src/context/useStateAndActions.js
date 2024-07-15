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
  const [selectedVisaTab, setSelectedVisaTab] = useState({
    label: "All",
    value: "all",
  });
  const [rplList, setRPLList] = useState([]);
  const [visaList, setVisaList] = useState([]);
  const [profitLossList, setProfitLossList] = useState([]);
  const [moduleWiseProfitLossList, setModuleWiseProfitLossList] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationClicked, setNotificationClicked] = useState(false);

  const getNotificationsData = () => {
    axios
      .get("/notification")
      .then((response) => {
        setNotificationsList(response?.data?.reverse());
      })
      .catch((err) => console.log(err));
  };

  const getProfitLossData = (params) => {
    const year = params?.year || new Date().getFullYear();
    const month =
      params?.month || new Date().toLocaleString("en-US", { month: "long" });

    let url = `${API_URL}/profit-loss`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { year, month },
      })
      .then((res) => {
        const finalData = res?.data?.data;

        const total = {
          module: "Total",
          totalAmount: finalData?.totalAmount,
          paidAmount: finalData?.totalPaid,
          costAmount: finalData?.totalCost,
          profit: finalData?.totalProfit,
        };
        setProfitLossList([...finalData?.moduleProfit]);
      })
      .catch((err) =>
        toast.error(err || "Server Error loading Profit Loss List")
      );
  };

  const getModuleWiseProfitLoss = async (params) => {
    setWholeLoading(true);
    const module = params?.module || "rpl";
    const year = params?.year || new Date().getFullYear();
    const month =
      params?.month || new Date().toLocaleString("en-US", { month: "long" });

    const res = await axios.get(`profit-loss/type`, {
      params: { year, month, module },
    });

    if (res?.data?.data?.plData) {
      const finalData = res?.data?.data?.plData;
      setWholeLoading(false);
      if (finalData?.length > 0) {
        setModuleWiseProfitLossList([...finalData]);
      } else {
        setModuleWiseProfitLossList([...finalData]);
      }
    } else {
      console.log("Error loading data");
      setWholeLoading(false);
    }
  };

  const getData = async () => {
    const res = await axios.get(`organization`);
    return res?.data?.data;
  };

  const { data: consultancyList, refetch: refetchConsultancy } = useQuery(
    ["organization"],
    getData,
    {
      refetchOnWindowFocus: false,
      enabled: false,

      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );
  const getClientData = async () => {
    const res = await axios.get(`clients/?active=Y`);
    return res?.data?.data;
  };
  const { data: clientList, refetch: refetchClient } = useQuery(
    ["client"],
    getClientData,
    {
      refetchOnWindowFocus: false,
      enabled: false,

      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );
  const getArchivedClient = async () => {
    const res = await axios.get(`clients/?active=N`);
    return res?.data?.data;
  };
  const { data: archivedClientList, refetch: refetchArchivedClient } = useQuery(
    ["archivedClient"],
    getArchivedClient,
    {
      refetchOnWindowFocus: false,
      enabled: false,
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
      enabled: false,

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
      enabled: false,

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
      enabled: false,

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
      enabled: false,

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
      enabled: false,
    }
  );

  const getRPLList = (params) => {
    let url =
      typeof params === "string"
        ? `${API_URL}/rpl/?${params}`
        : `${API_URL}/rpl`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setRPLList(res?.data?.data));
  };

  const getVisaList = (params) => {
    let url =
      typeof params === "string"
        ? `${API_URL}/visa-applications/?${params}`
        : `${API_URL}/visa-applications`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setVisaList(res?.data?.data))
      .catch((err) => console.log(err));
  };

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
      enabled: false,
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
      enabled: false,
    }
  );
  const getAccountsList = async () => {
    const res = await axios.get(`${API_URL}/accounts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res?.data?.data;
  };
  const { data: accountsList = [], refetch: refetchAccountList } = useQuery(
    ["accounts"],
    getAccountsList,
    {
      refetchOnWindowFocus: false,
      enabled: false,
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
      getVisaList();
      refetchSkillList();
      refetchInsuranceList();
      getRPLList();
      refetchAccountList();
      getProfitLossData();
      // refetchRPLList();
      getModuleWiseProfitLoss();
      getNotificationsData();
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
    archivedClientList,
    accountsList,
    selectedVisaTab,
    profitLossList,
    moduleWiseProfitLossList,
    notificationsList,
    notificationClicked,
  };
  const actions = {
    refetchClient,
    refetchConsultancy,
    refetchUniData,
    refetchCourseList,
    refetchStudent,
    refetchUsers,
    refetchInvoiceList,
    getVisaList,
    refetchSkillList,
    // refetchRPLList,
    refetchInsuranceList,
    refetchAccountList,
    getRPLList,
    getClientData,
    setToken,
    setWholeLoading,
    getArchivedClient,
    refetchArchivedClient,
    setRPLList,
    setSelectedVisaTab,
    getProfitLossData,
    getModuleWiseProfitLoss,
    getNotificationsData,
    setNotificationsList,
    setNotificationClicked,
  };

  return [state, actions];
};
export default useStateAndActions;
