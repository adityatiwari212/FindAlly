import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from "./pages/Home";
import { Navbar } from "./components/navbar";
import { UserDash } from "./pages/UserDashboard";



export function App(){
  return(
  <div className="min-h-screen" style={{backgroundImage:"url('bg2.jpg')", backgroundSize:"cover"}}>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/userDashboard" element={<UserDash/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  )
}