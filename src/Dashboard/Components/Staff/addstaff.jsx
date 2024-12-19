import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStaff = () => {
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
                <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">Add Staff Details</h4>

                {/* Room Name */}
                <div className="mb-4">
                    <label>Staff Name</label>
                    <input
                        {...register('staffName', { required: true })}
                        placeholder="Staff Name"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.staffName && <div className="text-red-500 text-sm mt-1">Please Enter Staff Name!</div>}
                </div>

                {/* Room Price */}
                <div className="mb-4">
                <label>Staff Email</label>
                    <input
                        {...register('staffEmail', { required: true })}
                        placeholder="Staff Email"
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.staffEmail && <div className="text-red-500 text-sm mt-1">Please Enter Staff Email!</div>}
                </div>

                {/* Room Number */}
                <div className="mb-4">
                <label>Phone No</label>
                    <input
                        {...register('phoneNo', { required: true })}
                        placeholder="Phone Number"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.phoneNo && <div className="text-red-500 text-sm mt-1">Please Enter Phone Number!</div>}
                </div>

                {/* Room Description */}
                <div className="mb-4">
                <label>Joining Date</label>
                    <input
                        {...register('joinDate', { required: true })}
                        placeholder="Joining Date"
                        type='date'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.joinDate && <div className="text-red-500 text-sm mt-1">Please Enter Joining Date!</div>}
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
                <div className="mb-4">
                <label>On Duty</label>
                    <select
                        {...register('onDuty', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.onDuty && <div className="text-red-500 text-sm mt-1">Please Select Any One!</div>}
                </div>

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
                <label>Role</label>
                    <select
                        {...register('role', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="Staff">Staff</option>
                        <option value="Owner">Owner</option>
                        <option value="Manager">Manager</option>
                    </select>
                    {errors.role && <div className="text-red-500 text-sm mt-1">Please Select Role!</div>}
                </div>

                {/* Room Images */}
                <div className="mb-4">
                <label>Staff Image</label>
                    <input
                        type="file"
                        multiple
                        {...register('staffImage', { required: true })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.staffImage && <div className="text-red-500 text-sm mt-1">Please Select Staff Images!</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#c59a63] text-[#293941] py-2 px-4 rounded-lg hover:bg-[#293941] hover:text-[#c59a63] transition-colors"
                >
                    Add Staff
                </button>
            </form>
        </div>
    );
};

export default AddStaff;
