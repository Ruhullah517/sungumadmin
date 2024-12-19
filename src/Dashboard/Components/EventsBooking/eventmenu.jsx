import React, { useState } from "react";

const menuData = {
    Beef: {
        price: 2300,
        details: `
     Main Course:
     - BEEF KORMA
     - BEEF KARAHI
     - WHITE KORMA (ANYONE)
     - BEEF BIRYANI (ANYONE)
     - BEEF YAKHNI PULAO
     - VARIETY OF ROGANI NAAN (LIVE)
     - GREEN SALAD
     - COLD DRINK (UNLIMITED)
     - MINERAL WATER (UNLIMITED)
     - SPECIAL FIRINI / FRUIT TRIFLE
     - QULFA / KHEER / MATANJAN
    `,
    },
    Mutton: {
        price: 3000,
        details: `
      Main Course:
      - MUTTON KORMA
      - MUTTON KARAHI
      - WHITE KORMA (ANYONE)
      - MUTTON BIRYANI (ANYONE)
      - MUTTON YAKHNI PULAO
      - VARIETY OF ROGANI NAAN (LIVE)
      - GREEN SALAD
      - COLD DRINK (UNLIMITED)
      - MINERAL WATER (UNLIMITED)
      - SPECIAL FIRINI / FRUIT TRIFLE
      - QULFA / KHEER / MATANJAN
    `,
    },
    Chicken: {
        price: 1600,
        details: `
      Main Course:
      - CHICKEN KORMA
      - CHICKEN KARAHI
      - WHITE KORMA (ANYONE)
      - CHICKEN BIRYANI (ANYONE)
      - CHICKEN YAKHNI PULAO
      - VARIETY OF ROGANI NAAN (LIVE)
      - GREEN SALAD
      - COLD DRINK (UNLIMITED)
      - MINERAL WATER (UNLIMITED)
      - SPECIAL FIRINI / FRUIT TRIFLE
      - QULFA / KHEER / MATANJAN
    `,
    },
};

const EventMenu = ({ onMenuConfirm, guestCount }) => {
    const [selectedMenu, setSelectedMenu] = useState("Beef");
    const [menuConfirmed, setMenuConfirmed] = useState(false);

    const handleConfirmMenu = () => {
        setMenuConfirmed(true);
        onMenuConfirm(selectedMenu, menuData[selectedMenu].price * guestCount);
    };

    return (
        <div className="w-full bg-white flex flex-col lg:flex-row rounded-md lg:p-4">
            {/* Menu List */}
            <div className="menu-list w-full lg:w-1/3 space-y-4 md:p-4 lg:border-r">
                <h4 className="text-xl text-[#293941] font-semibold mb-4">Select a Menu</h4>
                <ul className="space-y-2">
                    {Object.keys(menuData).map((menu) => (
                        <li
                            key={menu}
                            className={`cursor-pointer p-2 rounded-md text-[#293941] hover:text-[#c59a63] hover:bg-[#293941] transition ${
                                selectedMenu === menu ? "bg-[#c59a63] text-white font-bold" : ""
                            }`}
                            onClick={() => setSelectedMenu(menu)}
                        >
                            {menu} Menu
                        </li>
                    ))}
                </ul>
            </div>

            {/* Menu Details */}
            <div className="menu-details w-full lg:w-2/3 md:p-4">
                <h4 className="text-xl text-[#293941] font-semibold mb-2">
                    {selectedMenu} Menu
                </h4>
                <p className="text-gray-700 mb-4">
                    <strong className="text-[#293941]">Price per guest:</strong> PKR {menuData[selectedMenu].price}
                </p>

                <pre className="bg-[#293941] text-[#c59a63] p-4 rounded-md whitespace-pre-wrap mb-4">
                    {menuData[selectedMenu].details}
                </pre>

                <button
                    className={`px-4 py-2 rounded-md ${
                        menuConfirmed ? "bg-[#293941] text-[#c59a63]" : "bg-[#c59a63] text-[#293941]"
                    }`}
                    onClick={handleConfirmMenu}
                    disabled={menuConfirmed}
                >
                    {menuConfirmed ? "Menu Confirmed" : "Confirm This Menu"}
                </button>
            </div>
        </div>
    );
};

export default EventMenu;
