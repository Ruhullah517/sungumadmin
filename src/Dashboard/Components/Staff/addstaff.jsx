import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStaff = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const saveUser = async (data) => {
        // Map the form data to the required payload
        const staffData = {
            name: data.staffName,
            email: data.staffEmail,
            phone: data.phoneNo,
            joining_date: data.joinDate,
            on_duty: data.onDuty === "Yes" ? 1 : 0, // Convert "Yes" to 1, "No" to 0
            role: data.role,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/staff', staffData);
            if (response.status === 201) {
                alert("Staff added successfully!");
                navigate('/staff-list'); // Navigate to the staff list page
            } else {
                alert("Failed to add staff. Please try again.");
            }
        } catch (error) {
            console.error("Error adding staff:", error.response?.data || error.message);
            alert("An error occurred while adding staff.");
        }
    };

    return (
        <div className="min-h-screen bg-[#c2c3c7] flex items-center justify-center py-10 px-4">
            <form
                onSubmit={handleSubmit(saveUser)}
                className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full"
            >
                <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">Add Staff Details</h4>

                {/* Staff Name */}
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

                {/* Staff Email */}
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

                {/* Phone Number */}
                <div className="mb-4">
                    <label>Phone No</label>
                    <input
                        {...register('phoneNo', { required: true })}
                        placeholder="Phone Number"
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.phoneNo && <div className="text-red-500 text-sm mt-1">Please Enter Phone Number!</div>}
                </div>

                {/* Joining Date */}
                <div className="mb-4">
                    <label>Joining Date</label>
                    <input
                        {...register('joinDate', { required: true })}
                        placeholder="Joining Date"
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    />
                    {errors.joinDate && <div className="text-red-500 text-sm mt-1">Please Enter Joining Date!</div>}
                </div>

                {/* On Duty */}
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

                {/* Role */}
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
