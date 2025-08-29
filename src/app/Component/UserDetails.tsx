"use client";
import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import { LuMessageSquareMore } from "react-icons/lu";
import Image from "next/image";
import { ThemeContext } from "../Context/ThemeContext";
import { RxCross2 } from "react-icons/rx";

interface props{
  onClose?:()=> void;
}

function UserDetails({onClose}:props) {
  const { color, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col w-full h-screen ${color === "dark" ? "bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a1a] text-white" : "bg-white text-[#2c3e50]"}`}>
<div className="flex justify-end px-[15px] py-[10px] md:hidden">
  <RxCross2
          className="text-[#6366f1] size-[18px] cursor-pointer hover:text-[#4f46e5]"
    onClick={onClose}
  />
</div>
      
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl sm:text-2xl font-bold tracking-wide text-[#6366f1]">NexusFlow</h4>
          <button onClick={toggleTheme} className={`p-2 rounded-lg ${color === "dark" ? "bg-[#1a0a1a]/50 backdrop-blur-sm hover:bg-[#2a0a2a]/50" : "bg-[#e5e7eb] hover:bg-[#d1d5db]"} transition-colors duration-200`} aria-label="Toggle theme">
            {color === "dark" ? (
              <BsMoonStarsFill size={18} className="text-[#a5b4fc] cursor-pointer" />
            ) : (
              <BsSun size={18} className="text-[#6366f1] cursor-pointer" />
            )}
          </button>
        </div>
        
        <div className="relative mb-4">
          <input type="text" placeholder="Search workflows..." className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 ${color === "dark"? "bg-[#1a0a1a]/50 backdrop-blur-sm text-white border-[#2d2d2d] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20": "bg-white text-[#374151] border-[#d1d5db] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 shadow-sm"}`}/>
          <CiSearch className={`absolute top-1/2 left-3 transform -translate-y-1/2 text-lg ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}/>
        </div>
        
        <div className="mb-4">
          <button className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-3 px-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Workflow
          </button>
        </div>
        
        <hr className={`my-3 ${color === "dark" ? "border-[#2d2d2d]" : "border-[#e5e7eb]"}`} />
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-[#6b7280]">Recent Workflows</h3>
          <p className="text-xs text-[#6366f1] cursor-pointer hover:text-[#4f46e5] font-medium">Clear All</p>
        </div>
        <hr className={`${color === "dark" ? "border-[#2d2d2d]" : "border-[#e5e7eb]"}`} />
      </div>
      
      <div className="flex-1 px-4 pb-4 overflow-y-auto scrollbar-hidden">
        <ul className="space-y-2 mt-3">
          <li className={`flex items-start space-x-3 text-sm px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${color === "dark"? "text-[#d1d5db] hover:bg-[#1a0a1a]/50 hover:text-white": "text-[#374151] hover:bg-white hover:text-[#6366f1] hover:shadow-sm"} border border-transparent hover:border-[#e5e7eb]`}>
            <div className="w-2 h-2 bg-[#10b981] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-medium">Data Processing Pipeline</p>
              <p className={`text-xs mt-1 ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Last run: 2 hours ago</p>
            </div>
            </li>
          
          <li className={`flex items-start space-x-3 text-sm px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${color === "dark"? "text-[#d1d5db] hover:bg-[#1a0a1a]/50 hover:text-white": "text-[#374151] hover:bg-white hover:text-[#6366f1] hover:shadow-sm"} border border-transparent hover:border-[#e5e7eb]`}>
            <div className="w-2 h-2 bg-[#f59e0b] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-medium">Email Automation</p>
              <p className={`text-xs mt-1 ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Last run: 1 day ago</p>
            </div>
            </li>
          
          <li className={`flex items-start space-x-3 text-sm px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${color === "dark"? "text-[#d1d5db] hover:bg-[#1a0a1a]/50 hover:text-white": "text-[#374151] hover:bg-white hover:text-[#6366f1] hover:shadow-sm"} border border-transparent hover:border-[#e5e7eb]`}>
            <div className="w-2 h-2 bg-[#ef4444] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-medium">API Integration</p>
              <p className={`text-xs mt-1 ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Last run: 3 days ago</p>
            </div>
            </li>
          
          <li className={`flex items-start space-x-3 text-sm px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${color === "dark"? "text-[#d1d5db] hover:bg-[#1a0a1a]/50 hover:text-white": "text-[#374151] hover:bg-white hover:text-[#6366f1] hover:shadow-sm"} border border-transparent hover:border-[#e5e7eb]`}>
            <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-medium">File Sync Workflow</p>
              <p className={`text-xs mt-1 ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Last run: 1 week ago</p>
            </div>
            </li>
          
          <li className={`flex items-start space-x-3 text-sm px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${color === "dark"? "text-[#d1d5db] hover:bg-[#1a0a1a]/50 hover:text-white": "text-[#374151] hover:bg-white hover:text-[#6366f1] hover:shadow-sm"} border border-transparent hover:border-[#e5e7eb]`}>
            <div className="w-2 h-2 bg-[#06b6d4] rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-medium">Database Backup</p>
              <p className={`text-xs mt-1 ${color === "dark" ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>Last run: 2 weeks ago</p>
            </div>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;