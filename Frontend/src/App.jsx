import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from "./pages/Home";
import { Navbar } from "./components/navbar";



export function App(){
  return(
  <>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  </>
  )
}