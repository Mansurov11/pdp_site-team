import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (

    <aside>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            className={({ isActive }) =>
              `w-full  px-2 inline-block ${isActive ? "bg-red-500 text-white" : "bg-white text-black"}`
            }
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `w-full  px-2 inline-block ${isActive ? "bg-red-500 text-white" : "bg-white text-black"}`
            }
            to="/Classes"
          >
            Classes
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) =>
              `w-full  px-2 inline-block ${isActive ? "bg-red-500 text-white" : "bg-white text-black"}`
            }
            to="/Students"
          >
            Students
          </NavLink>
        </li>
      </ul>

    </aside>
  )
}

export default Sidebar