import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import axios from "axios";
import { API_URL } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { monthsForFilter } from "const/constants";

const ProfitLossTable = () => {
  const [{ overallProfitLossList }, {}] = useKothar();

  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "date", //normal accessorKey
      //   header: "Date",
      //   size: 100,
      // },

      {
        accessorKey: "clientName" || 0,
        header: "Category",
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
        accessorKey: "profitLossAmount",
        header: "Profit/Loss Amount",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div
              style={{
                color:
                  Number(row?.original?.profitLossAmount) > 0 ? "green" : "red",
              }}
            >
              {row?.original?.profitLossAmount}
            </div>
          );
        },
      },
    ],
    []
  );

  const yearsForFilter = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const table = useMaterialReactTable({
    columns,
    data: overallProfitLossList,
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    // enableDensityToggle: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Year
          </InputLabel>
          <Select
            labelId="year-filter-label"
            id="year-filter"
            // value={age}
            // onChange={handleChange}
            label="Select Year"
          >
            {yearsForFilter?.map((value, i) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Select Month
          </InputLabel>
          <Select
            labelId="month-filter-label"
            id="month-filter"
            // value={age}
            // onChange={handleChange}
            label="Select Month"
          >
            {monthsForFilter?.map(({ label, value }, i) => (
              <MenuItem value={value}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    ),
  });

  return (
    <div className="block w-full overflow-x-auto bg-white shadow rounded">
      <p className="p-4 px-4 font-semibold">Profit/Loss Table</p>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default ProfitLossTable;
