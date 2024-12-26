import React, { useState } from 'react';
import './home.css'
import { Routes, Route } from 'react-router-dom';
// import Summary from '../Summary/Summary';
import { useDispatch, useSelector } from 'react-redux';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'

import Users from '../Users/Users'
import ShowRoom from '../RoomsSection/Roomlist'
import Dashboard from '../Dashboard/Dashboard'
import ErrorPage from '../ErrorPage/ErrorPage'
import AddRoom from '../RoomsSection/addRoom'
import Booking from '../RoomsBooking/roombooking'
import BookingDetail from '../RoomsBooking/checkoutdetail'
import BookingSuccess from '../RoomsBooking/bookingsuccess'
import RoomBooking from '../RoomsBooking/bookinglist'
import EmployeeList from '../addemployee/EmployeeList';
import EmployeeTable from '../addemployee/EmployeeTable';
import Header from '../Header/Header';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/footer';
import EventList from '../EventSection/eventlist';
import AddEvent from '../EventSection/addevent';
import EventBookingDetail from '../EventsBooking/checkoutdetails';
import EventBookingSuccess from '../EventsBooking/bookingsuccess';
import EventBookingList from '../EventsBooking/bookinglist';
import EventPaymentList from '../PaymentSection/eventspayment';
import RoomsPaymentList from '../PaymentSection/roomspayment';
import Stafflist from '../Staff/stafflist';
import AddStaff from '../Staff/addstaff';
import Calendar from '../Calendar/calendar';
import IncomeReport from '../IncomeReport/incomereport';
import Gallery from '../Gallery/gallery';
import ImageUploadForm from '../Gallery/addimage';
import HotelMenu from '../Menu/hotelmenu';
import AddHotelMenu from '../Menu/addhotelmenu';
import EventMenu from '../Menu/eventmenu';
import AddEventMenu from '../Menu/addeventmenu';
import EventBookingPage from '../EventsBooking/eventbooking';
import RoomBookingRequests from '../RoomsBooking/roomBookingRequest';
import EventBookingRequests from '../EventsBooking/eventBookingRequest';


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (<>

    <Header isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    <div className=" bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* <div className="h-full"> */}
      <main className={`w-full pt-20 ${isSidebarOpen ? "pl-60" : " pl-20 "}`}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/all-bookings' element={<RoomBooking />} />
          <Route path='/addroom' element={<AddRoom />} />
          <Route path='/all-rooms' element={<ShowRoom />} />
          <Route path='/users' element={<Users />} />
          <Route path='/room-booking' element={<Booking />} />
          {/* <Route path='/book-room/:roomid' element={<Booking />} /> */}
          <Route path='*' element={<ErrorPage />} />
          {/* <Route path='/add-booking/:bookingId' element={<BookingDetail />} /> */}
          <Route path='/checkoutbooking' element={<BookingDetail />} />
          <Route path='/bookingsuccess' element={<BookingSuccess />} />
          <Route path='/staff-list' element={<Stafflist />} />
          <Route path='/employeetable' element={<EmployeeTable />} />
          <Route path='/all-events' element={<EventList />} />
          <Route path='/add-event' element={<AddEvent />} />
          <Route path='/event-payment-detail' element={<EventBookingDetail />} />
          <Route path='/event-booking-success' element={<EventBookingSuccess />} />
          <Route path='/event-booking-list' element={<EventBookingList />} />
          <Route path='/event-payment-list' element={<EventPaymentList />} />
          <Route path='/room-payment-list' element={<RoomsPaymentList />} />
          <Route path='/add-staff' element={<AddStaff />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/income-report' element={<IncomeReport />} />
          <Route path='/image-list' element={<Gallery />} />
          <Route path='/add-image' element={<ImageUploadForm />} />
          <Route path='/hotel-menu' element={<HotelMenu />} />
          <Route path='/add-hotel-menu' element={<AddHotelMenu />} />
          <Route path='/event-menu' element={<EventMenu />} />
          <Route path='/add-event-menu' element={<AddEventMenu />} />
          <Route path='/event-booking' element={<EventBookingPage />} />
          <Route path='/room-booking-requests' element={<RoomBookingRequests />} />
          <Route path='/event-booking-requests' element={<EventBookingRequests />} />
          {/* Add other routes as necessary */}
        </Routes>
        <Footer />
      </main>
    </div>
  </>
  );
};

export default Home;
