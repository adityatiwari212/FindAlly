import React from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className='fixed left-3 top-1/2'>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-violet-700 font-bold text-white text-lg"><FaArrowAltCircleRight /></label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-violet-600 text-white font-bold text-xl h-full w-72 p-4">
            {/* Sidebar content here */}
            <li><a>Home</a></li>
            <li><a>About</a></li>
            <li><a>Contact</a></li>
            <li><a>Chat</a></li>
            <li><a>My Community</a></li>
            </ul>
        </div>
        </div>
    </div>
  )
}
