"use client";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const words = ["Fast setup.", "Powerful AI.", "Superior support."];
  const staticWords = ["Fast setup.", "Powerful AI."];
  const dynamicWords = ["Superior support."];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const typewriterInterval = setInterval(() => {
      if (currentCharIndex < dynamicWords[currentWordIndex].length) {
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Word complete, wait a bit then start next word
        setTimeout(() => {
          setCurrentWordIndex(prev => (prev + 1) % dynamicWords.length);
          setCurrentCharIndex(0);
        }, 1000); // Wait 1 second before next word
      }
    }, 100); // Smooth typing speed (100ms per character)

    return () => clearInterval(typewriterInterval);
  }, [isLoaded, currentWordIndex, currentCharIndex, dynamicWords]);

  const getCurrentText = () => {
    if (currentCharIndex === 0) return "";
    return dynamicWords[currentWordIndex].substring(0, currentCharIndex);
  };

  const getCurrentDynamicWord = () => {
    return dynamicWords[currentWordIndex];
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden ${montserrat.className}`}>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a1a] animate-gradient"></div>
        
        {/* Enhanced floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-1 shadow-lg shadow-purple-400/50"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float-2 shadow-lg shadow-blue-400/50"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-float-3 shadow-lg shadow-green-400/50"></div>
          <div className="absolute top-1/2 right-20 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-float-4 shadow-lg shadow-yellow-400/50"></div>
          <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-float-5 shadow-lg shadow-red-400/50"></div>
          
          {/* Additional particles */}
          <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full animate-float-6 shadow-lg shadow-white/30"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float-7 shadow-lg shadow-purple-300/30"></div>
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-cyan-300/50 rounded-full animate-float-8 shadow-lg shadow-cyan-300/30"></div>
        </div>
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ===== Header/Navbar ===== */}
        <header className={`w-full flex justify-end px-6 py-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {/* Login/Signup Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="group relative px-4 py-1.5 text-xs border border-white/30 text-white font-medium rounded-md transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg cursor-pointer backdrop-blur-sm bg-white/10 hover:border-white/50 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></span>
                  Login
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="/signup" className="hidden md:block">
              <button className="group relative px-4 py-1.5 text-xs bg-white/20 text-white font-medium rounded-md shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-110 hover:bg-white/30 cursor-pointer backdrop-blur-sm border border-white/20 hover:border-white/50 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Sign Up
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </header>

        {/* ===== Hero Section ===== */}
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            {/* Heading with typewriter effect */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#6366f1] leading-snug tracking-tight drop-shadow-lg min-h-[4rem] flex items-center justify-center">
                <span className="inline-block transition-all duration-700 delay-500 ease-out">
                  {staticWords[0]}
                </span>{" "}
                <span className="inline-block transition-all duration-700 delay-700 ease-out">
                  {staticWords[1]}
                </span>{" "}
                <span className="inline-block transition-all duration-500 ease-out">
                  {getCurrentText()}
                  <span className="animate-pulse text-[#6366f1]">|</span>
                </span>
              </h1>
              
              {/* Progress indicator - only for dynamic words */}
              <div className="flex justify-center gap-2 mt-4">
                {dynamicWords.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-700 ease-out ${
                      index === currentWordIndex 
                        ? 'bg-[#6366f1] scale-125 shadow-lg shadow-[#6366f1]/50'
                        : index < currentWordIndex 
                          ? 'bg-[#6366f1]/60'
                          : 'bg-[#6366f1]/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Subtitle with slide-in animation */}
            <p className={`mt-6 text-xs sm:text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed drop-shadow-md transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Equip your agents with powerful AI tools and workflows that boost
              efficiency and elevate customer experiences across every channel.
            </p>

            {/* Buttons with enhanced animations */}
            <div className={`flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Start Chatting */}
              <Link href="/chatbox">
                <button className="group relative px-6 py-3 text-xs md:text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white font-medium rounded-md shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-110 hover:from-purple-500/30 hover:to-pink-500/30 cursor-pointer backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                    Start Chatting
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </Link>

              {/* Learn More */}
              <button className="group relative px-6 py-3 text-xs md:text-sm border border-white/30 text-white font-medium rounded-md transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-md cursor-pointer backdrop-blur-sm bg-white/10 hover:border-white/50 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-90deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(45deg); }
        }
        
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(120deg); }
        }
        
        @keyframes float-7 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-28px) rotate(-120deg); }
        }
        
        @keyframes float-8 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(60deg); }
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-grid {
          animation: grid 20s linear infinite;
        }
        
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 9s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 5s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 10s ease-in-out infinite; }
        .animate-float-7 { animation: float-7 11s ease-in-out infinite; }
        .animate-float-8 { animation: float-8 6.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
