import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { event } from "jquery";

const EventBookingList = () => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [timeSession, setTimeSession] = useState("Morning");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleBooking = () => {
    navigate("/event-booking", {
      state: {
        bookingData: {
          checkIn: checkIn,
          timeSession: timeSession
        }
      }
    });
  };


  const checkAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      // Format date and time to match MySQL date format
      const formattedDate = new Date(checkIn).toISOString().split('T')[0];
      // Validate date
      if (!checkIn) {
        setError("Please select a date");
        return;
      }
      console.log(formattedDate, timeSession);

      const response = await axios.post("http://localhost:5000/api/events/check-availability",
        {
          date: formattedDate,
          time: timeSession
        });
      console.log(response.data);
      setAvailable(response.data.available)
      setIsDateSelected(true);
    } catch (error) {
      console.error("Error checking hall availability:", error);
      setError(error.response?.data?.error || "Failed to check hall availability");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-xl text-[#293941] font-semibold">
            Check For Hall Availability
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Session</label>
              <select
                className="w-full p-2 border rounded"
                value={timeSession}
                onChange={(e) => setTimeSession(e.target.value)}
              >
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
            <div>
              <button
                className={`bg-[#c59a63] text-[#293941] px-4 py-2 rounded hover:bg-[#293941] hover:text-[#c59a63] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={checkAvailability}
                disabled={!checkIn || loading}
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
                  Available Halls
                </h4>
                <div className="text-sm text-gray-600">
                  {checkIn} {timeSession === "Morning" ? "Morning" : "Evening"}
                </div>
              </div>
            </div>
            <div >
              {available ? (
                <div className="dataTables_wrapper no-footer">
                  <div className="card mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
                    <h5 className="text-xl font-semibold text-green-800">
                      Event Hall Available!
                    </h5>
                    <p className="text-gray-700">
                      Book your Weddings, Parties, Birthdays, and Events Now.
                    </p>
                    <button
                      className="mt-4 border bg-[#c59a63] text-[#293941] rounded shadow-md px-4 py-2 hover:bg-[#293941] hover:text-[#c59a63]"
                      onClick={handleBooking}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-600">
                  No halls available for the selected date and time session
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventBookingList;