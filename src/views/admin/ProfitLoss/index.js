import { Autocomplete, TextField } from "@mui/material";

import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfitLoss = ({ color = "light" }) => {
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [{ accountsList }, {}] = useKothar();

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

  const columns = useMemo(
    () => [
      {
        accessorKey: "date", //normal accessorKey
        header: "Date",
        size: 200,
        Cell: ({ row, renderedCellValue }) => {
          return <div>{row.date}</div>;
        },
      },

      {
        accessorKey: "clientName" || 0,
        header: "Client Name",
        size: 150,
      },

      {
        accessorKey: "totalAmount", //normal accessorKey
        header: "Total Amount",
        size: 200,
      },
      {
        accessorKey: "paidAmount",
        header: "Paid Amount",
        size: 150,
      },
      {
        accessorKey: "costAmount",
        header: "Cost Amount",
        size: 150,
      },
      {
        accessorKey: "profileAmount",
        header: "Profit/Loss Amount",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: accountsList,
    enableRowNumbers: true,
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "500px" } },
    enableColumnPinning: true,
    enableRowPinning: true,
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
