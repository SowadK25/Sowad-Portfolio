import { FaRegEnvelope, FaRegAddressCard, FaRegUser, FaLaptop } from 'react-icons/fa';
import { RiRobot2Fill } from 'react-icons/ri';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <a href="#about">
                        <FaRegUser className="nav-icon" />
                        ABOUT
                    </a>
                </li>
                <li>
                    <a href="#projects">
                        <FaLaptop className="nav-icon" />
                        PROJECTS
                    </a>
                </li>
                <li>
                    <a href="#chatbot">
                        <RiRobot2Fill className="nav-icon" />
                        CHAT
                    </a>
                </li>
                <li>
                    <a href="#contact">
                        <FaRegAddressCard className="nav-icon" />
                        CONTACT
                    </a>
                </li>
                <li>
                    <a href="https://drive.google.com/file/d/1iqt7_2PjUjcxuG3zPt8-V04QslIkyPD3/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <FaRegEnvelope className="nav-icon" />
                        RÉSUMÉ
                    </a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;