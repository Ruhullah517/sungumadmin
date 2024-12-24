import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomData } = location.state || {}; // Get room data from navigation state
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (roomData) {
      // Pre-fill the form fields with room data
      setValue("roomName", roomData.roomName);
      setValue("roomNumber", roomData.roomNumber);
      setValue("price", roomData.price);
      setValue("checkIn", roomData.checkIn);
      setValue("checkOut", roomData.checkOut);
    }
  }, [roomData, setValue]);

  const userData = (data) => {
    console.log("Booking data:", data);
    navigate('/checkoutbooking', {
      state: {
        roomData: {
          roomName: data.roomName,
          roomNumber: data.roomNumber,
          price: data.price,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          userName: data.userName,
          phone: data.phoneNo,
          email: data.email,
          cnic: data.cnic,
        }
      }
    });
  };

  return (
    <>
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
                  <label className="block text-sm mb-1">Your CNIC/Passport</label>
                  <input
                    {...register("cnic", { required: true })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.cnic && <p className="text-red-500 text-sm">Please Enter Your CNIC!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Room Name</label>
                  <input
                    {...register("roomName")}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Room Number</label>
                  <input
                    {...register("roomNumber")}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <input
                    {...register("price")}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Check In</label>
                  <input
                    {...register("checkIn", { required: true })}
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                  {errors.checkIn && <p className="text-red-500 text-sm">Please Enter Check-In Date!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Check Out</label>
                  <input
                    {...register("checkOut", { required: true })}
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    readOnly
                  />
                  {errors.checkOut && <p className="text-red-500 text-sm">Please Enter Check-Out Date!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone Number</label>
                  <input
                    {...register("phoneNo", { required: true })}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.phoneNo && <p className="text-red-500 text-sm">Please Enter Your Phone Number!</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Special Request</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#c59a63] text-[#293941] p-3 rounded hover:bg-[#293941] hover:text-[#c59a63]"
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
