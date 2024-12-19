import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import EventMenu from './eventmenu';
import EventMenu from './eventmenu';
import { useNavigate } from 'react-router';

const EventBookingPage = () => {
    const [clientName, setClientName] = useState('');
    const [eventType, setEventType] = useState('Wedding');
    const [bookingDate, setBookingDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState('');
    const [menuSelected, setMenuSelected] = useState(false);
    const [stageChecked, setStageChecked] = useState(false);
    const [guestCount, setGuestCount] = useState(10);
    const [menuPrice, setMenuPrice] = useState(0); // State to store selected menu price
    const navigate = useNavigate();

    const eventPrices = {
        Wedding: 25000,
        Birthday: 20000,
        Meeting: 10000,
        Other: 15000,
    };

    const handleGuestChange = (increment) => {
        setGuestCount((prev) => Math.max(10, prev + increment));
    };

    const handleMenuConfirm = (menuName, totalPrice) => {
        setMenuPrice(totalPrice); // Update menu price based on selected menu
    };

    const calculateTotal = () => {
        let total = eventPrices[eventType] + menuPrice;

        // Add stage price
        if (stageChecked) {
            total += 5000; // Custom stage cost
        }

        return total;
    };

    return (
        <div className="flex w-full pt-6 bg-[#c2c3c7]">
            <div className="w-[40%] hidden md:block ">
                <img src="images/image_6.jpg" alt="" />
            </div>
            <div className="p-2 lg:p-6 md:p-4 flex flex-col justify-center items-center bg-white w-[80%] lg:w-[50%] m-auto rounded-xl shadow-lg">
                <h1 className="text-3xl text-[#c59a63] font-bold mb-4">Event Booking Page</h1>

                <div className="mb-4 w-full">
                    <label className="block text-lg text-[#293941] font-semibold mb-2">Booking By</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Enter your name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-lg text-[#293941] font-semibold mb-2">Event Type</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-lg text-[#293941] font-semibold mb-2">Select Date</label>
                    <DatePicker
                        selected={bookingDate}
                        onChange={(date) => setBookingDate(date)}
                        className="w-full p-2 border rounded"
                        placeholderText="Select a date"
                    />
                </div>

                {bookingDate && (
                    <div className="mb-4 w-full">
                        <label className="block text-[#293941] text-lg font-semibold mb-2">Time Slot</label>
                        <div className="flex gap-4">
                            <button
                                className={`px-4 text-[#293941] py-2  rounded ${timeSlot === 'Morning' ? 'bg-[#293941]  text-[#c59a63]' : 'bg-[#c59a63]'
                                    }`}
                                onClick={() => setTimeSlot('Morning')}
                            >
                                Morning
                            </button>
                            <button
                                className={`px-4 text-[#293941] py-2 rounded ${timeSlot === 'Evening' ? 'bg-[#293941]  text-[#c59a63]' : ' bg-[#c59a63]'
                                    }`}
                                onClick={() => setTimeSlot('Evening')}
                            >
                                Evening
                            </button>
                        </div>
                    </div>
                )}
                <div className="mb-4 w-full">
                    <label className="block text-[#293941] text-lg font-semibold mb-2">Number of Guests</label>
                    <div className="flex items-center gap-4">
                        <button
                            className="px-4 text-[#293941] py-2 bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
                            onClick={() => handleGuestChange(-10)}
                        >
                            -
                        </button>
                        <span className="text-xl">{guestCount}</span>
                        <button
                            className="px-4 text-[#293941] py-2 bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
                            onClick={() => handleGuestChange(10)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="mb-4 w-full">
                    <label className="text-[#293941] flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={menuSelected}
                            onChange={(e) => setMenuSelected(e.target.checked)}
                        />
                        Select Menu
                    </label>
                    {menuSelected && (
                        <EventMenu
                            guestCount={guestCount}
                            onMenuConfirm={handleMenuConfirm}
                        />
                    )}
                </div>

                <div className="mb-4 w-full">
                    <label className="text-[#293941] flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={stageChecked}
                            onChange={(e) => setStageChecked(e.target.checked)}
                        />
                        Custom Stage (PKR 5000)
                    </label>
                </div>



                <div className="mt-6 w-full p-4 bg-[#c59a63] rounded shadow">
                    <h2 className="text-xl text-[#293941] font-semibold mb-2">Total Price</h2>
                    <p className="text-lg text-white">PKR {calculateTotal()}</p>
                </div>
                <button onClick={()=>navigate('/event-payment-detail')} className='px-4 text-[#c59a63] py-2 bg-[#293941] rounded hover:bg-[#c59a63] hover:text-[#293941] w-50 m-4'>Book Now</button>
            </div>
        </div>
    );
};

export default EventBookingPage;
