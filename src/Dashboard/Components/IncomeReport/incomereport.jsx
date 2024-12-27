import React, { useEffect, useState } from "react";
import { IncomeTable } from "./incometable";
import { IncomeChart } from "./incomechart";
import axios from "axios";

export default function IncomeReport() {
    const [roomPayments, setRoomPayments] = useState([]);
    const [eventPayments, setEventPayments] = useState([]);

    // Fetch Room Payments
    const fetchRoomPayments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/payments/rooms"
            );
            setRoomPayments(response.data);
        } catch (error) {
            console.error("Error fetching room payments", error);
        }
    };

    // Fetch Event Payments
    const fetchEventPayments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/payments/events"
            );
            setEventPayments(response.data);
        } catch (error) {
            console.error("Error fetching event payments", error);
        }
    };

    useEffect(() => {
        fetchRoomPayments();
        fetchEventPayments();
    }, []);

    // Combine room and event payment data
    const combinedData = [
        ...roomPayments.map((item) => ({ ...item, category: "room" })),
        ...eventPayments.map((item) => ({ ...item, category: "event" })),
    ];

    // Utility function to calculate total income in a date range
    const calculateIncome = (startDate, endDate) => {
        return combinedData
            .filter(
                (payment) =>
                    new Date(payment.payment_date) >= startDate &&
                    new Date(payment.payment_date) <= endDate
            )
            .reduce((sum, payment) => sum + parseFloat(payment.paid_amount || 0), 0);
    };

    // Current date
    const today = new Date();

    // Weekly Income (last 7 days)
    const weeklyIncome = calculateIncome(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
        today
    );

    // Monthly Income (current month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyIncome = calculateIncome(startOfMonth, today);

    // Yearly Income (current year)
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const yearlyIncome = calculateIncome(startOfYear, today);

    // Total Income
    const totalIncome = combinedData.reduce(
        (sum, payment) => sum + parseFloat(payment.paid_amount || 0),
        0
    );

    // Utility to group income by month
    const calculateIncomeByMonth = () => {
        const groupedData = {};

        combinedData.forEach((payment) => {
            const month = new Date(payment.payment_date).toLocaleString("default", { month: "long" });
            if (!groupedData[month]) {
                groupedData[month] = { roomIncome: 0, eventIncome: 0, totalIncome: 0 };
            }
            const paidAmount = parseFloat(payment.paid_amount || 0);
            if (payment.category === "room") {
                groupedData[month].roomIncome += paidAmount;
            } else if (payment.category === "event") {
                groupedData[month].eventIncome += paidAmount;
            }
            groupedData[month].totalIncome += paidAmount;
        });

        return Object.entries(groupedData).map(([month, values], index) => ({
            id: index + 1,
            month,
            ...values,
        }));
    };

    const incomeData = calculateIncomeByMonth();

    const [activeTab, setActiveTab] = useState("table");

    return (
        <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
            <div className="content container mx-auto px-4 py-6">
                <h1 className="text-3xl text-[#293941] font-bold mb-6">Income Report</h1>

                {/* Income Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-3">
                    {[
                        { title: "Total Income", amount: totalIncome, growth: "Overall" },
                        { title: "Weekly Income", amount: weeklyIncome, growth: "Last 7 Days" },
                        { title: "Monthly Income", amount: monthlyIncome, growth: "This Month" },
                        { title: "Yearly Income", amount: yearlyIncome, growth: "This Year" },
                    ].map((card, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-sm text-gray-600">{card.title}</h2>
                            <div className="text-xl font-bold text-[#c59a63]">
                                ${card.amount.toLocaleString()}
                            </div>
                            <p className="text-xs text-gray-500">{card.growth}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white p-2">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab("table")}
                            className={`px-4 py-2 rounded-lg shadow-md ${activeTab === "table" ? "bg-[#c2c3c7] text-[#293941]" : "text-[#c59a63]"}`}
                        >
                            Table View
                        </button>
                        <button
                            onClick={() => setActiveTab("chart")}
                            className={`px-4 py-2 rounded-lg shadow-md ${activeTab === "chart" ? "bg-[#c2c3c7] text-[#293941]" : "text-[#c59a63]"}`}
                        >
                            Chart View
                        </button>
                    </div>
                    {activeTab === "table" && <IncomeTable data={incomeData} />}
                    {activeTab === "chart" && <IncomeChart data={incomeData} />}
                </div>
            </div>
        </div>
    );
}
