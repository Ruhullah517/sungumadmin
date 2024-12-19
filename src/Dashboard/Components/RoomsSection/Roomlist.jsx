import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import EditRoom from "./editroom";
import { useNavigate } from "react-router-dom";
import './Room.css';

const ShowRoom = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // useEffect(() => {
  //   try {
  //     axios.get("/get-room").then((resp) => {
  //       setRooms(resp.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleSave = (editedRoom) => {
    axios.put(`/update-room/${editedRoom._id}`, editedRoom).then(() => {
      const updatedRooms = rooms.map((room) =>
        room._id === editedRoom._id ? editedRoom : room
      );
      setRooms(updatedRooms);
      toast.success("Room updated", {
        transition: Flip,
        autoClose: 1000,
        position: "bottom-left",
        theme: "dark",
      });
      setShowEditModal(false);
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  // const handleDelete = (roomId) => {
  //   axios
  //     .delete(`/delete-room?id=${roomId}`)
  //     .then(() => {
  //       const updatedRooms = rooms.filter((room) => room._id !== roomId);
  //       setRooms(updatedRooms);
  //       toast.warn("Room deleted", {
  //         transition: Flip,
  //         autoClose: 1000,
  //         position: "bottom-left",
  //         theme: "dark",
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("There was an error deleting the room:", error);
  //       toast.error("Failed to delete room", {
  //         transition: Flip,
  //         autoClose: 3000,
  //         position: "bottom-left",
  //         theme: "dark",
  //       });
  //     });
  // };

  const handleDelete = () => {
    alert("Delete booking");
  };
  const handleBooking = () => {
    navigate("/room-booking");
  };
  const handleRoom = () => {
    navigate("/addroom")
  }



  return (
    // <div className="px-6 py-8">
    //   <h2 className="text-2xl font-bold text-center mb-6">List of Rooms</h2>

    //   <div className="overflow-x-auto bg-white shadow-md rounded-lg">
    //     <table className="min-w-full border border-gray-200 text-sm text-left">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="px-4 py-2 border-b">Room No</th>
    //           <th className="px-4 py-2 border-b">Name</th>
    //           <th className="px-4 py-2 border-b">Facilities</th>
    //           <th className="px-4 py-2 border-b">Price</th>
    //           <th className="px-4 py-2 border-b">Room Type</th>
    //           <th className="px-4 py-2 border-b">Status</th>
    //           <th className="px-4 py-2 border-b">Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {rooms.map((room) => (
    //           <tr key={room._id} className="hover:bg-gray-50">
    //             <td className="px-4 py-2 border-b">{room.roomNo}</td>
    //             <td className="px-4 py-2 border-b">{room.roomName}</td>
    //             <td className="px-4 py-2 border-b capitalize">{room.roomFacilities}</td>
    //             <td className="px-4 py-2 border-b">RS. {room.roomPrice}</td>
    //             <td className="px-4 py-2 border-b">{room.roomType}</td>
    //             <td
    //               className={`px-4 py-2 border-b ${
    //                 room.roomStatus === "Booked" ? "text-red-500" : "text-green-500"
    //               }`}
    //             >
    //               {room.roomStatus}
    //             </td>
    //             <td className="px-4 py-2 border-b flex gap-2">
    //               <button
    //                 onClick={() => handleDelete(room._id)}
    //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
    //               >
    //                 Delete
    //               </button>
    //               <button
    //                 onClick={() => handleEdit(room)}
    //                 className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
    //               >
    //                 Edit
    //               </button>
    //               <button
    //                 onClick={() => navigate(`/book-room/${room._id}`)}
    //                 className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
    //               >
    //                 Book Room
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   {showEditModal && (
    //     <EditRoom
    //       room={selectedRoom}
    //       onSave={handleSave}
    //       onHide={handleCloseEditModal}
    //     />
    //   )}
    // </div>



    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Room List</h4>

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
              onClick={handleRoom}
              className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
              
            >
              Add Room
            </a>
          </div>
        </div>

        {/* Table */}
        <div className=" card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse w-full table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2">Room ID</th>
                  <th className="px-2">Image</th>
                  <th className="px-2">Room Type</th>
                  <th className="px-2">Room No</th>
                  <th className="px-2">Price</th>
                  <th className="px-2">Max Capacity</th>
                  <th className="px-2">Status</th>
                  <th className="px-2">Actions</th>
                  <th className="px-2">Booking</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat rows dynamically */}
                {[
                  {
                    id: "RM-0001",
                    image: "images/room-1.jpg",
                    roomtype: "Family Suit",
                    roomNo: "101",
                    price: "5000",
                    maxcap: 3,
                    status: "Booked",
                  }, {
                    id: "RM-0001",
                    image: "images/room-1.jpg",
                    roomtype: "Family Suit",
                    roomNo: "102",
                    price: "5000",
                    maxcap: 3,
                    status: "Available",
                  }, {
                    id: "RM-0001",
                    image: "images/room-1.jpg",
                    roomtype: "Family Suit",
                    roomNo: "103",
                    price: "5000",
                    maxcap: 3,
                    status: "Available",
                  },

                ].map((booking, index) => (
                  <tr
                    key={index}
                    role="row"
                  >
                    <td><span className="text-nowrap">{booking.id}</span></td>
                    {/* <td><span className="text-nowrap">{booking.image}</span></td> */}
                    <td><div className="concierge-bx"><img className="text-nowrap me-3 rounded" src={booking.image} alt="" /></div></td>
                    <td><span className="text-nowrap">{booking.roomtype}</span></td>
                    <td><span className="text-nowrap">{booking.roomNo}</span></td>
                    <td><span className="text-nowrap">{booking.price}</span></td>
                    <td><span className="text-nowrap">{booking.maxcap}</span></td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded ${booking.status === "Available"
                          ? "bg-[#c59a63] text-[#293941]"
                          : "bg-[#293941] text-[#c59a63]"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {/* <div className="inline-block relative"> */}
                      <div key={index} className=" flex gap-1 ">
                        <button
                          className=" bg-[#293941] text-[#c59a63] border rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#c59a63] hover:text-[#293941]"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-[#c59a63] text-[#293941] border rounded shadow-md block focus:outline-none text-left px-3 py-1 hover:bg-[#293941] hover:text-[#c59a63]"
                          onClick={() => handleEdit()}
                        >
                          Edit
                        </button>
                      </div>
                      {/* </div> */}
                    </td>
                    <td><div key={index} className=" flex gap-1 ">
                      {booking.status === "Available" ? (
                        <button
                          className="bg-[#c59a63] text-[#293941] border rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#293941] hover:text-[#c59a63]"
                          onClick={handleBooking}
                        >
                          Book Now
                        </button>
                      ) : (
                        <span
                          className="border bg-[#293941] text-[#c59a63] rounded shadow-md block focus:outline-none text-left px-2 py-1"
                        >
                          Booked
                        </span>
                      )}



                    </div></td>
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

      {showEditModal && (
        <EditRoom
          room={selectedRoom}
          onSave={handleSave}
          onHide={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default ShowRoom;
