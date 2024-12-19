import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
// import "./roombooking.css";
import PaymentForm from "../PaymenMethod/paymentmethod";




const EventBookingDetail = () => {
  // let [BookingDetail, setBookingDetail] = useState([])
  let nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  // const userCnic = BookingDetail.cnic;
  // const NoOfStay = BookingDetail.numberOfDays;
  // const totalCost = BookingDetail.totalPrice;
  // const roomName = BookingDetail.roomName;
  // const roomNo = BookingDetail.roomNo;
  // const DateCheckIn = new Date(BookingDetail.checkIn);
  // const DateCheckOut = new Date(BookingDetail.checkOut);
  // const checkIn = DateCheckIn.toLocaleDateString();
  // const checkOut = DateCheckOut.toLocaleDateString();
  // const userId = BookingDetail.userId;

  // const bookingData = async (data) => {
  //   const paymentStatus = 'Payed';
  //   const bookingsdata = new FormData();
  //   bookingsdata.append('userName', data.userName);
    // bookingsdata.append('email', data.email);
    // bookingsdata.append('phoneNo', data.phoneNo);
    // bookingsdata.append('country', data.country);
    // bookingsdata.append('city', data.city);
    // bookingsdata.append('paymentMethod', data.paymentMethod);
    // bookingsdata.append('accountHolderName', data.accountHolderName);
    // bookingsdata.append('accountNumber', data.accountNumber);
    // bookingsdata.append('userCnic', data.userCnic = userCnic);
    // bookingsdata.append('NoOfStay', data.NoOfStay = NoOfStay);
    // bookingsdata.append('totalCost', data.totalCost = totalCost);
    // bookingsdata.append('roomName', data.roomName = roomName);
    // bookingsdata.append('roomNo', data.roomNo = roomNo);
    // bookingsdata.append('userId', data.userId = userId);
    // bookingsdata.append('paymentStatus', data.paymentStatus = paymentStatus);
    // bookingsdata.append('checkIn', data.checkIn = checkIn);
    // bookingsdata.append('checkOut', data.checkOut = checkOut);
    // if (data.transactionSlip[0]) { // Ensure there's a file
    //   bookingsdata.append('transactionSlip', data.transactionSlip[0]);
    // } else {
    //   console.error('No transaction slip selected');
    //   return;
    // }


    
    // try {
      //   const response = await axios.post('/checkout', bookingsdata);
      
      //   if (response.status === 200) {
        //     nav('/bookingsuccess');
        //   }
        // } catch (error) {
          //   console.error('Error booking detail:', error.response ? error.response.data : error.message);
          // }
          // };
          
          
          
          // console.log('Data sent to the backend:', bookingsdata);



  // const { bookingId } = useParams();

  // useEffect(() => {
  //   const fetchRoom = async () => {
  //     try {

  //       const resp = await axios.get('/bookingdetails');
  //       const foundBooking = resp.data.find(booking => booking._id === bookingId);

  //       if (foundBooking) {
  //         setBookingDetail(foundBooking);
  //       } else {
  //         console.error('Booking not found');
  //       }
  //     } catch (e) {
  //       console.error('Error fetching booking details:', e);

  //     }
  //   };

  //   if (bookingId) {
  //     fetchRoom();
  //   }
  // }, [bookingId]);

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
              <span className="text-gray-600">Birthday</span>
              {/* <span className="text-gray-600">{BookingDetail.roomName}</span> */}
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Booked By</h6>
              </div>
              <span className="text-gray-600">Sajid ali</span>
              {/* <span className="text-gray-600">{checkIn}</span> */}
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Hall Price</h6>
              </div>
              <span className="text-gray-600">Rs.15,000</span>
              {/* <span className="text-gray-600">Rs.{BookingDetail.roomPrice}/Night</span> */}
            </li>
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <div>
                <h6 className="font-medium">Booked Date</h6>
              </div>
              <span className="text-gray-600">10/02/2024 Morning</span>
              {/* <span className="text-gray-600">{checkOut}</span> */}
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">Menu</h6>
              </div>
              <span>Rs.1200/person</span>
              {/* <span>{BookingDetail.numberOfDays}</span> */}
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">No Of Guest</h6>
              </div>
              <span>200</span>
              {/* <span>{BookingDetail.numberOfDays}</span> */}
            </li>
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <div>
                <h6 className="font-medium">stage customization</h6>
              </div>
              <span>Rs.25,000</span>
              {/* <span>{BookingDetail.numberOfDays}</span> */}
            </li>
           
            <hr className="my-6" />
            <li className="flex justify-between items-center bg-gray-100 p-1 rounded">
              <span>Total Amount (PKR)</span>
              <strong>280,000</strong>
              {/* <strong>{BookingDetail.totalPrice}</strong> */}
            </li>

            <hr className="my-6" />
            <li className="flex justify-between items-center bg-[#c2c3c7] p-1 rounded text-[#293941]">
              <span>Payable Amount (PKR)</span>
              <strong>84,000</strong>
              {/* <strong>{BookingDetail.totalPrice}</strong> */}
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 shadow-lg p-4">
          {/* <h4 className="text-lg font-medium mb-4">Billing address</h4> */}
          {/* <form onSubmit={handleSubmit(bookingData)} className="space-y-4"> */}
          <form  className="space-y-4">
            {/* <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-semibold">First Name</label>
                <input
                  {...register("userName", { required: true })}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                />
                {errors.userName && <div className="text-red-600 mt-1">Please Enter Your Name!</div>}
              </div>
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Email"
                />
                {errors.email && <div className="text-red-600 mt-1">Please Enter Your Email!</div>}
              </div>
              <div>
                <label className="font-semibold">Phone No</label>
                <input
                  {...register("phoneNo", { required: true })}
                  type="number"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Phone No"
                />
                {errors.phoneNo && <div className="text-red-600 mt-1">Please Enter Your Phone No!</div>}
              </div>
            </div> */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Country</label>
                <input
                  {...register("country", { required: true })}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="Country"
                />
                {errors.country && <div className="text-red-600 mt-1">Please Enter Your Country!</div>}
              </div>
              <div>
                <label className="font-semibold">City</label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  className="block w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                  placeholder="City"
                />
                {errors.city && <div className="text-red-600 mt-1">Please Enter Your City!</div>}
              </div>
            </div> */}

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

            {/* <div>
              <label className="font-semibold">Upload Transaction Slip</label>
              <input
                {...register("transactionSlip", { required: true })}
                type="file"
                className="block w-full border-gray-300 rounded p-2"
              />
              {errors.transactionSlip && <div className="text-red-600 mt-1">Please Upload Transaction Slip!</div>}
            </div> */}

            <button
              type="submit"
              onClick={()=>{nav('/bookingsuccess');}}
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