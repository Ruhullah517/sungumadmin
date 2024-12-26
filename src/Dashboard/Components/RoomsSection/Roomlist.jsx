import React, { useEffect, useState } from "react";
import axios from "axios";
import EditRoom from "./editroom";
import { useNavigate } from "react-router-dom";
import './Room.css';

const ShowRoom = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleSave = (editedRoom) => {
    // Check if editedRoom is FormData
    const isFormData = editedRoom instanceof FormData;

    axios.put(`http://localhost:5000/api/rooms/${selectedRoom.id}`, editedRoom, {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    })
      .then((response) => {
        // Refresh the rooms list instead of manual update
        fetchRooms();
        alert("Room updated successfully");
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating room", error);
        alert("Failed to update room");
      });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  const handleDelete = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      axios.delete(`http://localhost:5000/api/rooms/${roomId}`)
        .then(() => {
          setRooms(rooms.filter((room) => room.id !== roomId));
          alert("Room deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting room", error);
          alert("Failed to delete room");
        });
    }
  };

  const handleBooking = () => {
    navigate("/room-booking");
  };

  const handleRoom = () => {
    navigate("/addroom");
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching room data", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.number.toString().includes(searchTerm)
  );

  const renderRoomImage = (room) => {
    try {
      const imageArray = JSON.parse(room.images);
      const firstImage = imageArray.length > 0 ? imageArray[0] : "";
      
      return firstImage ? (
        <img
          src={`http://localhost:5000/${firstImage.replace(/\\/g, "/")}`}
          alt={room.name}
          className="rounded w-16"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'path/to/fallback/image.jpg';
          }}
        />
      ) : (
        <span>No Image</span>
      );
    } catch (error) {
      console.error("Error parsing room images:", error);
      return <span>Error loading image</span>;
    }
  };

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Room List</h4>

            <div className="nav-item flex align-center">
              <div className="input-group search-area">
                <input
                  type="text"
                  className="focus:outline-none form-control"
                  placeholder="Search.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleRoom}
              className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
            >
              Add Room
            </button>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse w-full table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2 text-start">Room ID</th>
                  <th className="px-2 text-start">Image</th>
                  <th className="px-2 text-start">Room Name</th>
                  <th className="px-2 text-start">Room No</th>
                  <th className="px-2 text-start">Price</th>
                  <th className="px-2 text-start">No of Beds</th>
                  <th className="px-2 text-start">Max Capacity</th>
                  <th className="px-2 text-start">Actions</th>
                  {/* <th className="px-2 text-start">Booking</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => {
                  
                  return (
                    <tr key={room.id} role="row">
                      <td>RL-00{room.id}</td>
                      <td>
                        {renderRoomImage(room)}
                      </td>
                      <td>{room.name}</td>
                      <td>{room.number}</td>
                      <td>{room.price}</td>
                      <td>{room.number_of_beds}</td>
                      <td>{room.capacity}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="bg-[#293941] text-[#c59a63] px-2 py-1 rounded hover:bg-[#c59a63] hover:text-[#293941]"
                            onClick={() => handleDelete(room.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-[#c59a63] text-[#293941] px-2 py-1 rounded hover:bg-[#293941] hover:text-[#c59a63]"
                            onClick={() => handleEdit(room)}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
