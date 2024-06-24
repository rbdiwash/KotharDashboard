import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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
  const [{ profitLossList }, { getProfitLossData }] = useKothar();
  console.log("🚀  profitLossList:", profitLossList);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "date", //normal accessorKey
      //   header: "Date",
      //   size: 100,
      // },

      {
        accessorKey: "module",
        header: "Category",
        size: 150,
      },

      {
        accessorKey: "totalAmount", //normal accessorKey
        header: "Total Amount",
        size: 200,
        aggregationFn: "sum",

        AggregatedCell: ({ cell }) => <div>Total Score: {cell.getValue()}</div>,
        Footer: () => (
          <Stack>
            <Box color="warning.main">{Math.round(200)}</Box>
          </Stack>
        ),
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
        accessorKey: "profit",
        header: "Profit/Loss Amount",
        size: 150,
        Cell: ({ row, renderedCellValue }) => {
          return (
            <div
              style={{
                color: Number(row?.original?.profit) > 0 ? "green" : "red",
              }}
            >
              {row?.original?.profit}
            </div>
          );
        },
      },
    ],
    []
  );

  const handleYearChange = (selectedYear) => {
    getProfitLossData({ year: selectedYear, month });
    setYear(selectedYear);
  };

  const handleMonthChange = (selectedMonth) => {
    getProfitLossData({ year, month: selectedMonth });
    setMonth(selectedMonth);
  };

  const yearsForFilter = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const table = useMaterialReactTable({
    columns,
    data: profitLossList,
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    // enableDensityToggle: true,
    initialState: {
      density: "compact",
      enableGlobalFilter: true,
      showGlobalFilter: true,
    },
    enablePagination: false,
    muiTableBodyRowProps: ({ row }) => {
      return {
        sx: {
          backgroundColor: row.original.module === "Total" ? "#eee" : "inherit",
        },
      };
    },
    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        fontWeight: row.original.module === "Total" && "bold",
        fontSize: row.original.module === "Total" && 16,
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "6px",
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
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
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
            value={month}
            onChange={(e) => handleMonthChange(e.target.value)}
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
