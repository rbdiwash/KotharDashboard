import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
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

const Accounts = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [accountTab, setAccountTab] = useState(null);

  const [{ accountsList, providerList }, { refetchAccountList }] = useKothar();
  const [value, setValue] = useState(0);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const status = tabOptions.find((item, i) => {
      return i === newValue;
    });
    setAccountTab(status);
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        size: 150,
        accessorKey: "clientName",
        Cell: ({ row }) => {
          return <div>{row.original.clientName || "N/A"}</div>;
        },
      },

      {
        accessorKey: "totalStudentCost", //normal accessorKey
        header: "Student Cost",
        size: 50,
        Cell: ({ row }) => {
          return <div>{row.original.totalStudentCost || 0}</div>;
        },
      },

      {
        accessorKey: "totalCost" || 0,
        header: "Cost",
        size: 50,
      },

      {
        accessorKey: "caseOfficer", //normal accessorKey
        header: "Case Officer",
        size: 150,
      },
      {
        accessorKey: "totalCommissionClaimed", //normal accessorKey
        header: "Commission  Claimed",
        size: 50,
      },
      // {
      //   accessorKey: "commission",
      //   header: "Commission/ Reminder Date",
      //   size: 50,
      //   Cell: ({ row }) => {
      //     return (
      //       <div>
      //         {row.original.commission ||
      //           new Date(
      //             row?.original?.reminderDate || null
      //           )?.toLocaleDateString()}
      //       </div>
      //     );
      //   },
      // },
      {
        accessorKey: "totalPaidAmount",
        header: "Amount Paid",
        size: 150,
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center">
              <Tooltip title="Edit Course" arrow>
                <IconButton
                  onClick={() =>
                    navigate("/admin/account/add", {
                      state: { item },
                    })
                  }
                >
                  <AiFillEdit className="text-sky-600 cursor-pointer" />
                </IconButton>
              </Tooltip>
              {/* <Tooltip title="Delete Course" arrow>
                <IconButton
                  onClick={() =>
                    setOpenConfirmationModal({
                      state: true,
                      id: row?.original?.id,
                    })
                  }
                >
                  <AiFillDelete className="text-red-600 cursor-pointer" />
                </IconButton>
              </Tooltip> */}
            </div>
          );
        },
      },
    ],
    []
  );

  const providerColumns = useMemo(
    () => [
      {
        header: "Provider Name",
        size: 150,
        accessorKey: "universityName",
        Cell: ({ row }) => {
          return <div>{row?.original?.name || "N/A"}</div>;
        },
      },
      {
        accessorKey: "totalStudents" || 0,
        header: "No of Students",
        size: 50,
      },

      {
        accessorKey: "totalCommission", //normal accessorKey
        header: "Total Commission",
        size: 150,
      },
      {
        accessorKey: "totalBonus", //normal accessorKey
        header: "Total Bonus",
        size: 50,
      },
      {
        accessorKey: "totalGST", //normal accessorKey
        header: "Total GST",
        size: 50,
      },

      {
        accessorKey: "nextReminder",
        header: "Next Reminder",
        size: 50,
        Cell: ({ row }) => {
          return (
            <div>
              {new Date(
                row?.original?.reminderDate || null
              )?.toLocaleDateString()}
            </div>
          );
        },
      },

      {
        accessorKey: "Action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center">
              <Tooltip title="Edit Course" arrow>
                <IconButton
                  onClick={() =>
                    navigate("/admin/account/provider/add", {
                      state: { item },
                    })
                  }
                >
                  <AiFillEdit className="text-sky-600 cursor-pointer" />
                </IconButton>
              </Tooltip>
            </div>
          );
        },
      },
    ],
    []
  );
  const providerTable = useMaterialReactTable({
    columns: providerColumns,
    data: providerList,
    enablePagination: true,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },

    enableColumnPinning: true,
  });

  console.log(accountsList, providerList);

  const table = useMaterialReactTable({
    columns,
    data: accountsList,
    enablePagination: true,
    enableRowNumbers: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },

    enableColumnPinning: true,
  });

  const [openDiscussion, setOpenDiscussion] = useState(false);
  const handleDiscussion = () => {
    setOpenDiscussion(!openDiscussion);
  };
  const tabOptions = [
    { label: "Client", value: "client" },
    { label: "Provider", value: "Provider" },
  ];
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
              <form className="flex items-center justify-between  w-full  rounded mr-3">
                <div>
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-slate-700" : "text-white")
                    }
                  >
                    Account Details
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <FaRocketchat
                    className="text-blue-500 text-3xl cursor-pointer"
                    onClick={handleDiscussion}
                  />
                </div>
              </form>
            </div>
          </div>

          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            role="navigation"
            sx={{ background: "#eee" }}
          >
            {tabOptions?.map((arg) => (
              <Tab
                label={arg?.label}
                key={arg?.label}
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              />
            ))}
          </Tabs>
          <TabPanel value={value} index={value}>
            <div className="block w-full overflow-x-auto">
              {value === 0 ? (
                <MaterialReactTable table={table} />
              ) : (
                <MaterialReactTable table={providerTable} />
              )}
            </div>
          </TabPanel>
        </div>
      </div>
      {openConfirmationModal.state && (
        <DeleteModal
          open={openConfirmationModal.state}
          item="Account Details"
          handleCancel={() =>
            setOpenConfirmationModal({ state: false, id: null })
          }
          handleDelete={() => deleteData()}
        />
      )}
      {openDiscussion && (
        <DiscussionModal open={openDiscussion} setOpen={setOpenDiscussion} />
      )}
    </div>
  );
};

export default Accounts;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
