import React, { useEffect, useState } from "react";
import "./roombooking.css";
import { useNavigate } from "react-router";
import axios from "axios";

const RoomBooking = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [roomBooking, setRoomBooking] = useState([]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    alert("Delete booking");
  };
  const handleBooking = () => {
    navigate("/all-rooms");
  };

  // Fetch from the backend
  const fetchRoomBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/payments/rooms"
      );
      // console.log("respnse",response.data);

      setRoomBooking(response.data);
      // setUnreadCount(
      //   response.data.notifications.filter((n) => !n.read).length
      // );
    } catch (error) {
      console.error("Error fetching roomPayments", error);
    }
  };
  console.log("roomsBookings", roomBooking);
  useEffect(() => {
    fetchRoomBookings();
  }, [])

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Room Booking List</h4>

            <div className="nav-item flex align-center">
              <div className=" input-group search-area">
                <input
                  type="text"
                  className="focus:outline-none form-control"
                  placeholder="Search.."
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


            <a
              onClick={handleBooking}
              className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
            >
              Book Room
            </a>


          </div>
        </div>

        {/* Table */}
        <div className=" card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2">Booking ID</th>
                  <th className="px-2">User Name</th>
                  <th className="px-2">Email ID</th>
                  <th className="px-2">Phone Number</th>
                  <th className="px-2">Room No</th>
                  <th className="px-2">CNIC/PassPort</th>
                  <th className="px-2">Check In</th>
                  <th className="px-2">Check Out</th>
                  <th className="px-2">No of Stay</th>
                  <th className="px-2">Payment</th>
                  <th className="px-2">Status</th>
                  <th className="px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat rows dynamically */}
                {roomBooking.map((booking, index) => (
                  <tr
                    key={index}
                    role="row"
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                  >
                    <td><span className="text-nowrap">RBL-00{booking.id}</span></td>
                    <td><span className="text-nowrap">{booking.booked_by}</span></td>
                    <td><span className="text-nowrap">{booking.email}</span></td>
                    <td><span className="text-nowrap">{booking.phone}</span></td>
                    <td><span className="text-nowrap">{booking.room_number}</span></td>
                    <td><span className="text-nowrap">{booking.cnic}</span></td>
                    <td><span className="text-nowrap">{booking.checkin_date}</span></td>
                    <td><span className="text-nowrap">{booking.checkout_date}</span></td>
                    <td><span className="text-nowrap">00</span></td>
                    <td><span className="text-nowrap">{booking.payment_status}</span></td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded ${booking.status === "Active"
                          ? "bg-[#c59a63] text-[#293941]"
                          : "bg-[#293941] text-[#c59a63]"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-right">
                      {/* <div className="inline-block relative"> */}
                      <div key={index} className=" bg-[#293941] text-[#c59a63] border rounded shadow-md hover:bg-[#c59a63] hover:text-[#293941]">
                        <button
                          className="block focus:outline-none w-full text-left px-2 py-1 "
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                      {/* </div> */}
                    </td>
                  </tr>
                ))}
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

export default RoomBooking;
