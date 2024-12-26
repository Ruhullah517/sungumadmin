import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRoom = () => {
   const navigate = useNavigate();
   const { register, handleSubmit, formState: { errors } } = useForm();
   const [loading, setLoading] = useState(false);
   const [imagePreview, setImagePreview] = useState([]);
    // Handle image preview
   const handleImageChange = (e) => {
       const files = Array.from(e.target.files);
       setImagePreview(files.map(file => URL.createObjectURL(file)));
   };
    const saveEvent = async (data) => {
       setLoading(true);
       const formData = new FormData();
        try {
           // Validate file types and sizes
           const files = Array.from(data.images);
           const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
           const maxSize = 5 * 1024 * 1024; // 5MB
            for (let file of files) {
               if (!validImageTypes.includes(file.type)) {
                   throw new Error('Invalid file type. Only JPG, PNG and GIF are allowed.');
               }
               if (file.size > maxSize) {
                   throw new Error('File size too large. Maximum size is 5MB.');
               }
           }
            // Append form data
           formData.append('name', data.name);
           formData.append('price', data.price);
           formData.append('description', data.description);
           formData.append('capacity', data.capacity);
            // Append images
           files.forEach((file) => {
               formData.append('images', file);
           });
            const response = await axios.post('http://localhost:5000/api/events', formData, {
               headers: { 'Content-Type': 'multipart/form-data' },
               onUploadProgress: (progressEvent) => {
                   const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                   console.log('Upload progress:', percentCompleted);
                   // You could add a progress bar here
               }
           });
            window.alert('Event added successfully!');
           navigate('/all-events');
       } catch (error) {
           console.error('Error adding event:', error);
           window.alert(error.response?.data?.error || error.message || 'Failed to add the event. Please try again.');
       } finally {
           setLoading(false);
       }
   };
    return (
       <div className="min-h-screen bg-[#c2c3c7] flex items-center justify-center py-10 px-4">
           <form 
               onSubmit={handleSubmit(saveEvent)} 
               className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full"
           >
               <h4 className="text-2xl font-semibold text-center text-[#c59a63] mb-6">Add Event Details</h4>
                {/* Room Name */}
               <div className="mb-4">
                   <input
                       {...register('name', { 
                           required: 'Event Name is required',
                           minLength: { value: 3, message: 'Name must be at least 3 characters' }
                       })}
                       placeholder="Event Name"
                       type="text"
                       className="w-full px-4 py-2 border border-[#c2c3c7] rounded-lg focus:outline-none"
                   />
                   {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
               </div>
                {/* Room Price */}
               <div className="mb-4">
                   <input
                       {...register('price', { 
                           required: 'Price is required',
                           min: { value: 0, message: 'Price must be positive' }
                       })}
                       placeholder="Price"
                       type="number"
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                   />
                   {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price.message}</div>}
               </div>
                {/* Room Description */}
               <div className="mb-4">
                   <textarea
                       {...register('description', { 
                           required: 'Description is required',
                           minLength: { value: 10, message: 'Description must be at least 10 characters' }
                       })}
                       placeholder="Room Description"
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                   />
                   {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description.message}</div>}
               </div>
                {/* Room Capacity */}
               <div className="mb-4">
                   <input
                       {...register('capacity', { 
                           required: 'Capacity is required',
                           min: { value: 1, message: 'Capacity must be at least 1' }
                       })}
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
                       accept="image/*"
                       {...register('images', { 
                           required: 'Please upload at least one image',
                           onChange: handleImageChange
                       })}
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                   />
                   {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images.message}</div>}
                   
                   {/* Image Preview */}
                   {imagePreview.length > 0 && (
                       <div className="mt-4 flex gap-2 flex-wrap">
                           {imagePreview.map((url, index) => (
                               <img 
                                   key={index} 
                                   src={url} 
                                   alt={`Preview ${index + 1}`} 
                                   className="w-24 h-24 object-cover rounded"
                               />
                           ))}
                       </div>
                   )}
               </div>
                <button
                   type="submit"
                   disabled={loading}
                   className={`w-full bg-[#c59a63] text-[#293941] py-2 px-4 rounded-lg hover:bg-[#293941] hover:text-[#c59a63] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                   {loading ? 'Adding Event...' : 'Add Event'}
               </button>
           </form>
       </div>
   );
};
export default AddRoom;