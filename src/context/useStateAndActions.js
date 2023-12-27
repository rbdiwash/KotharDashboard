import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import { toast } from "react-toastify";

const useStateAndActions = () => {
  const getData = async () => {
    const res = await axios.get(`${API_URL}/organization/list`);
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
  const getUniData = async () => {
    const res = await axios.get(`${API_URL}/university/list`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYmRpd2FzaEBnbWFpbC5jb20iLCJpYXQiOjE3MDM3MTY3ODgsImV4cCI6MTcwMzcxODIyOH0.cNS61GYBKNjFmGhQEWC2QxdrW_ViJePWVH1uKJQKTpo`,
      },
    });

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
    const res = await axios.get(`${API_URL}/course/list`);
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
    const res = await axios.get(`${API_URL}/student/list`);
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
    const res = await axios.get(`${API_URL}/users/all`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYmRpd2FzaEBnbWFpbC5jb20iLCJpYXQiOjE3MDM1NTE5MDUsImV4cCI6MTcwMzU1MzM0NX0.wuoBzUaIOpyau5wqqEOYCpjWx9PH4kU2lRFixJu7-Go`,
      },
    });
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

  const state = {
    consultancyList,
    uniData,
    courseList,
    studentList,
    usersList,
  };
  const actions = {
    refetchConsultancy,
    refetchUniData,
    refetchCourseList,
    refetchStudent,
    refetchUsers,
  };

  return [state, actions];
};
export default useStateAndActions;
