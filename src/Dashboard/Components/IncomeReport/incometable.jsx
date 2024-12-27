import React from "react";

export function IncomeTable({ data }) {
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
