import React from "react";
import photo from '../assets/me.jpg';
import backgroundImage from '../assets/backgrounds/pattern2.png';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import {ScrollTrigger} from 'gsap/all'
import '../css/About.css';
function About() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(()=>{
    const about = new SplitType("#aboutText", {types: "chars"});
    const timeline = gsap.timeline({
      scrollTrigger: {trigger: "#About",
        start: "top center",
        end: "bottom center",
      }
    });
    // timeline.from("#tag", { opacity: 0, duration: 2, delay: 1.5 });

    timeline.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.1,
      duration: 0.1,
    });
  })
  return (
    <section id="About">
      <div className="min-h-screen flex  justify-center items-center bg-center" style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-[35%] items-center">
            <img src={photo} alt="My Photo" className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] mx-auto rounded-md mb-4 " />
          </div>
          <div className="md:w-[65%] ">
            <p id="aboutText" className="text-lightPrimary dark:text-primary font-bold font-RockSalt text-2xl md:text-5xl mx-auto w-[85%] mb-4">
              About Myself
            </p>
            <p className="text-left text-lightText dark:text-text md:text-2xl font-Ubuntu w-[85%] mx-auto">
              I am a passionate developer with a keen interest in creating
              user-centric web applications. I love working with the latest
              technologies and strive to build clean, efficient, and intuitive
              interfaces. My expertise spans various domains, including front-end
              development, web design, and problem-solving. With a focus on
              delivering seamless user experiences, I'm always eager to learn new
              skills and take on exciting challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
