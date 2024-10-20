import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/Home";
import { Navbar } from "./components/navbar";
import { UserDash } from "./pages/UserDashboard";
import { io } from "socket.io-client";
import { getSocket } from "../socket";
import ChatPage from "./pages/ChatPage";
import Sidebar from "./components/sidebar";
import ProjectList from "./components/projectList";
import ProjectInfo from "./components/projectInfo";
export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center max-w-screen " style={{ backgroundImage: "url('bg2.jpg')", backgroundSize: "cover" }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDash />} />
          <Route path="/chats" element={<ChatPage />} />
          <Route path="/projects" element={<ProjectList/>}/>
          <Route path="/projectInfo/:id" element={<ProjectInfo/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}