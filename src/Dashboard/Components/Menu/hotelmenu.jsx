import React, { useState } from "react";
import { useNavigate } from "react-router";

const HotelMenu = () => {
  const navigate = useNavigate()
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "Pakistani Menu",
      items: [
        { name: "Pancakes", price: 200 },
        { name: "Omelette", price: 150 },
      ],
    },
    {
      id: 2,
      name: "FastFood Menu",
      items: [
        { name: "Pizza", price: 500 },
        { name: "Burger", price: 300 },
      ],
    },
  ]);

  const handleDeleteItem = (menuId, itemIndex) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              items: menu.items.filter((_, index) => index !== itemIndex),
            }
          : menu
      )
    );
  };

  const handleMenu =()=>{
    navigate('/add-hotel-menu')
  }

  const handleEditItem = (menuId, itemIndex) => {
    const updatedMenus = [...menus];
    const menu = updatedMenus.find((menu) => menu.id === menuId);
    const item = menu.items[itemIndex];

    const newName = prompt("Edit Item Name", item.name);
    const newPrice = prompt("Edit Item Price", item.price);

    if (newName && newPrice) {
      menu.items[itemIndex] = { name: newName, price: Number(newPrice) };
      setMenus(updatedMenus);
    }
  };

  return (
    <div className="page-wrapper bg-[#c2c3c7] min-h-screen">
      <div className="content container mx-auto px-4 py-6">
        <div className="page-header mb-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg text-[#293941] font-semibold">Hotel Menus</h4>

            <div className="nav-item flex align-center">
              <div className="input-group search-area">
                <input
                  type="text"
                  className="focus:outline-none form-control"
                  placeholder="Search.."
                />
                <span className="input-group-text">
                  <a href="/react/demo/guest-list">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="22"
                      height="22"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>

            <a
              onClick={handleMenu}
              className="btn bg-[#293941] text-[#c59a63] py-2 px-4 rounded hover:bg-[#c59a63] hover:text-[#293941]"
            >
              Add Menu
            </a>
          </div>
        </div>
        <div className="bg-white p-4 rounded dataTables_wrapper no-footer">
          <ul className="flex flex-col gap-6">
            {menus.map((menu) => (
              <li key={menu.id} className="border p-4 rounded">
                <h4 className="text-xl text-[#293941] font-semibold mb-2">{menu.name}</h4>
                <ul className="space-y-2">
                  {menu.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {item.name} - <span className="font-bold">Rs. {item.price}</span>
                      </span>
                      <div className="space-x-2">
                        <button
                          className="btn bg-[#c59a63] text-[#293941] py-1 px-3 rounded hover:bg-[#293941] hover:text-[#c59a63]"
                          onClick={() => handleEditItem(menu.id, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn bg-[#293941] text-[#c59a63] py-1 px-3 rounded hover:bg-[#c59a63] hover:text-[#293941]"
                          onClick={() => handleDeleteItem(menu.id, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelMenu;
