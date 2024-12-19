import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import EditStaff from "./editstaff";


export default function StaffList() {
  const navigate = useNavigate()
  const [staffs, setStaffs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };


  const handleSave = (editedStaff) => {
    axios.put(`/update-staff/${editedStaff._id}`, editedStaff).then(() => {
      const updatedStaffs = staffs.map((staff) =>
        staff._id === editedStaff._id ? editedStaff : staff
      );
      setStaffs(updatedStaffs);
      toast.success("Staff updated", {
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
    setSelectedStaff(null);
  };

  const handleDelete = () => {
    alert("Delete Staff");
  };
  //   const handleBooking = () => {
  //     navigate("/room-booking");
  //   };
  const handleStaff = () => {
    navigate("/add-staff")
  }



  // Fetch notifications from the backend
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/staff"
      );
      // console.log("respnse",response.data);

      setStaffs(response.data);

    } catch (error) {
      console.error("Error fetching eventpayments", error);
    }
  };
  console.log("staff", staffs);
  useEffect(() => {
    fetchStaff();
  }, [])
  return (<>
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Staff List</h4>

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
              onClick={handleStaff}
              className="btn bg-[#293941] text-[#c59a63] py-2 px-4 rounded hover:bg-[#c59a63] hover:text-[#293941]"
            >
              Add Staff
            </a>
          </div>
        </div>

        {/* Table */}
        <div className=" card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2">Staff ID</th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Email</th>
                  <th className="px-2">Phone No</th>
                  <th className="px-2">Join Date</th>
                  <th className="px-2">On Duty</th>
                  <th className="px-2">Role</th>
                  <th className="px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat rows dynamically */}
                {staffs.map((staff, index) => (
                  <tr
                    key={index}
                    role="row"
                  >
                    <td><span className="text-nowrap">SID-00{staff.id}</span></td>
                    <td><span className="text-nowrap">{staff.name}</span></td>
                    <td><span className="text-nowrap">{staff.email}</span></td>
                    <td><span className="text-nowrap">{staff.phone}</span></td>
                    <td><span className="text-nowrap">{staff.joining_date}</span></td>
                    <td><span className="text-nowrap">{staff.on_duty?"Yes":"No"}</span></td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded ${staff.onduty === "Yes"
                          ? "bg-[#c59a63] text-[#293941]"
                          : "bg-[#293941] text-[#c59a63]"
                          }`}
                      >
                        {staff.role}
                      </span>
                    </td>
                    <td>
                      {/* <div className="inline-block relative"> */}
                      <div key={index} className=" flex gap-1 ">
                        <button
                          className=" border bg-[#293941] text-[#c59a63] rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#c59a63] hover:text-[#293941]"
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
                    {/* <td><div key={index} className=" flex gap-1 ">
                      {booking.status === "Available" ? (
                        <button
                          className="border rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-gray-100"
                          onClick={handleBooking}
                        >
                          Book Now
                        </button>
                      ) : (
                        <span
                          className="border rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-gray-100"
                        >
                          Booked
                        </span>
                      )}



                    </div></td> */}
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
        <EditStaff
          room={selectedStaff}
          onSave={handleSave}
          onHide={handleCloseEditModal}
        />
      )}
    </div>
  </>

  )
}