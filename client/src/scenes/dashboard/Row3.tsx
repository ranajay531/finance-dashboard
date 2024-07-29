import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";


const Row3 = () => {
    const {palette} = useTheme();
    const pieColors = [palette.primary[600], palette.primary[300]];

    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();

    const pieChartData = useMemo(() => {
        if (kpiData) {
          const totalExpenses = kpiData[0].totalExpenses;
          return Object.entries(kpiData[0].expensesByCategory).map(
            ([key, value]) => {
              return [
                {
                  name: key,
                  value: value,
                },
                {
                  name: `${key} of Total`,
                  value: totalExpenses,
                },
              ];
            }
          );
        }
      }, [kpiData]);

    const productColumns = [
        {field: "_id", headerName: "ID", flex: 1},
        {field: "expense", headerName: "Expense", flex: 0.5, renderCell: (params: GridCellParams) => `$${Number(params.value)}`},
        {field: "price", headerName: "Price", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}`},
    ]

    const transactionColumns = [
        {field: "_id", headerName: "ID", flex: 1},
        {field: "buyer", headerName: "Customer", flex: 0.67},
        {field: "amount", headerName: "Total", flex: 0.35, renderCell: (params: GridCellParams) => `$${params.value}`},
        {field: "productIds", headerName: "Quantity", flex: 0.35, renderCell: (params: GridCellParams) => (params.value as Array<string>).length},
    ]

    return (
        <>
        <DashboardBox gridArea="g">
            <BoxHeader
                title="Products List"
                sideText={`${productData?.length} products`}
            />
            <Box mt="0.5rem" padding="0 0.5rem" height="70%"
                sx={{
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                      },
                      "& .MuiDataGrid-columnSeparator": {
                        visibility: "hidden",
                      },
                }}
            >
                <DataGrid 
                    columnHeaderHeight={25}
                    rowHeight={35}
                    hideFooter={true}
                    rows={productData || []}
                    columns={productColumns}
                />
            </Box>
        </DashboardBox>

        <DashboardBox gridArea="h">
            <BoxHeader
                title="Recent Orders"
                sideText={`${transactionData?.length} latest transactions`}
            />
            <Box
                mt="0.5rem" padding="0 0.5rem" height="80%"
                sx={{
                    "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                    },
                    "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                    },
                }}
            >
                <DataGrid
                    columnHeaderHeight={25}
                    rowHeight={35}
                    hideFooter={true}
                    rows={transactionData || []}
                    columns={transactionColumns}
                />
            </Box>
        </DashboardBox>

        <DashboardBox gridArea="i">
            <BoxHeader title="Expenses by Category"/>
            <FlexBetween mt="0.5rem" gap="0.5rem" padding="0 1rem" textAlign="center" margin="0.5rem 2rem">
                {pieChartData?.map((data, i) => (
                    <Box key={`${data[0].name}-${i}`}>
                        <PieChart width={55} height={50}>
                            <Pie
                                stroke="none"
                                data={data}
                                innerRadius={12}
                                outerRadius={24}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <Typography variant="h5" mt="0.25rem">{data[0].name}</Typography>
                    </Box>
                ))}
            </FlexBetween>
        </DashboardBox>

        <DashboardBox gridArea="j">
            <BoxHeader title="Overall Summary"/>
            <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[300]} borderRadius="1rem">
                <Box height="15px" bgcolor={palette.primary[600]} borderRadius="1rem" width="40%">
                </Box>
            </Box>
            <Typography margin="0 1rem" variant="h6">
            In 2023, the company experienced robust financial performance, driven primarily by strong product sales, complemented by service revenue.
            </Typography>
        </DashboardBox>
        </>
    );
};

export default Row3;