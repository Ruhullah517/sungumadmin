import React, { useState } from "react";

const AddHotelMenu = ({ addNewMenu }) => {
  const [menuName, setMenuName] = useState("");
  const [menuItems, setMenuItems] = useState([{ name: "", price: "" }]);

  const handleAddItem = () => {
    setMenuItems([...menuItems, { name: "", price: "" }]);
  };

  const handleChangeItem = (index, key, value) => {
    const newItems = [...menuItems];
    newItems[index][key] = value;
    setMenuItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMenu = { id: Date.now(), name: menuName, items: menuItems };
    addNewMenu(newMenu);
    setMenuName("");
    setMenuItems([{ name: "", price: "" }]); // Reset form
  };

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        <h2 className="text-lg text-[#293941] font-semibold mb-4">Add Hotel Menu</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <div className="mb-4">
            <label className="block text-[#293941] text-sm font-medium mb-1">Menu Name</label>
            <input
              type="text"
              placeholder="Menu Name"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-[#293941] font-medium mb-2">Menu Items</h4>
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="text"
                  placeholder={`Item ${index + 1} Name`}
                  value={item.name}
                  onChange={(e) =>
                    handleChangeItem(index, "name", e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleChangeItem(index, "price", e.target.value)
                  }
                  className="w-24 p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="btn bg-[#293941] text-[#c59a63] py-1 px-3 rounded hover:bg-[#c59a63] hover:text-[#293941]"
            >
              Add Item
            </button>
          </div>
          <button
            type="submit"
            className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
          >
            Save Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotelMenu;
