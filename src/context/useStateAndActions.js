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
    const res = await axios.get(`organization/list`);
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
    const res = await axios.get(`client/list`);
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
    const res = await axios.get(`university/list`);

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
    const res = await axios.get(`course/list`);
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
    const res = await axios.get(`student/list`);
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
    const res = await axios.get(`users/all`, {});
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
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  useEffect(() => {
    if (token) {
      refetchConsultancy();
      refetchUniData();
      refetchCourseList();
      refetchStudent();
      refetchUsers();
      refetchClient();
    }
  }, [token]);

  const state = {
    clientList,
    consultancyList,
    uniData,
    courseList,
    studentList,
    usersList,
    token,
    wholeLoading,
  };
  const actions = {
    refetchClient,
    refetchConsultancy,
    refetchUniData,
    refetchCourseList,
    refetchStudent,
    refetchUsers,
    setToken,
    setWholeLoading,
  };

  return [state, actions];
};
export default useStateAndActions;
