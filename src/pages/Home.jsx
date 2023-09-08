import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import bg from "../assets/black.jpg"
function Home() {
  const [typeEffect] = useTypewriter({
    words: [" Developer", " Designer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  return (
    <div className='flex flex-col justify-center items-center h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 ' >
      <h1 className='text-white font-bold text-5xl mb-4'>
        Hi I am Guru Sanjay
      </h1>
      <div className='text-green-500 text-3xl mb-4 font'>
        {typeEffect}
      <Cursor />  
      </div>
    </div>
  );
}

export default Home;
