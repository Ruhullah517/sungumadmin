import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router';

const EventBookingPage = () => {
    const location = useLocation();
    const { bookingData } = location.state || {};
    const { register, handleSubmit, control, watch, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();


    useEffect(() => {
        if (bookingData) {
            // Pre-fill the form fields with room data
            setValue("checkIn", bookingData.checkIn);
            setValue("time", bookingData.timeSession);

        }
    }, [bookingData, setValue]);

    const eventPrices = {
        Wedding: 25000,
        Birthday: 25000,
        Meeting: 25000,
        Other: 25000,
    };

    const watchEventType = watch('event-name', 'Wedding');
    const watchStageChecked = watch('stage'); 
    const watchServices = watch('services');

    const total_payment = () => {
        let total = eventPrices[watchEventType]; // Event type price

        // Subtract 20,000 if custom stage is checked
        if (watchStageChecked) {
            total += 20000; // Custom stage discount
        }
        if (watchServices) {
            total += 25000;
        }

        return total;
    };

    const onSubmit = (data) => {
        const totalPrice = total_payment();
        console.log(data);

        navigate('/event-payment-detail', {
            state: {
                eventData: {
                    ...data,
                    totalPrice: totalPrice,
                    hallPrice: eventPrices[watchEventType]
                }
            },
        });
    };

    return (
        <div className="flex w-full pt-6 bg-[#c2c3c7]">
            <div className="w-[40%] hidden lg:block">
                <img src="images/image_6.jpg" alt="" />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-2  lg:p-6 md:p-4 flex flex-col justify-center items-center bg-white w-[100%] m-2 lg:w-[50%] lg:m-auto rounded-xl shadow-lg"
            >
                <h1 className="md:text-3xl text-lg text-[#c59a63] font-bold mb-4">Event Booking Page</h1>

                {/* Client Name */}
                <div className='md:flex w-full gap-3'>
                    <div className="mb-4 w-full">
                        <label className="block md:text-lg text-sm text-[#293941] font-semibold mb-2">Booking By</label>
                        <input
                            type="text"
                            className={`w-full p-2 border rounded ${errors.booked_by ? 'border-red-500' : ''}`}
                            placeholder="Enter your name"
                            {...register('booked_by', { required: 'Name is required' })}
                        />
                        {errors.booked_by && (
                            <span className="text-red-500 text-sm">{errors.booked_by.message}</span>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block md:text-lg text-sm text-[#293941] font-semibold mb-2">User Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter your email"
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                </div>
                <div className='md:flex w-full gap-3'>
                    <div className="mb-4 w-full">
                        <label className="block md:text-lg text-sm text-[#293941] font-semibold mb-2">Phone Number</label>
                        <input
                            type="number"
                            className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Enter your phone"
                            {...register('phone', { required: 'Phone is required' })}
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-sm">{errors.phone.message}</span>
                        )}
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-sm md:text-lg text-[#293941] font-semibold mb-2">CNIC/PassPort</label>
                        <input
                            type="number"
                            className={`w-full p-2 border rounded ${errors.cnic ? 'border-red-500' : ''}`}
                            placeholder="Enter your CNIC/PassPort"
                            {...register('cnic', { required: 'CNIN/PassPort is required' })}
                        />
                        {errors.cnic && (
                            <span className="text-red-500 text-sm">{errors.cnic.message}</span>
                        )}
                    </div>
                </div>
                {/* Event Type */}
                <div className='flex w-full gap-3'>
                    <div className="mb-4 w-full">
                        <label className="block text-sm md:text-lg text-[#293941] font-semibold mb-2">Event Type</label>
                        <select
                            className="w-full p-2 border rounded"
                            {...register('event_name')}
                        >
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Booking Date */}
                    <div className="mb-4 w-full">
                        <label className="block text-sm md:text-lg text-[#293941] font-semibold mb-2">Select Date</label>
                        <input
                            type='date'
                            {...register("checkIn", { required: true })}
                            className="w-full p-2 border rounded"
                            readOnly
                        />

                        {errors.booked_date && (
                            <span className="text-red-500 text-sm">{errors.booked_date.message}</span>
                        )}
                    </div>

                    {/* Time Slot */}
                    <div className="mb-2 w-full">
                        <label className="block text-sm mb-2 text-[#293941] md:text-lg font-semibold">Time Slot</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            {...register('time', { required: 'Time slot is required' })}
                            readOnly
                        />
                        {errors.time && (
                            <span className="text-red-500 text-sm">{errors.time.message}</span>
                        )}
                    </div>
                </div>
                {/* Guest Count */}
                <div className=" mb-4 w-full">
                    <label className="block text-[#293941] md:text-lg text-sm font-semibold mb-2">Number of Guests</label>
                    <Controller
                        control={control}
                        name="number_of_guests"
                        defaultValue={10}
                        render={({ field }) => (
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="px-4 text-[#293941] py-2 bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
                                    onClick={() => field.onChange(Math.max(10, field.value - 10))}
                                >
                                    -
                                </button>
                                <span className="text-xl">{field.value}</span>
                                <button
                                    type="button"
                                    className="px-4 text-[#293941] py-2 bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
                                    onClick={() => field.onChange(field.value + 10)}
                                >
                                    +
                                </button>
                            </div>
                        )}
                    />
                </div>

                {/* Custom Stage */}
                <div className='md:flex w-full gap-3'>
                    {/* Checkbox for Custom Stage */}
                    <div className="mb-4 w-full">
                        <label className="text-[#293941] flex items-center">
                            <input
                                type="checkbox"
                                {...register('stage')}
                                className='mr-2'
                            />
                            Event Stage <span className='text-sm ml-2'>(Starting From Rs.20,000)</span>
                        </label>
                    </div>
                    {/* Checkbox for services */}
                    <div className="mb-4 w-full">
                        <label className="text-[#293941] flex items-center">
                            <input
                                type="checkbox"
                                {...register('services')}
                                className='mr-2'
                            />
                            Services <span className='text-sm ml-2'>(extra charges Rs.25,000)</span>
                        </label>
                    </div>

                    {/* Checkbox for Event Menu */}
                    <div className="mb-4 w-full">
                        <label className="text-[#293941] flex items-center">
                            <input
                                type="checkbox"
                                {...register('menu')}
                                className='mr-2'
                            />
                            Event Menu <span className='text-sm ml-2'>(Extra Charges Applied)</span>
                        </label>
                    </div>
                </div>



                {/* Total Price */}
                <div className="mt-6 w-full p-4 bg-[#c59a63] rounded shadow">
                    <h2 className="text-xl text-[#293941] font-semibold mb-2">Total Price</h2>
                    <p className="text-lg text-white">PKR {total_payment()}</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="px-4 text-[#c59a63] py-2 bg-[#293941] rounded hover:bg-[#c59a63] hover:text-[#293941] w-50 m-4"
                >
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default EventBookingPage;