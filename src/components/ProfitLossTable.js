import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { monthsForFilter } from "const/constants";
import useKothar from "context/useKothar";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";

const ProfitLossTable = () => {
  const [{ profitLossList }, { getProfitLossData }] = useKothar();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("en-US", { month: "long" })
  );

  const colorName = useCallback(
    (data) => (Math.sign(data) !== -1 ? "success.main" : "error.main"),
    []
  );

  const totalValue = useCallback(
    (key) => profitLossList?.reduce((sum, acc) => sum + acc?.[key], 0) || 0,
    [profitLossList, year, month]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "module",
        header: "Category",
        size: 150,
        Footer: () => <Stack>Total</Stack>,
      },

      {
        accessorKey: "totalAmount", //normal accessorKey
        header: "Total Amount",
        size: 200,
        aggregationFn: "sum",
        Footer: () => (
          <Stack>
            <Box color={colorName(totalValue("totalAmount"))}>
              {Math.round(totalValue("totalAmount"))}
            </Box>
          </Stack>
        ),
      },
      {
        accessorKey: "paidAmount",
        header: "Paid Amount",
        size: 150,
        Footer: () => (
          <Stack>
            <Box color={colorName(totalValue("paidAmount"))}>
              {Math.round(totalValue("paidAmount"))}
            </Box>
          </Stack>
        ),
      },
      {
        accessorKey: "costAmount",
        header: "Cost Amount",
        size: 150,
        Footer: () => (
          <Stack>
            <Box color={colorName(totalValue("costAmount"))}>
              {Math.round(totalValue("costAmount"))}
            </Box>
          </Stack>
        ),
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
        Footer: () => (
          <Stack>
            <Box color={colorName(totalValue("profit"))}>
              {Math.round(totalValue("profit"))}
            </Box>
          </Stack>
        ),
      },
    ],
    [profitLossList]
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
              <MenuItem value={value} key={value}>
                {value}
              </MenuItem>
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
              <MenuItem value={value} key={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    ),
  });

  return (
    <div className="block w-full overflow-x-auto bg-white shadow rounded">
      <p className="p-4 px-4 font-semibold">Profit/Loss Table</p>
      <MaterialReactTable table={table} enableStickyFooter />
    </div>
  );
};

export default ProfitLossTable;
