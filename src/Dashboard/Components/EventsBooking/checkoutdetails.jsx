import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from "../PaymenMethod/paymentmethod";

const EventBookingDetail = () => {
  let nav = useNavigate();
  const location = useLocation();
  const { eventData } = location.state || {};

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);

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
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    // Add form data
    formData.append('event_name', eventData.event_name);
    formData.append('booked_by', eventData.booked_by);
    formData.append('account_number', data.accountNumber);
    formData.append('account_title', data.accountHolderName);
    formData.append('booking_date', eventData.checkIn);
    formData.append('booking_time', eventData.time);
    formData.append('stage', eventData.stage ? "Yes" : "No");
    formData.append('menu', eventData.menu ? "Yes" : "No");
    formData.append('services', eventData.services ? "Yes" : "No");
    formData.append('email', eventData.email);
    formData.append('cnic', eventData.cnic);
    formData.append('phone', eventData.phone);
    formData.append('total_payment', eventData.totalPrice);
    formData.append('paid_amount', ((eventData.totalPrice) * 0.35));
    formData.append('payment_status', "Partial");
    formData.append('payment_date', new Date().toISOString().split('T')[0]);
    formData.append('number_of_guests', eventData.number_of_guests);
    formData.append('receipt', receiptFile); // Append receipt file

    try {
      const response = await axios.post('http://localhost:5000/api/event-booking-requests', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response);
      console.log(formData);


      alert('Booking request submitted successfully!');
      nav('/bookingsuccess'); // Redirect to confirmation page
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert(error.response?.data?.error || 'Failed to submit the booking. Please try again.');
    }
  };

  return <>
    <div className="container mx-auto px-4">
      <div className="py-5 text-center">
        <h2 className="text-2xl text-[#293941] font-semibold">Terms & Conditions for Checkout</h2>
        <p className="text-lg text-gray-600">
          For bookings made by the admin, 100% payment is required at the time of booking.
        </p>
        <p className="text-lg text-gray-600">
          For direct bookings on website 30% pay on the time of booking, and remaning 70% payment will be made upon arrival at the hotel.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="md:col-span-1 shadow-lg p-3 rounded h-fit">
          <h4 className="flex justify-center  items-center text-lg font-semibold text-gray-700 mb-3">
            <span>Your cart</span>
          </h4>
          <hr className="my-6" />
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded ">
              <div>
                <h6 className="font-medium">Event Name</h6>
              </div>
              <span className="text-gray-600">{eventData.event_name}</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Booked By</h6>
              </div>
              <span className="text-gray-600">{eventData.booked_by}</span>

            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Hall Price</h6>
              </div>
              <span className="text-gray-600">Rs.{eventData.hallPrice}</span>
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Booked Date</h6>
              </div>
              <span className="text-gray-600">{eventData.checkIn} {eventData.time}</span>
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">Menu</h6>
              </div>
              <span>{eventData.menu ? "Yes" : "No"}</span>
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">No Of Guest</h6>
              </div>
              <span>{eventData.number_of_guests}</span>
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">stage customization</h6>
              </div>
              <span>{eventData.stage ? "Yes" : "No"}</span>
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">Services</h6>
              </div>
              <span>{eventData.services ? "Yes" : "No"}</span>
            </li>

            <hr className="my-6" />
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <span>Total Amount (PKR)</span>
              <strong>{eventData.totalPrice}</strong>
            </li>

            <hr className="my-6" />
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <span>Payable Amount (PKR)</span>
              <strong>{(eventData.totalPrice) * 0.35}</strong>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 shadow-lg p-4">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <hr className="my-6" />
            <PaymentForm />
            <hr className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Account Holder Name</label>
                <input
                  {...register("accountHolderName", { required: true })}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Example: John Alex"
                />
                <small className="text-gray-500">Full name as displayed on account</small>
                {errors.accountHolderName && <div className="text-red-600 mt-1">Please Enter Account Holder Name!</div>}
              </div>
              <div>
                <label className="font-semibold">Account Number</label>
                <input
                  {...register("accountNumber", { required: true })}
                  type="number"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Example: 11223344"
                />
                {errors.accountNumber && <div className="text-red-600 font-sm mt-1">Please Enter Your Account Number!</div>}
              </div>
            </div>

            <div>
              <label className="font-semibold">Upload Receipt</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptChange}
                className="block w-full border-gray-300 rounded p-2"
              />
              {errors.receipt && <div className="text-red-600 mt-1">Please upload a receipt!</div>}
              {receiptPreview && (
                <div className="mt-4">
                  <img src={receiptPreview} alt="Receipt Preview" className="w-24 h-24 object-cover rounded" />
                </div>
              )}
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
    <br />
  </>
}

export default EventBookingDetail;