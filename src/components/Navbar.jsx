import React, { useState, useEffect } from "react";
import DarkModeToggle from "./DarkMode";
import logo from "../assets/logo.png";
import logoDark from "../assets/logodark.png";
import darkmode from "../Atom";
import { useRecoilState } from "recoil";
import { IoIosClose, IoIosMenu } from "react-icons/io";
function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useRecoilState(darkmode);
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offsetTop = section.offsetTop - 30;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    } else {
      console.log("Section not found");
    }
    setIsOpen(false); // Close menu after scrolling to section
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsOpen(false); // Close the mobile menu when resizing to desktop view
    }
  };

  useEffect(() => {
    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollEvent = () => {
    const sections = ["home", "About", "projects", "Experience", "contact"];
    let currentSection = "home";

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const sectionTop = element.offsetTop - 50;
        const sectionHeight = element.offsetHeight;
        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = section;
        }
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <nav className="h-55px p-4 fixed top-0 left-0 w-full z-50 bg-lightSecondary border-b-lightAccent dark:bg-secondary rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-b dark:border-primary dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-20">
      {/* Desktop Menu */}
      {!isMobile && (
        <div className="flex justify-center space-x-8">
          {["home", "About", "projects", "Experience", "contact"].map(
            (section) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  className={`transition-all duration-300 active:scale-95 text-lg font-RockSalt font-bold 
                  ${isActive ? "scale-125" : "hover:scale-125"} 
                  ${
                    isActive
                      ? "text-lightSecondary dark:text-primary"
                      : "hover:text-lightSecondary dark:hover:text-secondary dark:text-white"
                  }`}
                  onClick={() => handleScroll(section)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              );
            }
          )}
          <DarkModeToggle />
        </div>
      )}

      {/* Mobile Menu with Hamburger */}
      {isMobile && (
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <img
              src={isDark ? logo : logoDark}
              className="h-[100px] w-[100px]"
              alt=""
            />
            <DarkModeToggle />
          </div>

          {/* Hamburger icon */}
          <button
            className="text-white dark:text-white text-3xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <div className="text-black dark:text-white">
                <IoIosClose />
              </div>
            ) : (
              <div className="text-black dark:text-white">
                <IoIosMenu />
              </div>
            )}
          </button>
        </div>
      )}

      {/* Mobile menu dropdown */}
      {isMobile && (
        <div
          className={`transition-all duration-1000 overflow-hidden ${
            isOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col mt-4 space-y-4">
            {["home", "About", "projects", "Experience", "contact"].map(
              (section) => {
                const isActive = activeSection === section;
                return (
                  <>
                    <button
                      key={section}
                      className={`transition-all duration-300 active:scale-95 text-lg font-RockSalt font-bold 
                    ${isActive ? "scale-125" : "hover:scale-125"} 
                    ${
                      isActive
                        ? "text-lightSecondary dark:text-secondary"
                        : "hover:text-lightSecondary dark:hover:text-secondary dark:text-white"
                    }`}
                      onClick={() => handleScroll(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </>
                );
              }
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
