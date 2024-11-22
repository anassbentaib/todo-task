"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setIsDarkMode(savedTheme === "true");
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, isMounted]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
