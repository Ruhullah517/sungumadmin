import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRoom = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const saveUser = (myData) => {
        let newRoom = new FormData();
        myData.id = Math.floor(Math.random() * 1000); // Generate a random ID
        myData.checkin = 0;
        myData.checkout = 0;

        // Append form data
        newRoom.append('id', myData.id);
        newRoom.append('roomName', myData.roomName);
        newRoom.append('roomType', myData.roomType);
        newRoom.append('roomPrice', myData.roomPrice);
        newRoom.append('roomNo', myData.roomNo);
        newRoom.append('roomDescription', myData.roomDescription);
        newRoom.append('roomFacilities', myData.roomFacilities);
        newRoom.append('roomRating', myData.roomRating);
        newRoom.append('roomStatus', myData.roomStatus);

        // Append images
        if (myData.roomImage && myData.roomImage.length > 0) {
            for (let i = 0; i < myData.roomImage.length; i++) {
                newRoom.append('roomImage', myData.roomImage[i]);
            }
        }

        axios.post('/create-room', newRoom, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(resp => {
            console.log(resp.data);
            if (resp.data) nav('/all-rooms');
        })
        .catch(error => console.error('Error uploading room data:', error.response?.data || error.message));
    };

    return (
        <div className="min-h-screen bg-[#c2c3c7] flex items-center justify-center py-10 px-4">
            <form 
                onSubmit={handleSubmit(saveUser)} 
                className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full"
            >
                <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">Add Room Details</h4>

                {/* Room Name */}
                <div className="mb-4">
                    <input
                        {...register('roomName', { required: true })}
                        placeholder="Room Name"
                        type="text"
                        className="w-full px-4 py-2 border border-[#c2c3c7] rounded-lg focus:outline-none"
                    />
                    {errors.roomName && <div className="text-red-500 text-sm mt-1">Please Enter Room Name!</div>}
                </div>

                {/* Room Price */}
                <div className="mb-4">
                    <input
                        {...register('roomPrice', { required: true })}
                        placeholder="Price"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.roomPrice && <div className="text-red-500 text-sm mt-1">Please Enter Price!</div>}
                </div>

                {/* Room Number */}
                <div className="mb-4">
                    <input
                        {...register('roomNo', { required: true })}
                        placeholder="Room Number"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.roomNo && <div className="text-red-500 text-sm mt-1">Please Enter Room Number!</div>}
                </div>

                {/* Room Description */}
                <div className="mb-4">
                    <textarea
                        {...register('roomDescription', { required: true })}
                        placeholder="Room Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.roomDescription && <div className="text-red-500 text-sm mt-1">Please Enter Room Description!</div>}
                </div>

                {/* Room Rating */}
                {/* <div className="mb-4">
                    <input
                        {...register('roomRating', { required: true })}
                        placeholder="Rating"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.roomRating && <div className="text-red-500 text-sm mt-1">Please Enter Room Rating!</div>}
                </div> */}

                {/* Room Type */}
                {/* <div className="mb-4">
                    <select
                        {...register('roomType', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    >
                        <option value="">Select Room Type</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Executive">Executive</option>
                        <option value="Executive Plus">Executive Plus</option>
                        <option value="Family Suites">Family Suites</option>
                    </select>
                    {errors.roomType && <div className="text-red-500 text-sm mt-1">Please Select Room Type!</div>}
                </div> */}

                {/* Room Facilities */}
                {/* <div className="mb-4 flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="WiFi"
                            {...register('roomFacilities', { required: true })}
                            className="mr-2"
                        />
                        WiFi
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Breakfast"
                            {...register('roomFacilities', { required: true })}
                            className="mr-2"
                        />
                        Breakfast
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            value="Car Parking"
                            {...register('roomFacilities', { required: true })}
                            className="mr-2"
                        />
                        Car Parking
                    </label>
                    {errors.roomFacilities && <div className="text-red-500 text-sm mt-1">Select at least one facility!</div>}
                </div> */}

                {/* Room Status */}
                <div className="mb-4">
                    <select
                        {...register('roomStatus', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    >
                        <option value="">Select Status</option>
                        <option value="Available">Available</option>
                        <option value="Booked">Coming Soon</option>
                    </select>
                    {errors.roomStatus && <div className="text-red-500 text-sm mt-1">Please Select Room Status!</div>}
                </div>

                {/* Room Images */}
                <div className="mb-4">
                    <input
                        type="file"
                        multiple
                        {...register('roomImage', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.roomImage && <div className="text-red-500 text-sm mt-1">Please Select Room Images!</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#c59a63] text-[#293941] py-2 px-4 rounded-lg hover:bg-[#293941] hover:text-[#c59a63] transition-colors"
                >
                    Add Room
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
