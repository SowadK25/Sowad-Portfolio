import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ChatBot from './components/ChatBot'

function App() {
  const [isBlurred, setIsBlurred] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the threshold to fit your landing section's height
      const threshold = window.innerHeight * 0.3;
      setIsBlurred(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsBlurred]);

  return (
    <>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/portfolio_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`overlay ${isBlurred ? "blurred" : ""}`} />
      <div className="content">
        <Navbar />
        <Landing />
        <Timeline />
        <Projects />
        <ChatBot />
        <Contact />
      </div>
    </>
  )
}

export default App
