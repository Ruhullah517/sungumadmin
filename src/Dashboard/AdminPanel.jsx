import React from 'react'
import Home from './Components/Home/Home'
import { BrowserRouter } from 'react-router-dom'


const AdminPanel = () => {
  return (
    <>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
      
    </>
  )
}

export default AdminPanel;