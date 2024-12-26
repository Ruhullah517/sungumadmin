import React, { useState } from "react";

function EditRoom({ room, onSave, onHide }) {
  const [formData, setFormData] = useState({
    name: room.name || '',
    number: room.number || '',
    price: room.price || '',
    description: room.description || '',
    capacity: room.capacity || '',
    number_of_beds: room.number_of_beds || '',
  });
  const [images, setImages] = useState(null);
  const [existingImages] = useState(JSON.parse(room.images || '[]'));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    // Append all form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    // Append existing images that weren't deleted
    formDataToSend.append('existingImages', JSON.stringify(existingImages));
    // Append new images if any
    if (images) {
      Array.from(images).forEach((file) => {
        formDataToSend.append('images', file);
      });
    }
    onSave(formDataToSend);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onHide}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg text-[#293941] font-semibold">Edit Room</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onHide}
          >
            &times;
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Number:
            </label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>
          {/* no of beds */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              No of Beds:
            </label>
            <input
              type="number"
              name="number_of_beds"
              value={formData.number_of_beds}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Capacity:
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Update Images:
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onHide}
            className="px-4 py-2 text-sm font-medium text-[#293941] bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-[#c59a63] bg-[#293941] rounded hover:bg-[#c59a63] hover:text-[#293941]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditRoom;
