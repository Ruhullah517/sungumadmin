import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", roomIncome: 25000, eventIncome: 15000 },
  { month: "Feb", roomIncome: 28000, eventIncome: 18000 },
  { month: "Mar", roomIncome: 30000, eventIncome: 20000 },
  { month: "Apr", roomIncome: 32000, eventIncome: 22000 },
  { month: "May", roomIncome: 35000, eventIncome: 25000 },
];

export function IncomeChart() {
  return (
    <div className=" rounded-lg p-4 bg-white">
      <div className="mb-4">
        <h2 className="text-lg text-[#293941] font-bold">Income Overview</h2>
        <p className="text-sm text-[#293941]">
          Monthly breakdown of room and event income
        </p>
      </div>
      <div style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="roomIncome" fill="#293941" name="Room Income" />
            <Bar dataKey="eventIncome" fill="#c59a63" name="Event Income" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
