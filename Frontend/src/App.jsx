import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from "./pages/Home";
import { Navbar } from "./components/navbar";



export function App(){
  return(
  <div className="min-h-screen" style={{backgroundImage:"url('bg2.jpg')", backgroundSize:"cover"}}>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}