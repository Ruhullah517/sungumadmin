import React, { useState } from "react";

function EditRoom({ room, onSave, onHide }) {
  const [formData, setFormData] = useState({ ...room });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? value : "") : value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Type:
            </label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room No:
            </label>
            <input
              type="text"
              name="roomType"
              value={formData.roomNo}
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
              type="text"
              name="roomPrice"
              value={formData.roomPrice}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Capacity
            </label>
            <input
              type="text"
              name="maxcap"
              value={formData.maxcap}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roomStatus"
                  value="Available"
                  checked={formData.roomStatus === "Available"}
                  onChange={handleChange}
                  className="rounded text-[#c59a63] focus:ring-[#c59a63]"
                />
                <span className="text-sm">Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="roomStatus"
                  value="Mantanance"
                  checked={formData.roomStatus === "Mantanance"}
                  onChange={handleChange}
                  className="rounded text-blue-600 focus:ring-blue-300"
                />
                <span className="text-sm">On Mantanance</span>
              </label>
            </div>
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