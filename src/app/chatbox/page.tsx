"use client";
import { useContext } from "react";
import ChatArea from "../Component/ChatArea";
import UserDetails from "../Component/UserDetails";
import { ThemeContext } from "../Context/ThemeContext";
import Navbar from "../Component/Navbar";

function Chatbox() {
  const { color } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col md:flex-row w-full h-screen overflow-hidden ${color === "dark" ? "bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a1a] text-white" : "bg-[#f8f9fa] text-[#2c3e50]"}`}>
      <div className={`hidden md:block md:w-[320px] lg:w-[350px] xl:w-[300px] border-r ${color === "dark" ? "bg-[#1a0a1a]/80 backdrop-blur-sm text-white border-[#2d2d2d]" : "bg-white text-[#2c3e50] border-[#e5e7eb]"}`}>
        <div className="sticky top-0 h-screen overflow-y-auto scrollbar-hidden">
          <UserDetails />
        </div>
      </div>

      <div className="flex-1 h-full w-full flex flex-col overflow-hidden">
        <div className="md:hidden sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
