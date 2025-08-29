"use client"
import { createContext, ReactNode, useState } from "react";

interface ThemeContextType {
  color: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  color: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [color, setColor] = useState<string>("dark");

  const toggleTheme = () => {
    setColor((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ color, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
