import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Projects.css';

const projects = [
    {
        title: 'Fork It',
        description: 'A collaborative app that helps groups of friends decide where to eat.',
        image: '/forkit.png',
        link: 'https://github.com/SowadK25/Fork-It',
        techStack: ['Android', 'Kotlin', 'Node.js', 'Firebase', "GCP"]
    },
    {
        title: 'Univibe',
        description: 'A mobile app to help students share and discover interesting places around campus.',
        image: '/UnivibeLogo.png',
        link: 'https://github.com/SowadK25/Univibe',
        techStack: ['Android', 'Kotlin', 'Firebase', "GCP"]
    },
    {
        title: 'WlP4 Compiler',
        description: 'A programming language that is a subset of C++, compiled into MIPS assembly code. Another language for you to learn :)',
        image: '/code.gif',
        link: 'https://github.com/SowadK25/WLP4-Lang-Compiler',
        techStack: ['C++', 'MIPS', 'LR(1) Parser']
    },
    {
        title: 'YelpCamp',
        description: 'A social platform for sharing and reviewing campsites, where users can post their favorite campgrounds and explore more on an interactive geolocation map.',
        image: '/yelpcamp.png',
        link: 'https://github.com/SowadK25/YelpCamp',
        techStack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Passport.js']
    },
    {
        title: 'Tales of Nuiryn',
        description: 'A 3D action-adventure RPG game developed using Unity, featuring exploration, combat, and puzzle-solving in a fantasy world.',
        image: '/Nuiryn.jpg',
        link: 'https://github.com/CloseZad/GameJam2020-WON-AWARD-',
        techStack: ['C#', 'Unity', 'Blender',]
    },
];

const Projects = () => {
    return (
        <section className="projects-section" id='projects'>
            <h2 className="section-title" data-swiper-parallax="-100">
                Projects
            </h2>
            <Swiper
                modules={[Parallax, Pagination, Navigation]}
                slidesPerView={2}
                breakpoints={{
                    1024: {
                        slidesPerView: 1.9,
                    },
                    768: {
                        slidesPerView: 1.8,
                    },
                    450: {
                        slidesPerView: 1.7,
                    },
                    0: {
                        slidesPerView: 1.4,
                    },
                }}
                centeredSlides={true}
                initialSlide={1}
                grabCursor={true}
                parallax={true}
                pagination={{ clickable: true }}
                speed={600}
                watchSlidesProgress={true}
                className="project-swiper"
            >
                {projects.map((project, index) => (
                    <SwiperSlide key={index}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <div className="project-card">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="card-bg"
                                />
                                <div className="card-content">
                                    <h3 className="project-title" data-swiper-parallax="-100">
                                        {project.title}
                                    </h3>
                                    <p className="project-description" data-swiper-parallax="-100">
                                        {project.description}
                                    </p>
                                    <div
                                        className="tech-stack"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        data-swiper-parallax="-100"
                                    >
                                        {project.techStack.map((tech, index) => (
                                            <span key={index} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Projects;
