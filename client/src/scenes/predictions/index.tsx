import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
    const {palette} = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const {data: kpiData} = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpiData) return [];
            const monthlyData = kpiData[0].monthlyData;
            const formatted: Array<DataPoint> = monthlyData.map(({revenue}, i:number) => {
                return [i, revenue]
            }
        );
        const regressionLine = regression.linear(formatted);
        return monthlyData.map(({month, revenue}, i:number) => {
            return {
                name: month.substring(0, 3),
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.predict(i)[1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1],
            };
        });
    }, [kpiData]);

    return (
        <DashboardBox width="100%" height="100%" padding="1rem" overflow="hidden">
            <FlexBetween margin="1rem 2.5rem">
                <Box>
                    <Typography variant="h3">Revenue Predictions</Typography>
                    <Typography variant="h6" p="0 1rem 0 0">Revenue data from the past year and predicted revenue for the upcoming year using a linear regression model</Typography>
                </Box>
                <Button onClick={() => setIsPredictions(!isPredictions)} variant="contained" color={isPredictions ? "error" : "primary"}>{isPredictions ? "Hide Predicted Revenue" : "Show Predicted Revenue"}</Button>
            </FlexBetween>
            <ResponsiveContainer>
            <LineChart
              data={formattedData}
              margin={{
                top: 20,
                right: 70,
                left: 20,
                bottom: 85,
              }}
            >
            <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
            <XAxis dataKey="name">
                <Label value="Month" offset={-10} position="insideBottom" fill={palette.grey[300]}/>
            </XAxis>
            <YAxis orientation="left" domain={[12000, 26000]} tickFormatter={(v) => `$${v}`}>
                <Label value="Revenue (USD)" angle={-90} offset={-10} position="insideLeft" fill={palette.grey[300]}/>
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top"/>
            <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{strokeWidth: 5}}/>
            <Line type="monotone" dataKey="Regression Line" stroke={palette.tertiary[500]} dot={false}/>
            {isPredictions && (<Line strokeDasharray={"5 5"} dataKey="Predicted Revenue" stroke={palette.secondary[500]}/>)}
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
    );
};

export default Predictions;