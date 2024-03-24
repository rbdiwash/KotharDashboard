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
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const data = [
    {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      name: {
        firstName: "Jane",
        lastName: "Doe",
      },
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      name: {
        firstName: "Joe",
        lastName: "Doe",
      },
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      name: {
        firstName: "Kevin",
        lastName: "Vandy",
      },
      address: "722 Emie Stream",
      city: "Lincoln",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
    {
      name: {
        firstName: "Divash",
        lastName: "Ranabhat",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
  ];
  const [
    { insuranceList, rplList, studentList, visaList, skillList },
    { refetchCourseList },
  ] = useKothar();

  const deleteData = () => {
    axios
      .delete(`${API_URL}/organization/delete/${openConfirmationModal?.id}`)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message || "Data Deleted Successfully");
        setOpenConfirmationModal({ state: false, id: null });
        refetchCourseList();
      })
      .catch((err) => {
        toast.error("Error Deleting Data");
      });
  };

  const options = [
    { title: "RPL", value: "rpl" },
    { title: "Admission", value: "admission" },
    { title: "Visa", value: "visa" },
    { title: "Insurance", value: "insurance" },
    { title: "SkillAssessment", value: "skillList" },
  ];

  const getClientOption = () => {
    let secondOption = [];

    switch (selectedType) {
      case "rpl":
        secondOption = rplList;
        break;
      case "admission":
        secondOption = studentList;
        break;
      case "insurance":
        secondOption = insuranceList;
        break;
      case "visa":
        secondOption = visaList;
        break;
      case "skillList":
        secondOption = skillList;
        break;
    }
    return secondOption;
  };

  //nested data is ok, see accessorKeys in ColumnDef below
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
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
                      setSelectedType(value?.value);
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select Type" />
                    )}
                  />
                  <Autocomplete
                    size="small"
                    disablePortal
                    options={getClientOption()}
                    sx={{ width: 500 }}
                    // getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search using Name" />
                    )}
                  />
                </div>{" "}
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
