import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const EventBookingRequests = () => {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingRequests, setProcessingRequests] = useState(new Set());

    useEffect(() => {
        fetchBookingRequests();
    }, []);

    const fetchBookingRequests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/event-booking-requests');
            setBookingRequests(response.data.data);
            console.log("bookingRequests",bookingRequests);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching booking requests:', error);
            setError('Failed to load booking requests');
            setLoading(false);
        }
    };

    const handleConfirm = async (requestId) => {
        try {
            setProcessingRequests(prev => new Set([...prev, requestId]));
            console.log("porcessing erq",processingRequests);
            
            await axios.post(`http://localhost:5000/api/event-booking-requests/${requestId}/confirm`);
            setBookingRequests(prev => prev.filter(request => request.id !== requestId));
            console.log(bookingRequests);
            
            alert('Booking confirmed successfully');
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Failed to confirm booking');
        } finally {
            setProcessingRequests(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    const handleReject = async (requestId) => {
        if (window.confirm('Are you sure you want to reject this booking request?')) {
            try {
                setProcessingRequests(prev => new Set([...prev, requestId]));
                await axios.post(`http://localhost:5000/api/event-booking-requests/${requestId}/reject`);
                setBookingRequests(prev => prev.filter(request => request.id !== requestId));
                alert('Booking rejected successfully');
            } catch (error) {
                console.error('Error rejecting booking:', error);
                alert('Failed to reject booking');
            } finally {
                setProcessingRequests(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(requestId);
                    return newSet;
                });
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-[#c2c3c7] min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#293941]">Event Booking Requests</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-[#293941] text-[#c59a63]">
                                <th className="px-2 py-2 text-start">Event Name</th>
                                <th className="px-4 py-2  text-start">Booked By</th>
                                <th className="px-4 py-2  text-start">Contact</th>
                                <th className="px-4 py-2  text-start">Payment Details</th>
                                <th className="px-4 py-2  text-start">Date</th>
                                <th className="px-4 py-2  text-start">Time</th>
                                <th className="px-4 py-2  text-start">Receipt</th>
                                <th className="px-4 py-2  text-start">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingRequests.length >= 1 ? bookingRequests.map((request) => (
                                <tr key={request.id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{request.event_name}</td>
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
                                         {format(new Date(request.booking_date), 'dd/MM/yyyy')}
                                    </td>
                                    <td className="px-4 py-2">
                                         {request.booking_time}
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
                                                disabled={processingRequests.has(request.id)}
                                                className="bg-[#c59a63] text-[#293941] px-3 py-1 rounded hover:bg-[#293941] hover:text-[#c59a63] disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processingRequests.has(request.id) ? (
                                                    <span className="flex items-center">
                                                        Processing...
                                                        <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </span>
                                                ) : 'Confirm'}
                                            </button>
                                            <button
                                                onClick={() => handleReject(request.id)}
                                                disabled={processingRequests.has(request.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processingRequests.has(request.id) ? (
                                                    <span className="flex items-center">
                                                        Processing...
                                                        <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    </span>
                                                ) : 'Reject'}
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

export default EventBookingRequests;