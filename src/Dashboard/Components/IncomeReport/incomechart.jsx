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

export function IncomeChart({ roomPayments, eventPayments }) {
  const data = [
    { month: "Jan", roomIncome: 0, eventIncome: 0 },
    { month: "Feb", roomIncome: 0, eventIncome: 0 },
    { month: "Mar", roomIncome: 0, eventIncome: 0 },
    { month: "Apr", roomIncome: 0, eventIncome: 0 },
    { month: "May", roomIncome: 0, eventIncome: 0 },
  ];

  // Calculate income for each month
  roomPayments.forEach(payment => {
    const monthIndex = new Date(payment.payment_date).getMonth();
    data[monthIndex].roomIncome += parseFloat(payment.paid_amount);
  });

  eventPayments.forEach(payment => {
    const monthIndex = new Date(payment.payment_date).getMonth();
    data[monthIndex].eventIncome += parseFloat(payment.paid_amount);
  });

  return (
    <div className="rounded-lg p-4 bg-white">
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
