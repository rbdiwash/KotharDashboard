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
];
const Accounts = ({ color = "light" }) => {
  const tableHeadClass = color === "light" ? "light-bg" : "dark-bg";
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [searchText, setSearchText] = useState("");

  const [{ courseList }, { refetchCourseList }] = useKothar();

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
    { title: "Professional Year", value: "py" },
    { title: "Visa", value: "visa" },
    { title: "Insurance", value: "insurance" },
  ];

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
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select Type" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 500 }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search using Name" />
                    )}
                  />
                </div>
                <Button
                  variant="contained"
                  component={Link}
                  to="/admin/accounts/add"
                >
                  Add Account Details
                </Button>
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
      )}
    </div>
  );
};

export default Accounts;
