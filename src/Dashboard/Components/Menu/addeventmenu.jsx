import React, { useState } from "react";
import axios from 'axios';

const AddEventMenu = ({ addNewEventMenu }) => {
  const [category, setCategory] = useState("");
  const [courses, setCourses] = useState(['']);

  const handleAddItem = () => {
    const updatedCourses = [...courses];
    updatedCourses.push("");
    setCourses(updatedCourses);
  };

  const handleChangeItem = (itemIndex, value) => {
    const updatedCourses = [...courses];
    updatedCourses[itemIndex] = value;
    setCourses(updatedCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category, courses);

    try {
      // Send data to the API
      await axios.post('http://localhost:5000/api/menu/event', {
        category: category,
        items: courses
      });
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }

    // Reset form
    setCategory("");
    setCourses(['']);
  };

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        <h4 className="text-lg text-[#293941] font-semibold mb-6">Add Event Menu</h4>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <h6 className="font-semibold mb-2">Items</h6>
          {courses.map((item, itemIndex) => (
            <div key={itemIndex} className="flex gap-4 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleChangeItem(itemIndex, e.target.value)
                }
                placeholder={`Item ${itemIndex + 1}`}
                className="flex-1 p-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem()}
            className="btn bg-[#c2c3c7] text-white py-1 px-3 rounded"
          >
            Add Item
          </button>
          <div className="flex gap-4 flex-row">
            <button
              type="submit"
              className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
            >
              Save Event Menu
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default AddEventMenu;
