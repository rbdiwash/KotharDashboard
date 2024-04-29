import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { FaDownload } from "react-icons/fa";

const DownloadFile = ({ type }) => {
  const handleDownloadData = () => {
    axios
      .get(`/report/url/${type}`)
      .then((response) => {
        console.log(response);
        //rpl, student, insurance, client, skill, visa
        const a = document.createElement("a");

        const blobFile = new Blob([response?.data], {
          type: "application/octet-stream",
        });
        const url = response.data.url;
        a.href = url;
        a.download = "Clients_Data.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<FaDownload />}
        onClick={handleDownloadData}
      >
        Download Data
      </Button>
    </>
  );
};

export default DownloadFile;
