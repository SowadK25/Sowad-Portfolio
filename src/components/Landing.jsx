import React from 'react';
import { useEffect, useState } from 'react';
import { TextRotate } from '../scripts/textRotate';
import '../styles/Landing.css';
import { FaG, FaI } from 'react-icons/fa6';
import { FaGithub, FaInstagram, FaLink, FaLinkedin } from 'react-icons/fa';

const roles = [" Developer", " Designer", " Student", " Explorer"];

function Landing() {
    const [text, setText] = useState("");
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = roles[loopNum % roles.length];

        let delta = isDeleting ? 80 : 160;

        const timeout = setTimeout(() => {
            let updatedText = isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1);

            setText(updatedText);

            // If word is fully typed
            if (!isDeleting && updatedText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            }

            // If word is fully deleted
            else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setLoopNum((prev) => prev + 1);
            }
        }, delta);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, loopNum]);

    return (
        <div className="landing">
            <div className="landing-content">
                <div className='text-content'>
                    <h1>Sowad Khan</h1>
                    <div class="text-animation">
                        I'm a
                        <span className="txt-rotate">
                            <span className="wrap">{text}</span>
                        </span>
                    </div>
                    <div className="socials">
                        <a href="https://github.com/SowadK25" target="_blank" rel="noopener noreferrer"><FaGithub className="social-icon github" /></a>
                        <a href="https://linkedin.com/in/sowad-khan-2645171a7/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon linkedin" /></a>
                        <a href="https://instagram.com/sowad.khan" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon instagram" /></a>
                    </div>
                </div>
                <div className='img-crop'>
                    <img src="/sowad.jpg" alt="Sowad Khan" />
                </div>
            </div>
        </div>
    );
}
export default Landing;