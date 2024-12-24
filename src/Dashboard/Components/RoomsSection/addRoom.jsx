import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRoom = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const saveRoom = async (data) => {
        const formData = new FormData();

        // Align frontend field names with backend
        formData.append('name', data.name);
        formData.append('number', data.number);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('capacity', data.capacity);
        formData.append('status', "available");

        // Handle images
        if (data.images && data.images.length > 0) {
            Array.from(data.images).forEach((file) => {
                formData.append('images', file);
            });
        }

        try {
            const response = await axios.post('http://localhost:5000/api/rooms', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            window.alert('Room added successfully!');
            navigate('/all-rooms');
        } catch (error) {
            console.error('Error adding room:', error.response?.data || error.message);
            window.alert('Failed to add the room. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#c2c3c7] flex items-center justify-center py-10 px-4">
            <form 
                onSubmit={handleSubmit(saveRoom)} 
                className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full"
            >
                <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">Add Room Details</h4>

                {/* Room Name */}
                <div className="mb-4">
                    <input
                        {...register('name', { required: 'Room Name is required' })}
                        placeholder="Room Name"
                        type="text"
                        className="w-full px-4 py-2 border border-[#c2c3c7] rounded-lg focus:outline-none"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
                </div>

                {/* Room Number */}
                <div className="mb-4">
                    <input
                        {...register('number', { required: 'Room Number is required' })}
                        placeholder="Room Number"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.number && <div className="text-red-500 text-sm mt-1">{errors.number.message}</div>}
                </div>

                {/* Room Price */}
                <div className="mb-4">
                    <input
                        {...register('price', { required: 'Price is required' })}
                        placeholder="Price"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price.message}</div>}
                </div>

                {/* Room Description */}
                <div className="mb-4">
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Room Description"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
                </div>

                {/* Room Capacity */}
                <div className="mb-4">
                    <input
                        {...register('capacity', { required: 'Capacity is required' })}
                        placeholder="Capacity"
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.capacity && <div className="text-red-500 text-sm mt-1">{errors.capacity.message}</div>}
                </div>

                {/* Room Images */}
                <div className="mb-4">
                    <input
                        type="file"
                        multiple
                        {...register('images', { required: 'Please upload at least one image' })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                    {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images.message}</div>}
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
