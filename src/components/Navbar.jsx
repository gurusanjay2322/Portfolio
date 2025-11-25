import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkMode";
import { useRecoilState } from "recoil";
import darkmode from "../Atom";
import { IoIosClose, IoIosMenu, IoMdMusicalNote, IoMdVolumeOff } from "react-icons/io";
import gsap from "gsap";
import mossGrotto from "../assets/mossgrotto.mp3";
import hornetNeedle from "../assets/hornetneedle.gif";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark] = useRecoilState(darkmode);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(mossGrotto);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Attempt auto-play
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsMusicPlaying(true);
      }).catch(error => {
        console.log("Auto-play prevented:", error);
        setIsMusicPlaying(false);
      });
    }

    // Listen for manual start from Loading Screen
    const handleStartMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(e => console.error("Play failed:", e));
      }
    };
    window.addEventListener("startMusic", handleStartMusic);

    return () => {
      window.removeEventListener("startMusic", handleStartMusic);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  const handleScroll = (id) => {
    if (window.lenis) {
      window.lenis.scrollTo(`#${id}`, { duration: 1.5 });
    } else {
      const section = document.getElementById(id);
      if (section) {
        const offsetTop = section.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smart Scroll Logic
  useEffect(() => {
    const handleSmartScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;
      
      if (!nav) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling Down -> Hide
        gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.out" });
      } else {
        // Scrolling Up -> Show
        gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
      }

      lastScrollY.current = currentScrollY;

      // Update Active Section
      const sections = ["contact", "Experience", "projects", "About", "home"]; // Check in reverse order
      let currentSection = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is within the viewport (or close to top)
          // Or if we are near the bottom of the page and this is the last section
          if (rect.top <= 300 && rect.bottom >= 300) {
            currentSection = section;
            break; // Found the active section, stop checking
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleSmartScroll);
    return () => window.removeEventListener("scroll", handleSmartScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Start" },
    { id: "About", label: "Lore" },
    { id: "projects", label: "Quests" },
    { id: "Experience", label: "Abilities" },
    { id: "contact", label: "Sanctum" },
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 px-8 py-6 transition-transform duration-300">
      {/* Desktop Menu */}
      {!isMobile && (
        <div className="flex justify-center items-center">
          <div className="flex space-x-12 bg-white/80 dark:bg-void/80 backdrop-blur-md px-12 py-3 rounded-full border border-gold/20 shadow-[0_0_15px_rgba(248,181,0,0.1)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  className={`relative group text-sm tracking-[0.2em] uppercase font-serif transition-all duration-300
                  ${isActive ? "text-silk" : "text-gray-600 dark:text-mist hover:text-gold"}`}
                  onClick={() => handleScroll(item.id)}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-1/2 w-0 h-[1px] bg-silk transition-all duration-300 transform -translate-x-1/2 group-hover:w-full ${isActive ? "w-full" : ""}`} />
                </button>
              );
            })}
            <div className="border-l border-mist/20 pl-6 flex items-center gap-4">
              <button 
                onClick={toggleMusic}
                className="relative w-12 h-12 flex items-center justify-center rounded-full text-gray-600 dark:text-mist hover:text-silk hover:bg-silk/10 hover:shadow-[0_0_15px_rgba(237,33,58,0.3)] transition-all duration-300"
                title={isMusicPlaying ? "Pause Music" : "Play Music"}
              >
                {isMusicPlaying ? (
                  <img src={hornetNeedle} alt="Playing" className="w-12 h-12 object-contain" />
                ) : (
                  <IoMdVolumeOff className="opacity-50 text-xl" />
                )}
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="flex justify-between items-center bg-white/90 dark:bg-void/90 backdrop-blur-md p-4 rounded-b-2xl border-b border-gold/20">
          <span className="font-serif text-gold tracking-widest">JOURNEY</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMusic}
              className="relative w-12 h-12 flex items-center justify-center rounded-full text-gray-600 dark:text-mist hover:text-silk hover:bg-silk/10 hover:shadow-[0_0_15px_rgba(237,33,58,0.3)] transition-all duration-300"
            >
              {isMusicPlaying ? (
                <img src={hornetNeedle} alt="Playing" className="w-12 h-12 object-contain" />
              ) : (
                <IoMdVolumeOff className="opacity-50 text-xl" />
              )}
            </button>
            <DarkModeToggle />
            <button
              className="text-gray-600 dark:text-mist hover:text-silk transition-colors text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoIosClose /> : <IoIosMenu />}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <div
          className={`absolute top-full left-0 w-full bg-white/95 dark:bg-void/95 backdrop-blur-xl border-b border-gold/20 transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center py-8 space-y-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  className={`text-lg tracking-[0.3em] uppercase font-serif transition-all duration-300
                  ${isActive ? "text-silk scale-110" : "text-gray-600 dark:text-mist hover:text-gold"}`}
                  onClick={() => handleScroll(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
