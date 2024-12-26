import React, { useEffect, useState } from "react";
import "../RoomsBooking/roombooking.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { format } from 'date-fns'

const EventPaymentList = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [eventPayments, setEventPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    alert("Successfully Paid");
  };
  const handleBooking = () => {
    navigate("/all-events");
  };

  // Fetch notifications from the backend
  const fetchEventPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payments/events"
      );
      // console.log("respnse",response.data);

      setEventPayments(response.data);
      console.log(eventPayments);


    } catch (error) {
      console.error("Error fetching eventpayments", error);
    }
  };
  console.log("events", eventPayments);
  useEffect(() => {
    fetchEventPayments();
  }, [])

  const handlePaymentReceived = async (booking) => {
    try {
      // Format the date to MySQL datetime format (YYYY-MM-DD HH:mm:ss)
      const currentDate = new Date().toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      const updateData = {
        payment_date: currentDate,
        paid_amount: Number(booking.total_payment).toFixed(2),
        payment_status: 'full',
        id: booking.id
      };

      console.log('Booking ID:', booking.id);
      console.log('Update Data:', updateData);

      const response = await axios.put(`http://localhost:5000/api/payments/events/${booking.id}`, updateData);
      console.log('Server Response:', response.data);

      alert("Payment successfully received");
      fetchEventPayments();
    } catch (error) {
      console.error("Full error details:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      alert(`Failed to update payment: ${error.response?.data?.message || error.message}`);
    }
  };
  const filteredEvents = eventPayments.filter((event) =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.booked_by.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Event Payment List</h4>

            <div className="nav-item flex align-center">
              <div className=" input-group search-area">
                <input
                  type="text"
                  className="focus:outline-none form-control"
                  placeholder="Search.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text">
                  <a href="/react/demo/guest-list">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
                      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className=" card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2 text-start">Booking ID</th>
                  <th className="px-2 text-start">Event Name</th>
                  <th className="px-2 text-start">Booked By</th>
                  <th className="px-2 text-start">Booking Date</th>
                  <th className="px-2 text-start">Menu</th>
                  <th className="px-2 text-start">Stage</th>
                  <th className="px-2 text-start">Services</th>
                  <th className="px-2 text-start">Guests</th>
                  <th className="px-2 text-start">Account Detail</th>
                  <th className="px-2 text-start">Payment Date</th>
                  <th className="px-2 text-start">Payment Detail</th>
                  <th className="px-2 text-start">Payment</th>
                  <th className="px-2 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat rows dynamically */}
                {
                  filteredEvents.map((booking, index) => {

                    return (
                      <tr
                        key={index}
                        role="row"
                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                      >
                        <td><span className="text-nowrap">EPL-00{booking.id}</span></td>
                        <td><span className="text-nowrap">{booking.event_name}</span></td>
                        <td>
                          <div className="text-nowrap">{booking.booked_by}</div>
                          <div className="text-nowrap">{booking.email}</div>
                          <div className="text-nowrap">{booking.phone}</div>
                          <div className="text-nowrap">{booking.cnic}</div>
                        </td>
                        <td>
                          <div className="text-nowrap font-semibold">{format(new Date(booking.booking_date), 'dd/MM/yyyy')}</div>
                          <div className="text-nowrap font-semibold">{booking.booking_time}</div>
                        </td>
                        <td>
                          <div className="text-nowrap">{booking.menu}</div>
                        </td>
                        <td>
                          <div className="text-nowrap">{booking.stage}</div>
                        </td>
                        <td>
                          <div className="text-nowrap">{booking.services}</div>
                        </td>
                        <td>
                          <div className="text-nowrap">{booking.number_of_guests}</div>
                        </td>
                        <td>
                          <div className="text-nowrap">{booking.account_title}</div>
                          <div className="text-nowrap">{booking.account_number}</div>
                        </td>
                        <td><span className="text-nowrap">{format(new Date(booking.payment_date), 'dd/MM/yyyy')}</span></td>
                        <td>
                          <div className="text-nowrap">TOTAL: {booking.total_payment}</div>
                          <div className="text-nowrap">PAID: {booking.paid_amount}</div>
                          <div className="text-nowrap font-semibold">REMAINING: {(booking.total_payment) - (booking.paid_amount)}</div>
                        </td>
                        <td><span className="text-nowrap">{booking.payment_status}</span></td>
                        <td className="px-2 py-2 text-center">
                          {booking.payment_status === 'partial' ? <div key={index} className=" bg-[#c59a63] hover:bg-[#293941] border rounded shadow-md">
                            <button
                              className="text-[#293941] block focus:outline-none w-full text-left px-2 py-1 hover:text-[#c59a63]"
                              onClick={() => handlePaymentReceived(booking)}
                            >
                              Recived
                            </button>
                          </div>
                            :
                            <span className="text-[#293941] font-semibold text-nowrap">Paid</span>
                          }
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>

          <div className="flex text-center justify-between items-center mt-3 mb-3">
            {/* Data Information Section */}
            <div className="dataTables_info">
              Showing 1 to 8 of 8 entries
            </div>

            {/* Pagination Section */}
            <div className="flex dataTables_paginate paging_simple_numbers mb-0" id="example2_paginate">
              <a className="paginate_button previous disabled" href="/react/demo/guest-list">
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
              </a>
              <span>
                <a className="current" href="/react/demo/guest-list">
                  1
                </a>
              </span>
              <a className="paginate_button next" href="/react/demo/guest-list">
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventPaymentList;
