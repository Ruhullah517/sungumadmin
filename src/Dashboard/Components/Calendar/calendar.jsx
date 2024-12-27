import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Calendar({ mode = "month" }) {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10)); // November 2024
  const [events, setEvents] = useState([]); // State to hold events
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payments/events");
        const fetchedEvents = response.data.map((event) => ({
          ...event,
          date: new Date(event.booking_date), // Convert string to Date object
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const previousMonth = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonth.getDate();

    const days = [];

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPreviousMonth - i,
        isCurrentMonth: false,
        isToday: false,
        events: [],
      });
    }

    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayEvents = events.filter(
        (event) =>
          event.date.getDate() === i &&
          event.date.getMonth() === month &&
          event.date.getFullYear() === year
      );

      days.push({
        date: i,
        isCurrentMonth: true,
        isToday:
          today.getDate() === i &&
          today.getMonth() === month &&
          today.getFullYear() === year,
        events: dayEvents,
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-[#293941] font-semibold">Events Calendar</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="btn border-lg border-[#293941] text-[#293941] hover:text-[#c59a63] rounded hover:bg-[#293941]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="btn border-lg border-[#293941] text-[#293941] hover:text-[#c59a63] rounded hover:bg-[#293941]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={goToToday}
            className="btn bg-[#c59a63] text-[#293941] py-2 px-4 rounded hover:bg-[#293941] hover:text-[#c59a63]"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-1">
          <h2 className="text-lg text-[#293941] font-medium mr-4">
            {currentDate
              .toLocaleString("default", { month: "long", year: "numeric" })
              .toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="border rounded-lg bg-white">
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-2 text-sm bg-[#293941] text-[#c59a63] font-medium text-center border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={clsx(
                "h-32 p-2 border-r border-b text-[#293941] last:border-r-0 hover:bg-[#293941] hover:text-[#c59a63]",
                !day.isCurrentMonth && "text-[#293941] bg-[#c2c3c7]"
              )}
            >
              <span
                className={clsx(
                  "inline-flex items-center justify-center w-6 h-6 rounded-full",
                  day.isToday && "bg-[#293941] text-[#c59a63]"
                )}
              >
                {day.date}
              </span>
              <div className="mt-1 space-y-1">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    className={clsx(
                      "text-xs px-2 py-1 rounded",
                      event.color || "bg-[#c59a63] text-[#293941]"
                    )}
                  >
                    {event.booking_time} {event.event_name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
