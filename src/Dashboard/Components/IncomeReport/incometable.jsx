import React from "react";

export function IncomeTable({ roomPayments, eventPayments }) {
  const data = [
    { id: 1, month: "January", roomIncome: 0, eventIncome: 0 },
    { id: 2, month: "February", roomIncome: 0, eventIncome: 0 },
    { id: 3, month: "March", roomIncome: 0, eventIncome: 0 },
    { id: 4, month: "April", roomIncome: 0, eventIncome: 0 },
    { id: 5, month: "May", roomIncome: 0, eventIncome: 0 },
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
              <td className="border-b p-2">${(row.roomIncome + row.eventIncome).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
