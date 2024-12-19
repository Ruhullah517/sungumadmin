import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Header({ isOpen, toggleSidebar }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleNotificationDropdown = () => {
    setNotificationOpen((prev) => !prev);
  };
  const toggleUserMenuDropdown = () => {
    setUserMenuOpen((prev) => !prev);
    setNotificationOpen(false); // Close notifications if open
  };
  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notifications/unread"
      );
      setNotifications(response.data.notifications);
      setUnreadCount(
        response.data.notifications.filter((n) => !n.read).length
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a specific notification as read
  const markRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    console.log("fetching");
    
    fetchNotifications();
    // playSound();
  }, []);



  return (
    <div className="fixed z-50 w-full h-20 flex bg-[#293941] p-4 text-white">
      <div className={`${isOpen ? 'w-60 flex items-center' : ''}`}>
        <a href="/" className="flex items-center">
          <img
            src={isOpen ? "images/Sungam.png" : "images/Sungam2.png"}
            alt="logo"
            className="w-30 h-12"
          />
        </a>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="text-[#c59a63] ml-8 hover:text-white focus:outline-none lg:block"
      >
        <i
          className={`${isOpen ? "fa-solid fa-align-left" : "fa-solid fa-align-right"
            }`}
        />
      </button>

      {/* Notifications and User Dropdowns */}
      <ul className="flex w-full justify-end space-x-4">
        {/* Notifications */}
        <li className="relative">
          <button
            onClick={toggleNotificationDropdown}
            className="focus:outline-none relative text-[#c59a63] hover:text-white"
            aria-label="Notifications"
          >
            <i className="text-2xl fa fa-bell"></i>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-[4.1px] py-[0.6px]">
                {unreadCount}
              </span>
            )}
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-md rounded-md overflow-hidden z-50">
              <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <span className="font-semibold">Notifications</span>
                {/* <button
                  className="text-xs text-blue-500"
                >
                  Clear All
                </button> */}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markRead(notification.id)}
                      className={`p-4 border-b ${notification.read ? "opacity-70" : "font-semibold"
                        }`}
                    >
                      <div className="flex items-center">
                        <img
                          src="/images/default-avatar.png"
                          alt="User"
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(notification.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No notifications available.
                  </div>
                )}
              </div>
            </div>
          )}
        </li>

        {/* User Menu */}
        <li className="relative">
          <button
            onClick={toggleUserMenuDropdown}
            className="flex items-center focus:outline-none"
            aria-label="User Menu"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="images/person_2.jpg"
              alt="User Avatar"
            />
          </button>
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-md rounded-md z-50">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="images/person_2.jpg"
                    alt="User Avatar"
                  />
                  <div className="ml-3">
                    <h6 className="font-semibold">Soeng Souy</h6>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
              <a
                href="profile.html"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                My Profile
              </a>
              <a
                href="settings.html"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Account Settings
              </a>
              <a
                href="login.html"
                className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
