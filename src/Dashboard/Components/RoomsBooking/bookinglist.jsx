import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../RoomsSection/Room.css';

const RoomBooking = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  
  const handleBooking = (room) => {
    navigate("/room-booking", {
      state: {
        roomData: {
          roomId: room.id,
          roomName: room.name,
          roomNumber: room.number,
          price: room.price,
          checkIn: checkIn,
          checkOut: checkOut
        }
      }
    });
  };
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching room data", error);
      setError("Failed to fetch rooms. Please try again.");
    }
  };
  const checkAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      // Format dates to match MySQL date format
      const formattedCheckIn = new Date(checkIn).toISOString().split('T')[0];
      const formattedCheckOut = new Date(checkOut).toISOString().split('T')[0];
      // Validate dates
      if (new Date(formattedCheckIn) > new Date(formattedCheckOut)) {
        setError("Check-out date must be after check-in date");
        return;
      }
      const response = await axios.get("http://localhost:5000/api/rooms/available", {
        params: {
          checkIn: formattedCheckIn,
          checkOut: formattedCheckOut
        }
      });
      // The response now includes availableRooms array
      setRooms(response.data.availableRooms || []);
      setIsDateSelected(true);
      // Show message if no rooms available
      if (response.data.availableRooms?.length === 0) {
        setError("No rooms available for the selected dates");
      }
    } catch (error) {
      console.error("Error checking room availability:", error);
      setError(error.response?.data?.error || "Failed to check room availability");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
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
            e.target.src = '/path/to/fallback/image.jpg';
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
        <div className="mb-6 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <button
                className={`bg-[#c59a63] text-[#293941] px-4 py-2 rounded hover:bg-[#293941] hover:text-[#c59a63] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={checkAvailability}
                disabled={!checkIn || !checkOut || loading}
              >
                {loading ? 'Checking...' : 'Check Availability'}
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>
        {isDateSelected && (
          <>
            <div className="page-header mb-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg text-[#293941] font-semibold">
                  Available Rooms ({rooms.length})
                </h4>
                <div className="text-sm text-gray-600">
                  {checkIn} to {checkOut}
                </div>
              </div>
            </div>
            <div className="card overflow-x-auto">
              {rooms.length > 0 ? (
                <div className="dataTables_wrapper no-footer">
                  <table className="border-collapse w-full table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
                    <thead>
                      <tr className="text-[#293941]">
                        <th className="px-2 text-start">Room ID</th>
                        <th className="px-2 text-start">Image</th>
                        <th className="px-2 text-start">Room Name</th>
                        <th className="px-2 text-start">Room No</th>
                        <th className="px-2 text-start">Price</th>
                        <th className="px-2 text-start">Max Capacity</th>
                        <th className="px-2 text-start">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room) => (
                        <tr key={room.id} role="row">
                          <td>RL-00{room.id}</td>
                          <td>{renderRoomImage(room)}</td>
                          <td>{room.name}</td>
                          <td>{room.number}</td>
                          <td>{room.price}</td>
                          <td>{room.capacity}</td>
                          <td>
                            <button
                              className="border bg-[#c59a63] text-[#293941] rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#293941] hover:text-[#c59a63]"
                              onClick={() => handleBooking(room)}
                            >
                              Book Now
                            </button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No rooms available for the selected dates
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default RoomBooking;