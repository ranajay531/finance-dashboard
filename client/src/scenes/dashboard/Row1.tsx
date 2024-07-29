import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const Row1 = () => {
    const {palette} = useTheme();
    const { data } = useGetKpisQuery();
    const revenueExpenses = useMemo(() => {
        return(
            data && data[0].monthlyData.map(({month, revenue, expenses}) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses,
                }
            })
        );
    }, [data]);

    const revenueProfit = useMemo(() => {
      return(
          data && data[0].monthlyData.map(({month, revenue, expenses}) => {
              return {
                  name: month.substring(0, 3),
                  revenue: revenue,
                  profit: (revenue-expenses).toFixed(2),
              }
          })
      );
  }, [data]);

  const revenue = useMemo(() => {
    return(
        data && data[0].monthlyData.map(({month, revenue}) => {
            return {
                name: month.substring(0, 3),
                revenue: revenue,
            }
        })
    );
}, [data]);

    return (
      <>
        <DashboardBox gridArea="a">
          <BoxHeader
            title="Revenue & Expenses"
            subtitle="Monthly"
            sideText="2023 (+7%)"
          />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{
                top: 15,
                right: 20,
                left: 7,
                bottom: 60,
              }}
            >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="25%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.55}
                />
                <stop
                  offset="85%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="25%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.55}
                />
                <stop
                  offset="85%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false}/>
            <YAxis tickLine={false} domain={[10000, 25000]}/>
            <Tooltip />
            <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>



        <DashboardBox gridArea="b">
          <BoxHeader
            title="Revenue & Profit"
            subtitle="Monthly"
            sideText="2023 (+41%)"
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueProfit}
              margin={{
                top: 20,
                right: 8,
                left: 5,
                bottom: 55,
              }}
            >
            <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
            <XAxis dataKey="name" tickLine={false}/>
            <YAxis yAxisId="left" orientation="left" tickLine={false}/>
            <YAxis yAxisId="right" orientation="right" tickLine={false}/>
            <Tooltip />
            <Legend height={20} wrapperStyle={{margin: '0 0 10px 0',}}/>
            <Line yAxisId="left" type="monotone" dataKey="profit" stroke={palette.tertiary[500]}/>
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main}/>
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>


        <DashboardBox gridArea="c">
          <BoxHeader
            title="Revenue"
            subtitle="Month by Month"
            sideText="2023 (+12%)"
          />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenue}
              margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 55,
              }}
            >
              <defs>
              <linearGradient id="colorRevenues" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="25%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="92%"
                  stopColor={palette.primary[600]}
                  stopOpacity={0.05}
                />
              </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
              <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
              <YAxis axisLine={false} tickLine={false} style={{fontSize:"10px"}}/>
              <Tooltip />
              <Bar dataKey="revenue" fill="url(#colorRevenues)"/>
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
        </>
    );
};

export default Row1;