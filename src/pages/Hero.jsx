import React, { useEffect } from "react";
import backgroundImage from "../assets/backgrounds/axiom-pattern.png";
import gsap from "gsap";
import SplitType from "split-type";
import "../css/Hero.css";

function Hero() {
  useEffect(() => {
    // Split text into characters
    const intro = new SplitType("#intro", { types: "chars" });
    const role = new SplitType("#role", { types: "chars" });

    // Set initial states
    gsap.set(".greeting", { opacity: 1, y: 0 });
    gsap.set(".char", { opacity: 1, y: 0 });
    gsap.set(".role-intro", { opacity: 1, y: 0 });
    gsap.set(".role-char", { opacity: 1, y: 0 });

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Animate the greeting
    tl.from(".greeting", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    // Animate the name with character stagger
    .from(".char", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3")
    // Animate the "I'm a" text
    .from(".role-intro", {
      y: 30,
      opacity: 0,
      duration: 0.5
    }, "-=0.3")
    // Animate the role with character stagger
    .from(".role-char", {
      y: 50,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Add a subtle floating animation to the entire content
    gsap.to(".hero-content", {
      y: "+=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="md:h-screen md:w-full flex flex-col justify-center items-center h-screen bg-center text-center gap-4 relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Add a subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-lightBackground/10 dark:to-background/10" />
        
        <div className="hero-content relative z-10">
          <p className="greeting text-lightText dark:text-white p-2 font-Abril text-xl">
            Hi, I'm
          </p>
          <h1
            id="intro"
            className="text-lightPrimary dark:text-primary font-bold text-xs md:text-xl font-RockSalt"
          >
            Guru Sanjay R K
          </h1>
          <p className="role-intro text-lightText dark:text-white font-Abril text-xl">
            I'm a
          </p>
          <p id="role" className="font-RockSalt text-4xl text-lightPrimary dark:text-primary font-bold">
            Full Stack Developer
          </p>
        </div>

        {/* Add a subtle scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-lightPrimary dark:text-primary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
