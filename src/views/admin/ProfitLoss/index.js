import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import DiscussionModal from "components/Modals/DiscussionModal";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaRocketchat } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfitLoss = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [
    { insuranceList, rplList, studentList, visaList, skillList, accountsList },
    { refetchAccountList },
  ] = useKothar();

  const deleteData = () => {
    axios
      .delete(`${API_URL}/accounts/${openConfirmationModal?.id}`)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchAccountList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };

  const options = [
    { label: "RPL", value: "rpl" },
    { label: "Student", value: "student" },
    { label: "Visa", value: "visa" },
    { label: "Insurance", value: "insurance" },
    {
      label: "Skill Assessment",
      value: "skill-assessment",
    },
  ];

  const getClientOption = () => {
    let secondOption = [];

    switch (selectedType?.value) {
      case "rpl":
        secondOption = rplList;
        break;
      case "student":
        secondOption = studentList;
        break;
      case "insurance":
        secondOption = insuranceList;
        break;
      case "visa":
        secondOption = visaList;
        break;
      case "skill-assessment":
        secondOption = skillList;
        break;
    }
    return secondOption ?? [];
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        size: 150,
        accessorKey: "clientName",
        Cell: ({ row, renderedCellValue }) => {
          return <div>{row.original.clientName || "N/A"}</div>;
        },
      },
      {
        accessorKey: "discount", //normal accessorKey
        header: "Discount",
        size: 200,
        Cell: ({ row, renderedCellValue }) => {
          return <div>{row.original.discount || 0}</div>;
        },
      },

      {
        accessorKey: "amount" || 0,
        header: "Amount",
        size: 150,
      },

      {
        accessorKey: "amountAfterDiscount", //normal accessorKey
        header: "After Discount",
        size: 200,
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        size: 150,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: accountsList,
  });
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };
  return (
    <div className="flex flex-wrap mt-4 dashBody">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded min-h-[70vh] " +
            (color === "light" ? "bg-white" : "bg-sky-900 text-white")
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <form className="flex items-center justify-between w-full  rounded mr-3">
                <div className="relative flex mx-auto  items-center">
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    onChange={(e, value) => {
                      setSelectedType(value);
                      setSelectedStudent(null);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select Type" />
                    )}
                    value={selectedType}
                    isOptionEqualToValue={(options, value) =>
                      options.value === value.value
                    }
                  />
                 
                </div>
              </form>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <MaterialReactTable table={table} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
