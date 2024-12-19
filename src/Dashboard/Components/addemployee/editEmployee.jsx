import React, { useState, useEffect } from "react";

const EmployeeEditForm = ({ employee, onUpdateEmployee, onHide }) => {
  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEmployee(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onHide}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Employee</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onHide}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name:
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Position:
              </label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Position"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook:
              </label>
              <input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Facebook Link"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instagram:
              </label>
              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Instagram Link"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Twitter:
              </label>
              <input
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="Twitter Link"
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditForm;