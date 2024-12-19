import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement, PointElement,
    CategoryScale, LinearScale, ArcElement, Tooltip, Legend,
    Colors
} from "chart.js";

ChartJS.register(LineElement, PointElement,
    CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const lineChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Weekly Room Bookings",
                data: [10, 15, 25, 35, 20, 30, 40], // Example room booking numbers
                borderColor: "#c59a63", // Changed color for better representation
                tension: 0.3,
                fill: true,
                backgroundColor: "#c59a63", // Updated for a blueish theme
            },
        ],
    };

    const doughnutChartData = {
        labels: ["Single Rooms", "Double Rooms", "Suites"],
        datasets: [
            {
                data: [300, 50, 100],
                borderColor:"#c59a63",
                backgroundColor: ["#3d545f", "#c2c3c7", "#c59a63"],
                // hoverBackgroundColor: ["#43A047", "#FFB300", "#E53935"],
            },
        ],
    };

    return (
        <div className="p-6 bg-[#c2c3c7] min-h-screen">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-[#293941]">Good Morning SunGum!</h3>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">36</h3>
                        <p className="text-sm text-[#293941]">Total Rooms</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">10</h3>
                        <p className="text-sm text-[#293941]">Available Rooms</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">138</h3>
                        <p className="text-sm text-[#293941]">Total Events Booking</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">$360400/year</h3>
                        <p className="text-sm text-[#293941]">Collections</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="h-fit text-[#c59a63] bg-[#293941] shadow-md rounded-lg p-4">
                        <h4 className="text-lg font-bold text-[#c59a63] mb-4">Visitors</h4>
                        <Line className="text-[#c59a63]" data={lineChartData} />
                    </div>
                    <div className="h-full w-full bg-[#293941] shadow-md rounded-lg p-4">
                        <h4 className="text-lg font-bold text-[#c59a63] mb-4">Rooms Booked</h4>
                        <Doughnut data={doughnutChartData} />
                    </div>
                </div>

                {/* Booking Table */}
                <div className="mt-6 bg-[#293941] shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-bold text-[#c59a63]">Recent Rooms Booking</h4>
                        <button className="bg-[#c59a63] text-[#293941] px-4 py-2 rounded-lg shadow-md ">
                            View All
                        </button>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[#c59a63]">
                                <th className="border-b border-[#c59a63] p-2">Booking ID</th>
                                <th className="border-b border-[#c59a63] p-2">Name</th>
                                <th className="border-b border-[#c59a63] p-2">Email</th>
                                <th className="border-b border-[#c59a63] p-2">Aadhar Number</th>
                                <th className="border-b border-[#c59a63] p-2">Room Type</th>
                                <th className="border-b border-[#c59a63] p-2">Number</th>
                                <th className="border-b border-[#c59a63] p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-[#c59a63]">
                                <td className="border-b border-[#c59a63] p-2">BKG-0001</td>
                                <td className="border-b border-[#c59a63] p-2">Tommy Bernal</td>
                                <td className="border-b border-[#c59a63] p-2">[email&nbsp;protected]</td>
                                <td className="border-b border-[#c59a63] p-2">12414786454545</td>
                                <td className="border-b border-[#c59a63] p-2">Double</td>
                                <td className="border-b border-[#c59a63] p-2">631-254-6480</td>
                                <td className="border-b border-[#c59a63] p-2">
                                    <span className="bg-[#c59a63] text-[#293941] px-2 py-1 rounded-full text-xs">
                                        INACTIVE
                                    </span>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>


                <div className="flex flex-row justify-center mt-6 bg-[#293941] shadow-md rounded-lg p-4">
                    <div className="w-[50%] mt-2 bg-[#c59a63] shadow-md rounded-lg p-2">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-[#293941]">Recent Income</h4>
                            <button className="bg-[#293941] text-[#c59a63] px-4 py-2 rounded-lg shadow-md ">
                                View All
                            </button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#293941]">
                                    <th className="border-b border-[#293941] p-2">Income ID</th>
                                    <th className="border-b border-[#293941] p-2">Vocher Name</th>
                                    <th className="border-b border-[#293941] p-2">Total Amount</th>
                                    <th className="border-b border-[#293941] p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-[#293941]">
                                    <td className="border-b border-[#293941] p-2">BKG-0001</td>
                                    <td className="border-b border-[#293941] p-2">Room Rent</td>
                                    <td className="border-b border-[#293941] p-2">$10,000</td>
                                    <td className="border-b border-[#293941] p-2">12/02/2024</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-[50%] mt-2 ml-4 bg-[#c59a63] shadow-md rounded-lg p-2">
                    <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-bold text-[#293941]">Recent Expence</h4>
                            <button className="bg-[#293941] text-[#c59a63] px-4 py-2 rounded-lg shadow-md">
                                View All
                            </button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#293941]">
                                    <th className="border-b border-[#293941] p-2">Expence ID</th>
                                    <th className="border-b border-[#293941] p-2">Vocher Name</th>
                                    <th className="border-b border-[#293941] p-2">Total Amount</th>
                                    <th className="border-b border-[#293941] p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="text-[#293941]">
                                    <td className="border-b border-[#293941] p-2">ID-0001</td>
                                    <td className="border-b border-[#293941] p-2">Car Rent</td>
                                    <td className="border-b border-[#293941] p-2">$10,000</td>
                                    <td className="border-b border-[#293941] p-2">12/02/2024</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
