import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Landing.css';
import { FaGithub, FaInstagram, FaLinkedin, FaArrowRight, FaPlay } from 'react-icons/fa';

const roles = ['Developer', 'Traveler', 'Student', 'Photographer'];

const currents = [
    'Currently: Vibing :)',
    'Learning: Mobile photography (Instagram @pocketshuttr)',
    'Practicing: Weekly LeetCode + system design drills',
    'Travel note: Plotting the next backpacking weekend',
];

function Landing() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [typeText, setTypeText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % currents.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    // Typewriter for "I'm a ..."
    useEffect(() => {
        const fullText = roles[loopNum % roles.length];
        const delta = isDeleting ? 60 : 120;

        const timeout = setTimeout(() => {
            const updatedText = isDeleting
                ? fullText.substring(0, typeText.length - 1)
                : fullText.substring(0, typeText.length + 1);

            setTypeText(updatedText);

            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum((prev) => prev + 1);
            }
        }, delta);

        return () => clearTimeout(timeout);
    }, [typeText, isDeleting, loopNum]);

    const scrollToId = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <div className="landing" id="home" >
            <div className="landing-content">
                <div className='text-content'>
                    <div className="eyebrow">Hi, I'm</div>
                    <h1 className="hero-name">Sowad Khan</h1>
                    <div className="type-line">
                        I'm a <span className="wrap">{typeText}</span>
                    </div>
                    <div className="currently-card">
                        <span className="dot" />
                        <span>{currents[currentIdx]}</span>
                    </div>

                    <div className="cta-row">
                        <button className="cta primary" onClick={() => scrollToId('projects')}>
                            View Projects <FaArrowRight />
                        </button>
                        <button className="cta ghost" onClick={() => scrollToId('contact')}>
                            Contact Me <FaPlay />
                        </button>
                    </div>

                    <div className="socials">
                        <a href="https://github.com/SowadK25" target="_blank" rel="noopener noreferrer"><FaGithub className="social-icon github" /></a>
                        <a href="https://linkedin.com/in/sowad-khan-2645171a7/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon linkedin" /></a>
                        <a href="https://instagram.com/sowad.khan" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon instagram" /></a>
                    </div>
                </div>

                <div className='hero-visual'>
                    <div className='img-crop'>
                        <img src="/sowad.jpg" alt="Sowad Khan" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Landing;