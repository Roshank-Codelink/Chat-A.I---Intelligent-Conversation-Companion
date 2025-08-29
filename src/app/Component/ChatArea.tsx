"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSend, FiImage, FiMic } from "react-icons/fi";
import { ThemeContext } from "../Context/ThemeContext";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
// @ts-ignore
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import TextareaAutosize from 'react-textarea-autosize'

function ChatArea() {
 const { color } = useContext(ThemeContext);
  const [Images, setimage] = useState<any>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const recorderControls = useVoiceVisualizer();
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]); 
  const previousTranscriptRef = useRef("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null); 
  
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value);
  };

  const startListening = () => {
      resetTranscript();
    previousTranscriptRef.current = "";
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    recorderControls.startRecording();
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    recorderControls.stopRecording();
  };

  const handleSend = () => {
    if (!text.trim() && !imagePreview) return;
    setText("");
    setImagePreview(null);
    resetTranscript();
    previousTranscriptRef.current = "";
    stopListening();
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setimage(url);
    }
  };

  useEffect(() => {
    if (isListening && transcript) {
      const prev = previousTranscriptRef.current;
      if (transcript.length > prev.length) {
        const newPart = transcript.slice(prev.length).trim();
        if (newPart) {
          setText((prevText) => (prevText + " " + newPart).trim());
          previousTranscriptRef.current = transcript;
        }
      }
    }

    // Auto-scroll text area when text changes
    if (textAreaRef.current) {
      textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
    }
  }, [transcript, isListening, text]);

  return (
    <div className={`flex flex-col h-screen  ${color === "dark" ? "bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a1a] text-white" : "bg-white text-black"}`}>
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hidden w-full lg:w-[80%] xl:w-[70%] lg:m-auto pb-[80px]">
        {/* Welcome Message - ChatGPT Style - Only show when no chat */}
        {chatMessages.length === 0 && (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center max-w-2xl mx-auto space-y-6">
              {/* AI Avatar */}
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full  flex items-center justify-center ${color === "dark" ? "bg-[#6366f1]/20 border border-[#6366f1]/30" : "bg-[#6366f1]/10 border border-[#6366f1]/20"}`}>
                  <svg className="w-8 h-8 text-[#6366f1]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              
              {/* Welcome Text */}
              <div className="space-y-4">
                <h1 className={`text-3xl font-bold ${color === "dark" ? "text-white" : "text-gray-900"}`}>
                  How can I help you today?
                </h1>
                <p className={`text-lg ${color === "dark" ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                  I'm here to assist you with any questions, tasks, or creative projects. 
                  Feel free to ask me anything!
                </p>
              </div>
              
              {/* Quick Suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                <button className={`p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 cursor-pointer ${color === "dark" ? "bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#6366f1]/50" : "bg-gray-50 border border-gray-200 hover:border-[#6366f1]/30"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${color === "dark" ? "text-white" : "text-gray-900"}`}>Creative Writing</p>
                      <p className={`text-sm ${color === "dark" ? "text-gray-400" : "text-gray-500"}`}>Help with stories, poems, or content</p>
                    </div>
                  </div>
                </button>
                
                <button className={`p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 cursor-pointer ${color === "dark" ? "bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#6366f1]/50" : "bg-gray-50 border border-gray-200 hover:border-[#6366f1]/30"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${color === "dark" ? "text-white" : "text-gray-900"}`}>Problem Solving</p>
                      <p className={`text-sm ${color === "dark" ? "text-gray-400" : "text-gray-500"}`}>Get help with complex issues</p>
                    </div>
                  </div>
                </button>
                
                <button className={`p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 cursor-pointer ${color === "dark" ? "bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#6366f1]/50" : "bg-gray-50 border border-gray-200 hover:border-[#6366f1]/30"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${color === "dark" ? "text-white" : "text-gray-900"}`}>Learning</p>
                      <p className={`text-sm ${color === "dark" ? "text-gray-400" : "text-gray-500"}`}>Explore new topics together</p>
                    </div>
                  </div>
                </button>
                
                <button className={`p-4 rounded-xl text-left transition-all duration-200 hover:scale-105 cursor-pointer ${color === "dark" ? "bg-[#1a1a1a] border border-[#2d2d2d] hover:border-[#6366f1]/50" : "bg-gray-50 border border-gray-200 hover:border-[#6366f1]/30"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${color === "dark" ? "text-white" : "text-gray-900"}`}>Conversation</p>
                      <p className={`text-sm ${color === "dark" ? "text-gray-400" : "text-gray-500"}`}>Just chat and have fun</p>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Start Chatting Text */}
              <p className={`text-sm ${color === "dark" ? "text-gray-500" : "text-gray-400"} mt-6`}>
                Start typing below or use voice input to begin our conversation
              </p>
            </div>
          </div>
        )}

        {/* Chat Messages - Only show when there are messages */}
        {chatMessages.length > 0 && (
          <>
            {/* User Message */}
            <div className="flex justify-end mb-6">
              <div className="flex items-end gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[60%]">
                <div className="text-xs text-gray-500 mb-1">2:30 PM</div>
                <div className="px-4 py-3 rounded-2xl rounded-br-none shadow-sm text-sm leading-relaxed bg-[#6366f1] text-white relative group">
                  <p>I need help setting up a workflow automation for data processing. Can you guide me through creating nodes for API integration, data transformation, and file output?</p>
                  
                  {/* Message Actions */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-sm font-medium">
                  U
                </div>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex justify-start mb-6">
              <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[60%]">
                {/* AI Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                
                <div className={`px-4 py-3 rounded-2xl rounded-bl-none shadow-sm text-sm leading-relaxed ${color === "dark"? "bg-[#1a1a1a] text-white border border-[#2d2d2d]": "bg-white text-[#374151] border border-[#e5e7eb]"} relative group`}>
                  <p className="mb-3">
                    I'll help you create a comprehensive workflow automation! Let's break this down into steps:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                      <span className="text-sm">HTTP Request node for API integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f59e0b] rounded-full"></div>
                      <span className="text-sm">Function node for data transformation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#8b5cf6] rounded-full"></div>
                      <span className="text-sm">Write Binary File node for output</span>
                    </div>
                  </div>
                  
                  {/* Message Actions */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a9 9 0 104.967-2.684 9 9 0 00-4.967 2.684z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">2:31 PM</div>
              </div>
            </div>
            
            {/* User Message */}
            <div className="flex justify-end mb-6">
              <div className="flex items-end gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[60%]">
                <div className="text-xs text-gray-500 mb-1">2:32 PM</div>
                <div className="px-4 py-3 rounded-2xl rounded-br-none shadow-sm text-sm leading-relaxed bg-[#6366f1] text-white relative group">
                  <p>That sounds perfect! How do I configure the HTTP Request node to handle authentication and rate limiting?</p>
                  
                  {/* Message Actions */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center text-white text-sm font-medium">
                  U
                </div>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex justify-start mb-6">
              <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[60%]">
                {/* AI Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                
                <div className={`px-4 py-3 rounded-2xl rounded-bl-none shadow-sm text-sm leading-relaxed ${color === "dark"? "bg-[#1a1a1a] text-white border border-[#2d2d2d]": "bg-white text-[#374151] border border-[#e5e7eb]"} relative group`}>
                  <p className="mb-3">
                    Great question! For the HTTP Request node configuration:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className={`${color==='dark'?'bg-black dark:bg-[#2d2d2d] p-3 rounded-lg': 'bg-[#f3f4f6] dark:bg-[#2d2d2d] p-3 rounded-lg'}`}>
                      <p className="font-medium text-[#6366f1] mb-2">Authentication:</p>
                      <p>• Bearer Token: Add in Headers section</p>
                      <p>• API Key: Use Authorization header</p>
                    </div>
                    <div className={`${color==='dark'?'bg-black dark:bg-[#2d2d2d] p-3 rounded-lg': 'bg-[#f3f4f6] dark:bg-[#2d2d2d] p-3 rounded-lg'}`}>
                      <p className="font-medium text-[#6366f1] mb-2">Rate Limiting:</p>
                      <p>• Set "Request Delay" to 1000ms</p>
                      <p>• Use "Split In Batches" for large datasets</p>
                    </div>
                  </div>
                  
                  {/* Message Actions */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a9 9 0 104.967-2.684 9 9 0 00-4.967 2.684z" />
                      </svg>
                    </button>
                    <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">2:33 PM</div>
              </div>
            </div>
            
            {/* Typing Indicator */}
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[60%]">
                {/* AI Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                
                <div className={`px-4 py-3 rounded-2xl rounded-bl-none shadow-sm ${color === "dark"? "bg-[#1a1a1a] border border-[#2d2d2d]": "bg-white border border-[#e5e7eb]"}`}>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-sm text-gray-500 ml-2">AI is typing...</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

           <div className={`sticky bottom-0 w-full px-2 py-2 ${color === "dark" ? " backdrop-blur-sm" : "bg-white"}`}>
        {Images && (
          <div className="w-full px-2 mb-2">
            <div className="w-full max-w-[98%] sm:max-w-[90%] md:max-w-[90%] lg:max-w-[90%] xl:max-w-[60%] mx-auto flex justify-start relative">
              <div
                className={`rounded-2xl rounded-bl-none p-2 shadow max-w-[70%] relative ${color === "dark" ? "bg-[#1a1a1a]/80 backdrop-blur-sm" : "bg-white"}`}
              >
                <Image
                  src={Images}
                  alt="preview"
                  className="rounded-xl max-h-60 object-cover"
                  width={80}
                  height={30}
                />
                <button
                  onClick={() => setimage(null)}
                  className="absolute top-1 right-1 bg-white dark:bg-[#444] p-[2px] rounded-full shadow"
                >
                  <RxCross1 className="text-black dark:text-white text-xs cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`w-full max-w-[98%] sm:max-w-[95%] md:max-w-[90%] lg:max-w-[700px] xl:max-w-[900px] 2xl:max-w-[1000px] mx-auto flex items-center gap-1 sm:gap-3 px-3 sm:px-4 py-2 rounded-full shadow border ${color === "dark" ? "border-gray-600 bg-[#333446]" : "border-gray-300 bg-white"} relative`}>
          {isListening ? (
            <button
              onClick={stopListening}
              aria-label="Stop listening"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="button"
            >
              <RxCross1 className="text-red-500 dark:text-white w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={startListening}
              aria-label="Start listening"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2d2d2d] cursor-pointer flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="button"
            >
              <FiMic className="text-gray-500 dark:text-white w-6 h-6" />
            </button>
          )}

          <TextareaAutosize
            ref={textAreaRef} 
            minRows={1}
            maxRows={3}
            placeholder="Type a message..."
            value={text}
            onChange={handleChange}
            aria-multiline="true"
            className={`flex-grow scrollbar-hidden resize-none bg-transparent focus:outline-none text-sm sm:text-base placeholder:text-gray-400 dark:placeholder:text-gray-400 ${color === "dark" ? "text-gray-200" : "text-gray-800"} max-h-40 overflow-y-auto transition-colors duration-200`}
          />

                     {isListening && (
             <div className="flex flex-shrink-0 ml-2">
               <VoiceVisualizer
                 controls={recorderControls}
                 onlyRecording={true}
                 mainBarColor={"purple"}
                 isDefaultUIShown={false}
                 isControlPanelShown={false}
                 isProgressIndicatorTimeShown={false}
                 barWidth={4}
                 gap={0.90}
                 width={120}
                 height={30}
               />
             </div>
           )}

          <label
            htmlFor="image-upload"
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer flex-shrink-0 ml-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <FiImage className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-white" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
          />

                     <button
             onClick={handleSend}
             aria-label="Send message"
             className="p-2 sm:p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition cursor-pointer flex-shrink-0 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             type="button"
           >
            <FiSend className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChatArea;

