import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import EditEvent from './editevent'
import { useNavigate } from "react-router-dom";
// import './Room.css';

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleSave = (editedEvent) => {
    // Check if editedRoom is FormData
    const isFormData = editedEvent instanceof FormData;

    axios.put(`http://localhost:5000/api/events/${selectedEvent.id}`, editedEvent, {
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    })
      .then((response) => {
        // Refresh the rooms list instead of manual update
        fetchEvents();
        alert("Event updated successfully");
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("Error updating event", error);
        alert("Failed to update event");
      });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios.delete(`http://localhost:5000/api/events/${eventId}`)
        .then(() => {
          setEvents(events.filter((event) => event.id !== eventId));
          alert("Event deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting Event", error);
          alert("Failed to delete event");
        });
    }
  };
  const handleBooking = () => {
    navigate("/event-booking");
  };
  const handleEvent = () => {
    navigate("/add-event")
  }

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching room data", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderEventImage = (event) => {
    try {
      const imageArray = JSON.parse(event.images);
      const firstImage = imageArray.length > 0 ? imageArray[0].replace(/\\/g, "/") : "";

      return firstImage ? (
        <img
          src={`http://localhost:5000/${firstImage}`}
          alt={event.name}
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
        {/* Page Header */}
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Events List</h4>

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


            <a
              onClick={handleEvent}
              className="btn bg-[#293941] text-[#c59a63] py-2 px-4 rounded hover:bg-[#c59a63] hover:text-[#293941]"
            >
              Add Event
            </a>
          </div>
        </div>

        {/* Table */}
        <div className=" card overflow-x-auto">
          <div className="dataTables_wrapper no-footer">
            <table className="border-collapse table card-table display mb-4 shadow-hover default-table dataTablesCard dataTable no-footer">
              <thead>
                <tr className="text-[#293941]">
                  <th className="px-2 text-start">Event ID</th>
                  <th className="px-2 text-start">Image</th>
                  <th className="px-2 text-start">Event Name</th>
                  <th className="px-2 text-start">Hall Price</th>
                  <th className="px-2 text-start">Max Capacity</th>
                  <th className="px-2 text-start">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredEvents.map((booking, index) => (
                    <tr
                      key={index}
                      role="row"
                    >
                      <td><span className="text-nowrap">{booking.id}</span></td>
                      {/* <td><span className="text-nowrap">{booking.image}</span></td> */}
                      <td>
                        <div className="concierge-bx">
                          {renderEventImage(booking)}
                        </div>
                      </td>
                      <td><span className="text-nowrap">{booking.name}</span></td>
                      <td><span className="text-nowrap">{booking.price}</span></td>
                      <td><span className="text-nowrap">{booking.capacity}</span></td>
                      <td>
                        {/* <div className="inline-block relative"> */}
                        <div key={index} className=" flex gap-1 ">
                          <button
                            className=" border bg-[#293941] text-[#c59a63] rounded shadow-md block focus:outline-none text-left px-2 py-1 hover:bg-[#c59a63] hover:text-[#293941]"
                            onClick={() => handleDelete(booking.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-[#c59a63] text-[#293941] border rounded shadow-md block focus:outline-none text-left px-3 py-1 hover:bg-[#293941] hover:text-[#c59a63]"
                            onClick={() => handleEdit(booking)}
                          >
                            Edit
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

      {showEditModal && (
        <EditEvent
          event={selectedEvent}
          onSave={handleSave}
          onHide={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default EventList;
