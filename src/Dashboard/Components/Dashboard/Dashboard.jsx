import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [roomPaymentDetails, setRoomPaymentDetails] = useState([]);
    const [eventPaymentDetails, setEventPaymentDetails] = useState([]);
    const [roomsData, setRoomsData] = useState([])// Assuming 36 rooms as a constant
    useEffect(() => {
        // Fetch Room Payments
        fetch("http://localhost:5000/api/payments/rooms")
            .then((response) => response.json())
            .then((data) => setRoomPaymentDetails(data))
            .catch((error) => console.error("Error fetching room payments:", error));

        // Fetch Event Payments
        fetch("http://localhost:5000/api/payments/events")
            .then((response) => response.json())
            .then((data) => setEventPaymentDetails(data))
            .catch((error) => console.error("Error fetching event payments:", error));
            fetchRooms()
        }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/rooms");
            setRoomsData(response.data);
        } catch (error) {
            console.error("Error fetching room data", error);
        }
    };

    const totalRoomBookings = roomPaymentDetails.length;
    const totalEventBookings = eventPaymentDetails.length;

    const totalCollections =
        roomPaymentDetails.reduce(
            (acc, cur) => acc + parseFloat(cur.paid_amount || 0),
            0
        ) +
        eventPaymentDetails.reduce(
            (acc, cur) => acc + parseFloat(cur.paid_amount || 0),
            0
        );

    const lineChartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Weekly Room Bookings",
                data: roomPaymentDetails.map((room) => parseFloat(room.paid_amount) || 0),
                borderColor: "#c59a63",
                tension: 0.3,
                fill: true,
                backgroundColor: "#c59a63",
            },
        ],
    };

    const doughnutChartData = {
        labels: ["Rooms", "Events"],
        datasets: [
            {
                data: [
                    roomPaymentDetails.reduce((acc, room) => acc + parseFloat(room.paid_amount || 0), 0),
                    eventPaymentDetails.reduce((acc, event) => acc + parseFloat(event.paid_amount || 0), 0),
                ],
                borderColor: ["#c59a63", "#c2c3c7"],
                backgroundColor: ["#c59a63", "#c2c3c7"],
            },
        ],
    };

    return (
        <div className="p-6 bg-[#c2c3c7] min-h-screen">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-[#293941]">
                        Good Morning SunGum!
                    </h3>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">{roomsData.length}</h3>
                        <p className="text-sm text-[#293941]">Total Rooms</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">
                            {totalRoomBookings}
                        </h3>
                        <p className="text-sm text-[#293941]">Total Room Bookings</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">
                            {totalEventBookings}
                        </h3>
                        <p className="text-sm text-[#293941]">Total Event Bookings</p>
                    </div>
                    <div className="bg-[#c59a63] shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold text-[#293941]">
                            Rs.{totalCollections.toFixed(0)}
                        </h3>
                        <p className="text-sm text-[#293941]">Total Collections</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <div className="h-fit text-[#c59a63] bg-[#293941] shadow-md rounded-lg p-4">
                        <h4 className="text-lg font-bold text-[#c59a63] mb-4">Visitors</h4>
                        <Line className="text-[#c59a63]" data={lineChartData} />
                    </div>
                    <div className="h-full w-full bg-[#293941] shadow-md rounded-lg p-4">
                        <h4 className="text-lg font-bold text-[#c59a63] mb-4">Bookings Overview</h4>
                        <Doughnut data={doughnutChartData} />
                    </div>
                </div>

                {/* Tables */}
                <div className="flex flex-row gap-2 justify-center mt-6 bg-[#293941] shadow-md rounded-lg p-4">
                    <div className="w-[50%] bg-[#c59a63] shadow-md rounded-lg p-2">
                        <h4 className="text-lg font-bold text-[#293941]">
                            Recent Room Bookings
                        </h4>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#293941]">
                                    <th className="border-b border-[#293941] p-2">ID</th>
                                    <th className="border-b border-[#293941] p-2">Room Number</th>
                                    <th className="border-b border-[#293941] p-2">Total Payment</th>
                                    <th className="border-b border-[#293941] p-2">Check-in</th>
                                    <th className="border-b border-[#293941] p-2">Check-Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roomPaymentDetails.map((room) => (
                                    <tr className="text-[#293941]" key={room.id}>
                                        <td className="border-b border-[#293941] p-2">{room.id}</td>
                                        <td className="border-b border-[#293941] p-2">
                                            {room.room_number}
                                        </td>
                                        <td className="border-b border-[#293941] p-2">
                                            ${room.total_payment}
                                        </td>
                                        <td className="border-b border-[#293941] p-2">
                                            {new Date(room.checkin_date).toLocaleDateString()}
                                        </td>
                                        <td className="border-b border-[#293941] p-2">
                                            {new Date(room.checkout_date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="w-[50%] bg-[#c59a63] shadow-md rounded-lg p-2">
                        <h4 className="text-lg font-bold text-[#293941]">
                            Recent Event Bookings
                        </h4>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#293941]">
                                    <th className="border-b border-[#293941] p-2">ID</th>
                                    <th className="border-b border-[#293941] p-2">Booked By</th>
                                    <th className="border-b border-[#293941] p-2">Total Payment</th>
                                    <th className="border-b border-[#293941] p-2">Check-in</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventPaymentDetails.map((event) => (
                                    <tr className="text-[#293941]" key={event.id}>
                                        <td className="border-b border-[#293941] p-2">{event.id}</td>
                                        <td className="border-b border-[#293941] p-2">
                                            {event.booked_by}
                                        </td>
                                        <td className="border-b border-[#293941] p-2">
                                            ${event.total_payment}
                                        </td>
                                        <td className="border-b border-[#293941] p-2">
                                            {new Date(event.booking_date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
