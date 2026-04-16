import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <>
   <Header />
   <Sidebar />
   <Outlet />
   </>
  )
}

export default Layout