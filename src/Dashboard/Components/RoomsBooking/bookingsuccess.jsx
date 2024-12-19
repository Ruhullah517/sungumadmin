import React from 'react';
import { Link } from 'react-router-dom';
import './roombooking.css';

const BookingSuccess = () => {
  return (
    <>
    <div style={{height:'80vh', display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div className="success-container">
        <h1>Booking Successful!</h1>
        <p>Thank you for choosing our hotel. Your booking has been successfully completed.</p>
        <p>We look forward to welcoming you and providing a memorable experience.</p>
      </div>
    </div>
    </>);
};

export default BookingSuccess;
