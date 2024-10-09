import React, { useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./pages/Home";
import { Navbar } from "./components/navbar";
import { UserDash } from "./pages/UserDashboard";
import { io } from "socket.io-client";
import { getSocket } from "../socket";
import ChatPage from "./pages/ChatPage";
import Sidebar from "./components/sidebar";

// Initialize socket globally
export const socket=getSocket()

export function App() {
  useEffect(() => {
    // Listen for the welcome message
    socket.on("welcome", (message) => {
      console.log(message);
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="min-h-screen flex flex-col justify-center items-center max-w-screen " style={{ backgroundImage: "url('bg2.jpg')", backgroundSize: "cover" }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDash />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default socket