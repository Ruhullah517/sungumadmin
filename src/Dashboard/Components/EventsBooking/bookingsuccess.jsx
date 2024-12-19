import React from 'react';
import { Link } from 'react-router-dom';
import '../RoomsBooking/roombooking.css';

const EventBookingSuccess = () => {
    return (
        <>
            <div style={{ height: '80vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="success-container">
                    <h1>Booking Successful!</h1>
                    <p>Thank you for choosing <strong className='text-black'>Sungum Event Management!</strong>  </p>
                    <p>Your booking has been successfully completed, and we are excited to help make your event truly unforgettable.</p>

                    <p> We look forward to collaborating with you to create a seamless and memorable experience. Feel free to reach out if you have any special requests or need further assistance.
                    </p>
                </div>
            </div>
        </>);
};

export default EventBookingSuccess;