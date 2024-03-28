import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import DeleteModal from "components/Modals/DeleteModal";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";
import DiscussionModal from "components/Modals/DiscussionModal";

const Accounts = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [
    { insuranceList, rplList, studentList, visaList, skillList, accountsList },
    { refetchAccountList },
  ] = useKothar();
  console.log("🚀  accountsList:", accountsList);

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
        accessorKey: "name", //access nested data with dot notation
        header: "Full Name",
        size: 150,
      },
      {
        accessorKey: "amount",
        header: "Total Amount",
        size: 150,
      },
      {
        accessorKey: "discount", //normal accessorKey
        header: "Discount",
        size: 200,
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        size: 150,
      },
      {
        accessorKey: "Action",
        header: "Action",
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
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={getClientOption()}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option.name}
                    getOptionKey={(option) => option.id}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search using Name" />
                    )}
                    onChange={(e, value) => {
                      setSelectedStudent(value);
                    }}
                    value={selectedStudent}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <FaRocketchat
                    className="text-blue-500 text-3xl cursor-pointer"
                    onClick={handleDiscussion}
                  />
                  <Button
                    variant="contained"
                    component={Link}
                    to="/admin/account/add"
                  >
                    Add Account Details
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <MaterialReactTable table={table} />
          </div>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="Course"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}{" "}
      {openDiscussion && (
        <DiscussionModal open={openDiscussion} setOpen={setOpenDiscussion} />
      )}
    </div>
  );
};

export default Accounts;
