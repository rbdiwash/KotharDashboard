import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "const/constants";
import { toast } from "react-toastify";

const useStateAndActions = () => {
  const getData = async () => {
    // const res = await axios.get(`${API_URL}/organization/list`);
    // return res?.data?.data;
  };
  const { data: consultancyList, refetch: refetchConsultancy } = useQuery(
    ["organization"],
    getData,
    {
      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );
  const getUniData = async () => {
    // const res = await axios.get(`${API_URL}/university/list`);
    // return res?.data?.data;
  };
  const { data: uniData, refetch: refetchUniData } = useQuery(
    ["university"],
    getUniData,
    {
      // onError: () => {
      //   toast.error("Error Fetching Data");
      // },
    }
  );

  const state = { consultancyList, uniData };
  const actions = { refetchConsultancy, refetchUniData };

  return [state, actions];
};
export default useStateAndActions;
