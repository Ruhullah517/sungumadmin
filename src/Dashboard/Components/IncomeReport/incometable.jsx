import React from "react";

const data = [
  { id: 1, month: "January", roomIncome: 25000, eventIncome: 15000, totalIncome: 40000 },
  { id: 2, month: "February", roomIncome: 28000, eventIncome: 18000, totalIncome: 46000 },
  { id: 3, month: "March", roomIncome: 30000, eventIncome: 20000, totalIncome: 50000 },
  { id: 4, month: "April", roomIncome: 32000, eventIncome: 22000, totalIncome: 54000 },
  { id: 5, month: "May", roomIncome: 35000, eventIncome: 25000, totalIncome: 60000 },
];

export function IncomeTable() {
  return (
    <div className="mt-6 bg-white rounded-lg p-4">
      <table className="w-full text-left border-collapse">
        <caption className="text-lg font-semibold p-4 text-[#293941]">
          Total income from rooms and events bookings
        </caption>
        <thead>
          <tr className="text-[#293941]">
            <th className="border-b p-2">Month</th>
            <th className="border-b p-2">Room Income</th>
            <th className="border-b p-2">Event Income</th>
            <th className="border-b p-2">Total Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="border-b p-2 text-[#293941]">{row.month}</td>
              <td className="border-b p-2">${row.roomIncome.toLocaleString()}</td>
              <td className="border-b p-2">${row.eventIncome.toLocaleString()}</td>
              <td className="border-b p-2">${row.totalIncome.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
