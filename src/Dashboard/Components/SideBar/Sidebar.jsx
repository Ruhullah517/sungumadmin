import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './sidebar.css'
import { SlimScroll } from "../../assets/slimscroll"

export default function SideBar({ isOpen, setIsOpen }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      SlimScroll(scrollRef.current, {

        color: "white",
        alwaysVisible: true,
      });
    }
  }, []);

  return (
    <div
      className={`sidebar text-[#c59a63] ${isOpen ? "w-64" : "w-24 hover:w-64"
        } transition-all duration-300`}
      onMouseOver={() => {
        if (!isOpen) {
          setIsOpen(true)
        } // Sirf tab kaam kare jab isOpen false ho
      }}
      onMouseLeave={() => {
        if (isOpen) {
          setIsOpen(false)
        }// Sirf tab kaam kare jab isOpen false ho
      }}
    >
      <div ref={scrollRef} className="sidebar-menu p-3">
        <ul className="mt-2 space-y-2">
          {/* Dashboard Link */}
          <li >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex  items-center pt-2 pb-2 pl-3 rounded-lg hover:bg-[#c59a63] hover:text-[#293941] 
              ${isActive ? "bg-[#c59a63] text-[#293941]" : "text-[#c59a63]"
                }`
              }
            >
              <i className="fas fa-tachometer-alt" />
              {isOpen && <span className="pl-2">Dashboard</span>}
            </NavLink>
          </li>

          <hr className="border-white mb-2" />

          {/* Booking Submenu */}
          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-suitcase"
            title="Room Booking"
            links={[
              { href: "/all-bookings", label: "Bookings List" },
              // { href: "/edit-booking", label: "Edit Booking" },
              { href: "/all-rooms", label: "Book Room" },
            ]}
          />



          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-home"
            title="Rooms"
            links={[
              { href: "/all-rooms", label: "Rooms List" },
              // { href: "/edit-room", label: "Edit Room" },
              { href: "/addroom", label: "Add Room" },
            ]}
          />

          {/* Customers Submenu */}
          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-icons"
            title="Events"
            links={[
              { href: "/all-events", label: "Events List" },
              // { href: "/edit-customer", label: "Edit Customer" },
              { href: "/add-event", label: "Add Events" },
            ]}
          />

          {/* Customers Submenu */}
          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-suitcase"
            title="Event Booking"
            links={[
              { href: "/event-booking-list", label: "Booking List" },
              // { href: "/edit-customer", label: "Edit Customer" },
              { href: "/all-events", label: "Book Event" },
            ]}
          />

          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fa fa-credit-card"
            title="Payments"
            links={[
              { href: "/room-payment-list", label: "Rooms Payment" },
              // { href: "/edit-staff", label: "Edit Staff" },
              { href: "/event-payment-list", label: "Events Payment" },
            ]}
          />

          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-user"
            title="Staff"
            links={[
              { href: "/staff-list", label: "Staff List" },
              // { href: "/edit-staff", label: "Edit Staff" },
              { href: "/add-staff", label: "Add Staff" },
            ]}
          />

          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-concierge-bell"
            title="Food Menu"
            links={[
              { href: "/hotel-menu", label: "Hotel Menu" },
              { href: "/add-hotel-menu", label: "Add Hotel Menu" },
              { href: "/event-menu", label: "Event Menu" },
              { href: "/add-event-menu", label: "Add Event Menu" },
            ]}
          />

          <li >
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex items-center pt-2 pb-2 pl-3 rounded-lg hover:bg-[#c59a63] hover:text-[#293941] 
              ${isActive ? "bg-[#c59a63] text-[#293941]" : "text-[#c59a63]"
                }`
              }
            >
              <i className="fas fa-calendar-alt" />
              {isOpen && <span className="pl-2 text-sm">Calendar</span>}
            </NavLink>
          </li>

          <li >
            <NavLink
              to="/income-report"
              className={({ isActive }) =>
                `flex  items-center pt-2 pb-2 pl-3 rounded-lg hover:bg-[#c59a63] hover:text-[#293941] 
              ${isActive ? "bg-[#c59a63] text-[#293941]" : "text-[#c59a63]"
                }`
              }
            >
              <i className="fas fa-table" />
              {isOpen && <span className="pl-2 text-sm">Income Report</span>}
            </NavLink>
          </li>

          <SidebarSubMenu
            isCollapsed={isOpen}
            icon="fas fa-image"
            title="Gallery"
            links={[
              { href: "/image-list", label: "Image List" },
              { href: "/add-image", label: "Add Images" },
            ]}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </ul>
      </div>
    </div>
  );
}

function SidebarSubMenu({ isCollapsed, icon, title, links }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  return (
    <>
      <li onMouseLeave={() => setIsSubMenuOpen(false)}>
        <div className="relative">
          {/* Main Menu Item */}
          <div className="flex pt-2 pb-2 pl-3 pr-3 rounded-lg justify-center items-center hover:bg-[#c59a63] hover:text-[#293941]">
            <i className={`${icon} mr-2`} />
            <button
              className="flex focus:outline-none w-full justify-between"
              onClick={toggleSubMenu} // Toggle submenu visibility
            >
              {isCollapsed && (
                <>
                  <span className="text-sm">{title}</span>
                  <i className={`fa-solid ${isSubMenuOpen ? "fa-sort-up" : "fa-sort-down"}`}></i>
                </>
              )}
            </button>
          </div>

          {/* Submenu with Transition */}
          <div
            className={`flex flex-col items-center relative text-white z-10 overflow-hidden transition-[max-height] duration-500 ease-in-out
             ${isSubMenuOpen ? "max-h-40 opacity-100" : "max-h-0"
              }`}

          >
            <ul className="list-disc flex flex-col justify-center text-sm">
              {links.map((link, index) => (
                <li className="pt-1 pb-1 pl-1 " key={index}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      ` ${isActive ? "text-[#c59a63] font-semibold" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>




      {/* <li className="group">
      <div className="relative">
        <div className="flex pt-2 pb-2 pl-3 pr-3 rounded-lg justify-center items-center hover:bg-blue-400">
          <i className={`${icon} mr-2`} />
          <button className="flex  focus:outline-none w-full justify-between">
            {isCollapsed && <span>{title}</span>}
            <i
              className="fa-solid fa-sort-up hover:fa-sort-down"></i>
          </button>
        </div>
        {isCollapsed && (
          <div className="flex flex-col items-center relative text-white z-10
             ">
            <ul className="hidden list-disc pl-6 overflow-hidden space-y-2 text-sm group-hover:block hover:transition-[max-height] hover:duration-500 hover:ease-in-out">
              {links.map((link, index) => (
                <li className="pt-1 pb-1 pl-1" key={index}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `hover:text-blue ${isActive ? "text-green-400 font-bold" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li> */}
    </>
  );
}
