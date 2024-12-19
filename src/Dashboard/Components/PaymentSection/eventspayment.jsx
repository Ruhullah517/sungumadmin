import React, { useEffect, useState } from "react";
import "../RoomsBooking/roombooking.css";
import { useNavigate } from "react-router";
import axios from "axios";
// import axios from "axios";
// import { toast, Flip } from "react-toastify";

// const Transactions = () => {
//   const [datas, setDatas] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");

//   const handleImageClick = (image) => {
//     setCurrentImage(image);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setCurrentImage("");
//   };

//   const getData = async () => {
//     try {
//       const response = await axios.get("/checkoutdetail");
//       setDatas(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const updateTransactionStatus = async (transactionId, status) => {
//     try {
//       const response = await axios.put("/update-transaction-status", {
//         trID: transactionId,
//         status,
//       });

//       if (response.status === 200) {
//         const updatedDatas = datas.map((transaction) =>
//           transaction._id === transactionId
//             ? { ...transaction, paymentStatus: status }
//             : transaction
//         );
//         setDatas(updatedDatas);
//         toast.success(`Transaction status updated to ${status}`, {
//           transition: Flip,
//           autoClose: 1000,
//           position: "bottom-left",
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       toast.error("Error updating transaction status", {
//         transition: Flip,
//         autoClose: 3000,
//         position: "bottom-left",
//         theme: "dark",
//       });
//     }
//   };

//   const handleCheckout = async (bookingId) => {
//     try {
//       const response = await axios.put("/checkout-user", { bookingId: bookingId });
//       alert("Checkout successful");
//     } catch (error) {
//       alert("Failed to checkout");
//     }
//   };

//   return (
//     <>
//     <div className="my-6 text-center">
//       <h2 className="text-3xl font-semibold text-gray-800">Transactions</h2>
//     </div>

//     <div className="overflow-x-auto px-4">
//       <table className="min-w-full table-auto border-collapse bg-white rounded-xl shadow-lg">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="px-4 py-2 text-left">Transaction Slip</th>
//             <th className="px-4 py-2 text-left">RoomNo</th>
//             <th className="px-4 py-2 text-left">Room Type</th>
//             <th className="px-4 py-2 text-left">Customer Email</th>
//             <th className="px-4 py-2 text-left">Account Holder Name</th>
//             <th className="px-4 py-2 text-left">Subtotal</th>
//             <th className="px-4 py-2 text-left">Payment Status</th>
//             <th className="px-4 py-2 text-left">Check Out</th>
//             <th className="px-4 py-2 text-left">Date Of Submission</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {datas.map((transaction) => (
//             <tr className="border-b hover:bg-gray-50" key={transaction._id}>
//               <td
//                 className="px-4 py-2 cursor-pointer"
//                 onClick={() => handleImageClick(transaction.transactionSlip)}
//               >
//                 <img
//                   src={transaction.transactionSlip}
//                   alt="Transaction Slip"
//                   className="w-16 h-16 object-cover rounded-lg hover:shadow-md"
//                 />
//               </td>
//               <td className="px-4 py-2">{transaction.roomNo}</td>
//               <td className="px-4 py-2">{transaction.roomName}</td>
//               <td className="px-4 py-2">{transaction.email}</td>
//               <td className="px-4 py-2">{transaction.accountHolderName}</td>
//               <td className="px-4 py-2">RS.{transaction.totalCost}</td>
//               <td
//                 className={`px-4 py-2 font-medium ${
//                   transaction.paymentStatus === "Pending"
//                     ? "text-blue-500"
//                     : transaction.paymentStatus === "Success"
//                     ? "text-green-500"
//                     : transaction.paymentStatus === "Rejected"
//                     ? "text-red-500"
//                     : "text-black"
//                 }`}
//               >
//                 {transaction.paymentStatus}
//               </td>
//               <td
//                 className={`px-4 py-2 font-medium ${
//                   transaction.checkOut === "Checked Out" ? "text-red-500" : "text-black"
//                 }`}
//               >
//                 {transaction.checkOut}
//               </td>
//               <td className="px-4 py-2">
//                 {transaction.updatedAt.slice(0, 10).split("-").reverse().join("/")}
//               </td>
//               {transaction.checkOut === "Checked Out" ? (
//                 <td className="px-4 py-2 font-semibold text-center text-gray-700">
//                   Check Out Confirmed
//                 </td>
//               ) : (
//                 <td className="px-4 py-2 flex space-x-2">
//                   <button
//                     className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
//                     onClick={() => updateTransactionStatus(transaction._id, "Success")}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
//                     onClick={() => updateTransactionStatus(transaction._id, "Rejected")}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
//                     onClick={() => handleCheckout(transaction._id)}
//                   >
//                     Check Out
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>

//     {/* Modal for displaying the transaction slip image */}
//     {showModal && (
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//         onClick={handleModalClose}
//       >
//         <div
//           className="bg-white p-4 rounded-lg relative shadow-lg max-w-sm"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={handleModalClose}
//             className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
//           >
//             X
//           </button>
//           <img
//             src={currentImage}
//             className="w-full h-auto rounded-lg"
//             alt="Transaction Slip"
//           />
//         </div>
//       </div>
//     )}
//   </>

//   );
// };

// export default Transactions;




const EventPaymentList = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [eventPayments, setEventPayments] = useState([]);

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
  
    } catch (error) {
      console.error("Error fetching eventpayments", error);
    }
  };
  console.log("events", eventPayments);
  useEffect(() => {
    fetchEventPayments();
  }, [])
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
              className="btn bg-[#293941] text-[#c59a63] py-2 px-4 rounded hover:bg-[#c59a63] hover:text-[#293941]"
            >
              Book Event
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
                  <th className="px-2">Event Name</th>
                  <th className="px-2">Booked By</th>
                  <th className="px-2">Account Title</th>
                  <th className="px-2">Account Number</th>
                  <th className="px-2">Payment Date</th>
                  <th className="px-2">Total Payment</th>
                  <th className="px-2">Paid Amount</th>
                  <th className="px-2">Remaining Amount</th>
                  <th className="px-2">Payment</th>
                  <th className="px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat rows dynamically */}
                {
                eventPayments.map((booking, index) => (
                  <tr
                    key={index}
                    role="row"
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                  >
                    <td><span className="text-nowrap">EPL-00{booking.id}</span></td>
                    <td><span className="text-nowrap">{booking.event_name}</span></td>
                    <td><span className="text-nowrap">{booking.booked_by}</span></td>
                    <td><span className="text-nowrap">{booking.account_title}</span></td>
                    <td><span className="text-nowrap">{booking.account_number}</span></td>
                    <td><span className="text-nowrap">{booking.payment_date}</span></td>
                    <td><span className="text-nowrap">{booking.total_payment}</span></td>
                    <td><span className="text-nowrap">{booking.paid_amount}</span></td>
                    <td><span className="text-nowrap">{(booking.total_payment)-(booking.paid_amount)}</span></td>
                    <td><span className="text-nowrap">{booking.payment_status}</span></td>
                    {/* <td>
                      <span
                        className={`px-2 py-1 rounded text-white ${booking.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-500"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td> */}
                    <td className="px-2 py-2 text-center">
                      {/* <div className="inline-block relative"> */}

                      {booking.payment_status === 'Half' ? <div key={index} className=" bg-[#c59a63] hover:bg-[#293941] border rounded shadow-md">
                        <button
                          className="text-[#293941] block focus:outline-none w-full text-left px-2 py-1 hover:text-[#c59a63]"
                          onClick={handleDelete}
                        >
                          Recived
                        </button>
                      </div>
                        :

                        <span className="text-[#293941] font-semibold text-nowrap">Paid</span>

                      }

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

export default EventPaymentList;
