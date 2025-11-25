import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRecoilState } from "recoil";
import darkmode from "../Atom";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useRecoilState(darkmode);

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, [setIsDark]);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-mist/10"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <FaMoon className="w-5 h-5 text-mist hover:text-silk transition-colors duration-300" />
      ) : (
        <FaSun className="w-5 h-5 text-gold hover:text-silk transition-colors duration-300" />
      )}
    </button>
  );
};

export default DarkModeToggle;

