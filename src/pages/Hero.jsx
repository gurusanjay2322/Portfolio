import React from "react";
import backgroundImage from '../assets/backgrounds/axiom-pattern.png';
function Hero() {

  return (
    <section id="home">
      <div className="md:h-screen md:w-full flex flex-col justify-center items-center h-screen  bg-center  text-center gap-4" style={{backgroundImage: `url(${backgroundImage})`}}>
        <p className="text-lightText dark:text-white p-2 font-Abril text-xl">Hi, I'm</p>
        <p className="text-lightPrimary dark:text-primary font-bold text-3xl md:text-7xl italic font-RockSalt">Guru Sanjay R K</p>
        <p className="text-lightText dark:text-white font-Abril text-xl">I'm a</p>
        <p className="font-RockSalt text-4xl text-lightPrimary dark:text-primary font-bold">Full Stack Developer</p>
      </div>
    </section>
  );
}

export default Hero;
