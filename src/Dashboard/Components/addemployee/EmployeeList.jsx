import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeEditForm from "./editEmployee";

const EmployeeTable = () => {
  let nav = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/get/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteEmployee = async (userId) => {
    try {
      await axios.delete(`/delete-employee?id=${userId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((user) => user._id !== userId)
      );
      toast.warn("User deleted", {
        transition: Flip,
        autoClose: 1000,
        position: "bottom-left",
        theme: "dark",
      });
    } catch (error) {
      console.error("There was an error deleting the user:", error);
      toast.error("Failed to delete user", {
        transition: Flip,
        autoClose: 3000,
        position: "bottom-left",
        theme: "dark",
      });
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await axios.put(`/api/employees/${updatedEmployee._id}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );
      setSelectedEmployee(null);
      toast.success("Employee updated successfully!", {
        transition: Flip,
        autoClose: 1000,
        position: "bottom-left",
        theme: "dark",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee", {
        transition: Flip,
        autoClose: 3000,
        position: "bottom-left",
        theme: "dark",
      });
    }
  };

  const handleCloseEditModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">All Employees</h2>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => nav("/employeetable")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Employee
          </button>
        </div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Image</th>
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Position</th>
              <th className="border border-gray-300 p-2 text-left">FB Link</th>
              <th className="border border-gray-300 p-2 text-left">
                Twitter Link
              </th>
              <th className="border border-gray-300 p-2 text-left">
                Instagram Link
              </th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="border border-gray-300 p-2">{employee.name}</td>
                <td className="border border-gray-300 p-2">
                  {employee.position}
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={employee.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    FB
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={employee.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Twitter
                  </a>
                </td>
                <td className="border border-gray-300 p-2">
                  <a
                    href={employee.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Instagram
                  </a>
                </td>
                <td className="border border-gray-300 p-2 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEmployee && (
          <EmployeeEditForm
            employee={selectedEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onHide={handleCloseEditModal}
          />
        )}
      </div>
    </>
  );
};

export default EmployeeTable;
