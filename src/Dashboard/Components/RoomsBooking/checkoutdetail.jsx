import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./roombooking.css";
import PaymentForm from "../PaymenMethod/paymentmethod";
import axios from "axios";

const BookingDetail = () => {
  const location = useLocation();
  const { roomData } = location.state || {};

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const navigate = useNavigate();
  // Calculate the number of stays and total amounts
  const noOfStay = Math.ceil(
    (new Date(roomData.checkOut) - new Date(roomData.checkIn)) / (1000 * 60 * 60 * 24)
  );
  const total = noOfStay * roomData.price;
  const date = new Date().toISOString().split("T")[0];
  console.log(date);


  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file) {
      if (!validImageTypes.includes(file.type)) {
        alert('Invalid file type. Only JPG, PNG, and GIF are allowed.');
        return;
      }
      if (file.size > maxSize) {
        alert('File size too large. Maximum size is 5MB.');
        return;
      }
      setReceiptPreview(URL.createObjectURL(file));
      setReceiptFile(file);
      console.log(file);
      
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    try {
      // Add form data
      formData.append('booked_by', roomData.userName);
      formData.append('phone', roomData.phone);
      formData.append('email', roomData.email);
      formData.append('cnic', roomData.cnic);
      formData.append('room_number', roomData.roomNumber);
      formData.append('total_payment', total);
      formData.append('checkin_date', roomData.checkIn);
      formData.append('checkout_date', roomData.checkOut);
      formData.append('receipt', receiptFile); // Append receipt file
      formData.append('account_title', data.accountHolderName);
      formData.append('account_number', data.accountNumber);
      formData.append('payment_date', date);
      formData.append('paid_amount', (total * 0.35).toFixed(0));
      formData.append('payment_status', "Half Paid");

      console.log("Request Data:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await axios.post('http://localhost:5000/api/room-booking-requests', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Booking request submitted successfully!');
      navigate('/booking-confirmation'); // Redirect to confirmation page
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(error.response?.data?.error || 'Failed to submit the booking. Please try again.');
    }
  };

  useEffect(() => {
    if (roomData) {
      // Pre-fill form fields with room data
      setValue("roomName", roomData.roomName);
      setValue("roomNumber", roomData.roomNumber);
      setValue("price", roomData.price);
      setValue("checkIn", roomData.checkIn);
      setValue("checkOut", roomData.checkOut);
      setValue("email", roomData.email);
      setValue("cnic", roomData.cnic);
      setValue("phoneNo", roomData.phone);
      setValue("userName", roomData.userName);
    }
  }, [roomData, setValue]);

  return (
    <div className="container mx-auto px-4">
      <div className="py-5 text-center">
        <h2 className="text-2xl text-[#293941] font-semibold">Terms & Conditions for Checkout</h2>
        <p className="text-lg text-gray-600">
          For bookings made by the admin, 100% payment is required at the time of booking.
        </p>
        <p className="text-lg text-gray-600">
          For direct bookings on the website, 30% payment is required at the time of booking, and the remaining 70% upon arrival.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 shadow-lg p-3 rounded h-fit">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">Your Cart</h4>
          <hr className="my-4" />
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>Room Name</div>
              <span className="text-gray-600">{roomData.roomName}</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>Room Number</div>
              <span className="text-gray-600">{roomData.roomNumber}</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>Room Price</div>
              <span className="text-gray-600">Rs.{roomData.price}/Night</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>Check In</div>
              <span className="text-gray-600">{roomData.checkIn}</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>Check Out</div>
              <span className="text-gray-600">{roomData.checkOut}</span>
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-2 rounded text-[#293941]">
              <div>No Of Stay</div>
              <span>{noOfStay} Nights</span>
            </li>
            <hr className="my-4" />
            <li className="flex justify-between items-center bg-[#c2c3c7] p-2 rounded text-[#293941]">
              <div>Total Amount (PKR)</div>
              <strong>Rs.{total}</strong>
            </li>
            <hr className="my-4" />
            <li className="flex justify-between items-center bg-[#c2c3c7] text-[#293941] p-2 rounded">
              <div>Payable Amount (30%)</div>
              <strong>Rs.{(total * 0.3).toFixed(2)}</strong>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2 shadow-lg p-4">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#293941] font-semibold">Name</label>
                <input
                  {...register("userName")}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[#293941] font-semibold">Phone</label>
                <input
                  {...register("phoneNo")}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[#293941] font-semibold">Email</label>
                <input
                  {...register("email")}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-[#293941] font-semibold">CNIC</label>
                <input
                  {...register("cnic")}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2"
                  readOnly
                />
              </div>
            </div>
            <hr className="my-6" />
            <PaymentForm />
            <hr className="my-6" />
            {/* Receipt Upload */}
            <div>
              <label className="text-[#293941] font-semibold">Receipt of Advance Payment</label>
              <input
                type="file"
                {...register("file", { required: true })}
                accept="image/*"
                onChange={handleReceiptChange}
                className="block w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              {errors.file && <div className="text-red-600 mt-1">Please add receipt</div>}
              {receiptPreview && (
                <div className="mt-4">
                  <img src={receiptPreview} alt="Receipt Preview" className="w-24 h-24 object-cover rounded" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#293941] font-semibold">Account Holder Name</label>
                <input
                  {...register("accountHolderName", { required: true })}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2"
                  placeholder="Example: John Alex"
                />
                {errors.accountHolderName && <div className="text-red-600 mt-1">Please Enter Account Holder Name!</div>}
              </div>
              <div>
                <label className="text-[#293941] font-semibold">Account Number</label>
                <input
                  {...register("accountNumber", { required: true })}
                  type="number"
                  className="block w-full border-gray-300 rounded p-2"
                  placeholder="Example: 11223344"
                />
                {errors.accountNumber && <div className="text-red-600 mt-1">Please Enter Your Account Number!</div>}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
            >
              Continue to Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
