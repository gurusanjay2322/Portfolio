import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRecoilState } from "recoil";
import darkmode from "../Atom";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkmode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const newTheme = !darkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Save theme preference
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12  rounded-full p-2 transition-colors duration-500 ease-in-out"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <FaSun
        className="w-6 h-6 text-[#FEFF9F] transform transition-transform duration-500 ease-in-out rotate-0"
        />
      ) : (
          <FaMoon
            className="w-6 h-6 text-[#393E46] transform transition-transform duration-500 ease-in-out rotate-180"
          />
      )}
    </button>
  );
};

export default DarkModeToggle;
