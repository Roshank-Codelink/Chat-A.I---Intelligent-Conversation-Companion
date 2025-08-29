"use client";
import { Button, Drawer } from "@mui/material";
import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import UserDetails from "./UserDetails";
import { ThemeContext } from "../Context/ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { color } = useContext(ThemeContext);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      color === "dark" 
        ? "bg-gradient-to-r from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a0a] text-white border-b border-[#2d2d2d]" 
        : "bg-white text-[#2c3e50] border-b border-[#e5e7eb]"
    }`}>
     
      <div className="relative flex items-center px-4 py-4">
        <div className="text-xl z-10">
          <Button 
            onClick={toggleDrawer(true)}
            className={`rounded-lg transition-all duration-200 hover:scale-105 ${
              color === "dark" 
                ? "hover:bg-[#1a0a1a]/50" 
                : "hover:bg-[#f3f4f6]"
            }`}
          >
            <FaBars className={`text-[22px] transition-colors duration-200 ${
              color === "dark" 
                ? "text-[#a5b4fc] hover:text-[#818cf8]" 
                : "text-[#6366f1] hover:text-[#4f46e5]"
            }`}/>
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <UserDetails onClose={() => setOpen(false)} />
          </Drawer>
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold tracking-wider text-[#6366f1]">
          NexusFlow
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
