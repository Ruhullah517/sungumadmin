import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const RoomBookingRequests = () => {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookingRequests();
    }, []);

    const fetchBookingRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/room-booking-requests');
            setBookingRequests(response.data.data);
            console.log(bookingRequests);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching booking requests:', error);
            setError('Failed to load booking requests');
            setLoading(false);
        }
    };

    const handleConfirm = async (requestId) => {
        try {
            await axios.post(`http://localhost:5000/api/room-booking-requests/${requestId}/confirm`);
            alert('Booking confirmed successfully');
            // Remove the confirmed request from the list
            setBookingRequests(prev => prev.filter(request => request.id !== requestId));
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Failed to confirm booking');
        }
    };

    const handleReject = async (requestId) => {
        if (window.confirm('Are you sure you want to reject this booking request?')) {
            try {
                await axios.post(`http://localhost:5000/api/room-booking-requests/${requestId}/reject`);
                alert('Booking rejected successfully');
                // Remove the rejected request from the list
                setBookingRequests(prev => prev.filter(request => request.id !== requestId));
            } catch (error) {
                console.error('Error rejecting booking:', error);
                alert('Failed to reject booking');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-[#c2c3c7] min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#293941]">Room Booking Requests</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#293941] text-[#c59a63]">
                                <th className="px-2 py-2 text-start">Room No.</th>
                                <th className="px-4 py-2  text-start">Booked By</th>
                                <th className="px-4 py-2  text-start">Contact</th>
                                <th className="px-4 py-2  text-start">Payment Details</th>
                                <th className="px-4 py-2  text-start">Dates</th>
                                <th className="px-4 py-2  text-start">Receipt</th>
                                <th className="px-4 py-2  text-start">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingRequests.length >= 1 ? bookingRequests.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{request.room_number}</td>
                                    <td className="px-4 py-2">
                                        <div>{request.booked_by}</div>
                                        <div className="text-sm text-gray-600">{request.cnic}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>{request.email}</div>
                                        <div>{request.phone}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>Total: Rs.{request.total_payment}</div>
                                        <div>Paid: Rs.{request.paid_amount}</div>
                                        <div className="text-sm text-gray-600">
                                            Status: {request.payment_status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div>Check-in: {format(new Date(request.checkin_date), 'dd/MM/yyyy')}</div>
                                        <div>Check-out: {format(new Date(request.checkout_date), 'dd/MM/yyyy')}</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <a
                                            href={`http://localhost:5000/${request.receipt}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            View Receipt
                                        </a>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleConfirm(request.id)}
                                                className="bg-[#c59a63] text-[#293941] px-3 py-1 rounded hover:bg-[#293941] hover:text-[#c59a63]"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleReject(request.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : <tr  ><td className="text-lg text-red-600 ">No Room Booking Requests</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RoomBookingRequests;