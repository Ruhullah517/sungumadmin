import axios from "axios";
import React, { useEffect, useState } from "react";

const EventMenu = () => {
  const [eventMenus, setEventMenus] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState({});
  const [menuIndex, setMenuIndex] = useState(null);

  // Open the edit modal and pre-fill data
  const handleEditCourse = (menuIdx) => {
    const menuToEdit = eventMenus[menuIdx];
    setEditingCourse({ ...menuToEdit });
    setMenuIndex(menuIdx);
    setIsEditing(true);
  };

  // Save the edited data and call the API
  const handleSaveCourse = async () => {
    try {
      const updatedMenu = {
        category: editingCourse.category,
        items: editingCourse.items.map(item => item),
      };
      const response = await axios.put(
        `http://localhost:5000/api/menu/event/${eventMenus[menuIndex]?.id}`, // Use optional chaining to avoid errors
        updatedMenu,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Update state safely
      setEventMenus((prevMenus) =>
        prevMenus.map((menu, idx) =>
          idx === menuIndex ? { ...menu, ...updatedMenu } : menu
        )
      );
      setIsEditing(false);
      setEditingCourse({});
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/menu/event/${menuId}`);
      setEventMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
      alert("Menu deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu:", error);
      alert("Failed to delete the menu. Please try again.");
    }
  };

  // Fetch event menus from the backend
  const fetchEventMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/menu/event"
      );
      setEventMenus(response.data);
    } catch (error) {
      console.error("Error fetching event menus:", error);
    }
  };

  useEffect(() => {
    fetchEventMenu();
  }, []);

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        <h4 className="text-lg text-[#293941] font-semibold mb-6">Event Menus</h4>
        <div className="bg-white p-4 rounded shadow">
          {eventMenus.map((menu, menuIdx) => (
            <div key={menuIdx} className="border-b mb-6 pb-4">
              <h5 className="text-xl text-[#293941] font-bold">{menu.category}</h5>
              <ul className="list-disc pl-6 text-gray-500">
                {menu.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditCourse(menuIdx)}
                  className="btn bg-[#c59a63] text-[#293941] py-1 px-3 rounded hover:bg-[#293941] hover:text-[#c59a63]"
                >
                  Edit Menu
                </button>
                <button
                  onClick={() => handleDeleteMenu(menu.id)}
                  className="btn bg-[#293941] text-[#c59a63] py-1 px-3 rounded hover:bg-[#c59a63] hover:text-[#293941]"
                >
                  Delete Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="overflow-y-auto z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h4 className="text-lg text-[#293941] font-bold mb-4">Edit Menu</h4>
            <h5 className=" font-bold">Category</h5>
            <input
              type="text"
              className="w-full border px-3 py-2 mb-4 rounded"
              value={editingCourse.category || ""}
              onChange={(e) =>
                setEditingCourse({ ...editingCourse, category: e.target.value })
              }
              placeholder="Menu Category"
            />
            <div className="mb-4">
              <h5 className=" font-bold">Items</h5>
              {editingCourse.items?.map((item, idx) => (
                <input
                  key={item.id || idx}
                  type="text"
                  className="w-full border px-3 py-2 mb-2 rounded"
                  value={item}
                  onChange={(e) => {
                    const updatedItems = [...editingCourse.items];
                    updatedItems[idx] = e.target.value;
                    setEditingCourse({ ...editingCourse, items: updatedItems });
                  }}
                  placeholder={`Item ${idx + 1}`}
                />
              ))}
              <button
                onClick={() =>
                  setEditingCourse({
                    ...editingCourse,
                    items: [...editingCourse.items, ""]
                  })
                }
                className="btn bg-[#c2c3c7] text-white py-1 px-3 rounded mt-2"
              >
                Add Item
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveCourse}
                className="btn bg-[#c59a63] text-[#293941] py-1 px-3 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn bg-[#293941] text-[#c59a63] py-1 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventMenu;
