import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function EmployeeTable() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const onFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const saveEmployee = async (data) => {
    const formData = new FormData();
    formData.append("name", data.Name);
    formData.append("position", data.position);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      nav("/employeelist");
      console.log("Employee added successfully:", response.data);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(saveEmployee)}
        className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
      >
        <h4 className="text-2xl font-semibold text-center text-yellow-700 mb-6">Add Employee Details</h4>

        <div className="mb-4">
          <input
            {...register("Name", { required: true })}
            placeholder="Name"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.Name && (
            <div className="text-red-500 text-sm mt-1">Please Enter Name!</div>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("position", { required: true })}
            placeholder="Position"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.position && (
            <div className="text-red-500 text-sm mt-1">Please Enter Position!</div>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("facebook", { required: true })}
            placeholder="Facebook Link"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.facebook && (
            <div className="text-red-500 text-sm mt-1">Please Enter Facebook Link</div>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("instagram", { required: true })}
            placeholder="Instagram Link"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.instagram && (
            <div className="text-red-500 text-sm mt-1">Please Enter Instagram Link</div>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("twitter", { required: true })}
            placeholder="Twitter Link"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.twitter && (
            <div className="text-red-500 text-sm mt-1">Please Enter Twitter Link</div>
          )}
        </div>

        <div className="mb-4">
          <input
            onChange={onFileChange}
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.image && (
            <div className="text-red-500 text-sm mt-1">Please Select Image!</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default EmployeeTable;
