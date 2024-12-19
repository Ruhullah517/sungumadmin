// import RoomAvailable from "../roomAvailable/roomAvailable";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

const BookingPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [room, setRoom] = useState(null);
  const nav = useNavigate();
//   const params = useParams();
//   let currentUser = useSelector((store) => store.userSection.currentUser);
//   console.log(currentUser);

//   useEffect(() => {
//     const fetchRoom = async () => {
//       try {
//         const resp = await axios.get("/get-rooms");
//         const room = resp.data.find((room) => room._id === params.roomid);
//         setRoom(room);
//       } catch (e) {
//         console.log(e);
//       }
//     };

//     fetchRoom();
//   }, [params.roomid]);

//   if (!room) {
//     return <div>Loading...</div>;
//   }

//   const roomName = room.roomName;
//   const roomPrice = room.roomPrice;
//   const userId = currentUser.id;

const userData =''

//   const userData = async (data) => {
//     data.roomName = roomName;
//     data.roomPrice = roomPrice;
//     data.userId = userId;
//     console.log("Data sent to the backend:", data);

//     try {
//       const response = await axios.post("/booking-detail", {
//         ...data,
//         checkIn: new Date(data.checkIn),
//         checkOut: new Date(data.checkOut),
//       });

//       if (response.status === 200) {
//         const bookingDetail = response.data.bookingDetail;
//         if (bookingDetail && bookingDetail._id) {
//           const bookingId = bookingDetail._id;
//           console.log("Booking ID:", bookingId);
//           nav(`/bookingdetail/${bookingId}`);
//         } else {
//           console.error("Booking detail does not contain an ID");
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Error booking room:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

  return (
    <>
      {/* <div
        className="w-full mb-5 bg-cover bg-center py-20"
        style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Booking</h1>
          <nav className="text-white">
            <ul className="flex justify-center space-x-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li>/</li>
              <li><a href="#" className="hover:underline">Pages</a></li>
              <li>/</li>
              <li className="font-bold">Booking</li>
            </ul>
          </nav>
        </div>
      </div> */}

      <div className="container mx-auto py-10">
        <div className="text-center mb-10">
          <h6 className="text-[#293941] uppercase font-medium mb-2">Room Booking</h6>
          <h1 className="text-3xl font-bold">
            Book A <span className="text-[#c59a63] uppercase">Luxury Room</span>
          </h1>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 flex flex-wrap gap-4">
            <div className="hidden lg:block">
              <img
                className="img-fluid rounded w-75 wow zoomIn"
                src="/images/about-1.jpg"
                alt="Room Image"
              />
            </div>
            {/* <div className="w-1/2">
              <img
                className="img-fluid rounded w-100 wow zoomIn"
                src="/images/room-4.jpg"
                alt="Room Image"
              />
            </div>
            <div className="w-1/2">
              <img
                className="img-fluid rounded w-50 wow zoomIn"
                src="/images/room-5.jpg"
                alt="Room Image"
              />
            </div>
            <div className="w-1/2">
              <img
                className="img-fluid rounded w-75 wow zoomIn"
                src="/images/room-6.jpg"
                alt="Room Image"
              />
            </div> */}
          </div>

          <div className="lg:w-1/2 w-full">
            <form
              onSubmit={handleSubmit(userData)}
              className="bg-gray-100 p-6 rounded-lg shadow-md"
            >
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm mb-1">Your Name</label>
                  <input
                    {...register("userName", { required: true })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.userName && <p className="text-red-500 text-sm">Please Enter Your Name!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Your Email</label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">Please Enter Your Email!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Your CNIC/PassPort</label>
                  <input
                    {...register("cnic", { required: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.cnic && <p className="text-red-500 text-sm">Please Enter Your CNIC!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Check In</label>
                  <input
                    {...register("checkIn", { required: true })}
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.checkIn && <p className="text-red-500 text-sm">Please Enter Check-In Date!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Check Out</label>
                  <input
                    {...register("checkOut", { required: true })}
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.checkOut && <p className="text-red-500 text-sm">Please Enter Check-Out Date!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Adults</label>
                  <input
                    {...register("adults", { required: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.adults && <p className="text-red-500 text-sm">Please Enter Number of Adults!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Children</label>
                  <input
                    {...register("children", { required: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.children && <p className="text-red-500 text-sm">Please Enter Number of Children!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Room Number</label>
                  <input
                    {...register("roomNo", { required: true })}
                    value='2'
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.roomNo && <p className="text-red-500 text-sm">Please select a room!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone Number</label>
                  <input
                    {...register("phoneNo", { required: true })}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.phoneNo && <p className="text-red-500 text-sm">Please Enter Your Phone Number!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Special Request</label>
                  <textarea
                    {...register("specialRequests")}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#c59a63] text-[#293941] p-3 rounded hover:bg-[#293941] hover:text-[#c59a63]"
                  onClick={()=>{nav("/checkoutbooking")}}
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
