import React from "react";
import "../styles/Contact.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const contacts = [
    {
        icon: <FaEnvelope />,
        label: "Email",
        value: "sowadkhan912@gmail.com",
        link: "mailto:sowadkhan912@gmail.com",
    },
    {
        icon: <FaLinkedin />,
        label: "LinkedIn",
        value: "/sowad-khan912",
        link: "https://www.linkedin.com/in/sowad-khan-2645171a7/",
    },
    {
        icon: <FaGithub />,
        label: "GitHub",
        value: "@SowadK25",
        link: "https://github.com/SowadK25",
    },
    {
        icon: <FaInstagram />,
        label: "Instagram",
        value: "@sowad.khan",
        link: "https://www.instagram.com/sowad.khan/",
    },
];

const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            <h2 className="contact-title">Let's Connect</h2>
            <p className="contact-description">
                I'm always open to new opportunities and collaborations. Feel free to reach out through any of the platforms below!
            </p>
            <div className="contact-cards">
                {contacts.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-card"
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="info">
                            <h3>{item.label}</h3>
                            <p>{item.value}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;
