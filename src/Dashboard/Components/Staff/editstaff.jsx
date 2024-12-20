import React, { useState, useEffect } from "react";

export default function EditStaff({ staff, onSave, onHide }) {
  const [formData, setFormData] = useState({ ...staff });

  useEffect(() => {
    setFormData({
      ...staff,
      joining_date: staff?.joining_date
        ? new Date(staff.joining_date).toISOString().split("T")[0] // Format to YYYY-MM-DD
        : "",
    });
  }, [staff]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.on_duty) {
      alert("Please fill all required fields!");
      return;
    }

    // Pass the complete `formData` to the parent `onSave` function
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
          <h2 className="text-lg text-[#293941] font-semibold">Edit Staff</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onHide}
          >
            &times;
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone No:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* On Duty */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              On Duty (0 = No, 1 = Yes):
            </label>
            <input
              type="number"
              name="on_duty"
              value={formData.on_duty}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role:
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Joining Date:
            </label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date || new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onHide}
            className="px-4 py-2 text-sm font-medium text-[#c59a63] bg-[#293941] rounded hover:bg-[#c59a63] hover:text-[#293941]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-[#293941] bg-[#c59a63] rounded hover:bg-[#293941] hover:text-[#c59a63]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
