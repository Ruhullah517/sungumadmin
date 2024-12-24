import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import EditStaff from "./editstaff";

export default function StaffList() {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]); // For search filtering
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
  };

  const handleSave = (editedStaff) => {
    axios.put(`http://localhost:5000/api/staff/${editedStaff.id}`, editedStaff).then(() => {
      const updatedStaffs = staffs.map((staff) =>
        staff.id === editedStaff.id ? editedStaff : staff
      );
      setStaffs(updatedStaffs);
      setFilteredStaffs(updatedStaffs); // Update filtered list
      fetchStaff(); // Refresh the staff list from the backend
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

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;

    axios
      .delete(`http://localhost:5000/api/staff/${id}`)
      .then(() => {
        const updatedStaffs = staffs.filter((staff) => staff.id !== id);
        setStaffs(updatedStaffs);
        setFilteredStaffs(updatedStaffs); // Update filtered list
        toast.success("Staff deleted successfully", {
          transition: Flip,
          autoClose: 1000,
          position: "bottom-left",
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error("Error deleting staff:", error);
        toast.error("Failed to delete staff.", {
          transition: Flip,
          autoClose: 1000,
          position: "bottom-left",
          theme: "dark",
        });
      });
  };


  const handleStaff = () => {
    navigate("/add-staff");
  };

  // Fetch notifications from the backend
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staff");
      setStaffs(response.data);
      setFilteredStaffs(response.data); // Initialize filtered list
      console.log(response.data);

    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.phone.includes(query)
    );
    setFilteredStaffs(filtered);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <>
      <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
        <div className="content container mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="page-header mb-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg text-[#293941] font-semibold">Staff List</h4>

              <div className="nav-item flex align-center">
                <div className="input-group search-area">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch} // Update on input change
                    className="focus:outline-none form-control"
                    placeholder="Search by name, email, or phone..."
                  />
                  <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 50 50">
                      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <button
                onClick={handleStaff}
                className="btn bg-[#293941] text-[#c59a63] py-2 px-4 rounded hover:bg-[#c59a63] hover:text-[#293941]"
              >
                Add Staff
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="card overflow-x-auto">
            <table className="border-collapse table card-table display mb-4 shadow-hover default-table">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2 text-start">Staff ID</th>
                  <th className="px-2 text-start">Name</th>
                  <th className="px-2 text-start">Email</th>
                  <th className="px-2 text-start">Phone No</th>
                  <th className="px-2 text-start">Join Date</th>
                  <th className="px-2 text-start">On Duty</th>
                  <th className="px-2 text-start">Role</th>
                  <th className="px-2 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaffs.map((staff, index) => {
                  const date = new Date(staff.joining_date).toISOString().split('T')[0]
                  return (
                    <tr key={index} role="row">
                      <td><span className="text-nowrap p-3 ">SID-00{staff.id}</span></td>
                      <td><span className="text-nowrap p-3 ">{staff.name}</span></td>
                      <td><span className="text-nowrap p-3 ">{staff.email}</span></td>
                      <td><span className="text-nowrap p-3 ">{staff.phone}</span></td>
                      <td><span className="text-nowrap p-3 ">{date}</span></td>
                      <td><span className="text-nowrap p-3 ">{staff.on_duty ? "Yes" : "No"}</span></td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded ${staff.on_duty
                            ? "bg-[#c59a63] text-[#293941]"
                            : "bg-[#293941] text-[#c59a63]"
                            }`}
                        >
                          {staff.role}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            className="border bg-[#293941] text-[#c59a63] rounded shadow-md px-2 py-1 hover:bg-[#c59a63] hover:text-[#293941]"
                            onClick={() => handleDelete(staff.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-[#c59a63] text-[#293941] border rounded shadow-md px-3 py-1 hover:bg-[#293941] hover:text-[#c59a63]"
                            onClick={() => handleEdit(staff)}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {showEditModal && (
          <EditStaff
            staff={selectedStaff}
            onSave={handleSave}
            onHide={handleCloseEditModal}
          />
        )}
      </div>
    </>
  );
}
