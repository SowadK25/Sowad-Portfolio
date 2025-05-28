import "../styles/Timeline.css";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import IconImage from "./IconImage";
import { FaStar } from "react-icons/fa";

function Timeline() {
    return (
        <div className="timeline" id="about">
            <h2 className="experience">Experience</h2>
            <VerticalTimeline>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="September 2020"
                    contentStyle={{
                        borderTop: '4px solid gold',
                        borderRight: '4px solid gold',
                        background: '#fff',
                        color: '#000'
                    }}
                    contentArrowStyle={{ borderRight: '12px solid gold' }}
                    iconStyle={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, boxShadow: '0 0 0 4px gold' }}
                    icon={<a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer"><IconImage src="/uw.jpg" alt="UW" className="timeline-icon" /></a>}
                >
                    <h3 className="vertical-timeline-element-title">Started University!</h3>
                    <h4 className="vertical-timeline-element-subtitle">University of Waterloo</h4>
                    <p>
                        Started my Computer Science degree at the University of Waterloo in the middle of the Covid pandemic 😓.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="May 2021, May 2022"
                    contentStyle={{
                        borderTop: '4px solid darkblue',
                        borderLeft: '4px solid darkblue',
                        background: '#fff',
                        color: '#000'
                    }}
                    contentArrowStyle={{ borderRight: '12px solid darkblue' }}
                    iconStyle={{ background: '#f9c74f', color: '#fff' }}
                    icon={<a href="https://www.ford.ca/" target="_blank" rel="noopener noreferrer"><IconImage src="/ford.png" alt="Ford" className="timeline-icon" /></a>}
                >
                    <h3 className="vertical-timeline-element-title">Test Automation Developer Intern</h3>
                    <h4 className="vertical-timeline-element-subtitle">Ford Motor Company</h4>
                    <p>
                        My first internship was at Ford! I worked on the SYNC4 infotainment system, where I developed test automation frameworks for different ECU's.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="September 2023"
                    contentStyle={{
                        borderTop: '4px solid #53ba46',
                        borderRight: '4px solid #53ba46',
                        background: '#fff',
                        color: '#000'
                    }}
                    contentArrowStyle={{ borderRight: '12px solid #53ba46' }}
                    iconStyle={{ background: '#53ba46', color: '#fff', boxShadow: '0 0 0 4px green' }}
                    icon={<a href="https://www.td.com/ca/en/personal-banking" target="_blank" rel="noopener noreferrer"><IconImage src="/td.png" alt="TD" className="timeline-icon" /></a>}
                >
                    <h3 className="vertical-timeline-element-title">Mobile Software Engineer Intern</h3>
                    <h4 className="vertical-timeline-element-subtitle">TD Bank</h4>
                    <p>
                        Next, I worked 2 terms at TD Bank as a Mobile Software Engineer Intern. I worked on the Android TD app, where I primarily focused on payment systems like global transfers and CRA direct deposits.
                    </p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="January 2024"
                    contentStyle={{
                        borderTop: '4px solid #21325e',
                        borderLeft: '4px solid #21325e',
                        background: '#fff',
                        color: '#000'
                    }}
                    contentArrowStyle={{ borderRight: '12px solid #21325e' }}
                    iconStyle={{ background: '#53ba46', color: '#fff', boxShadow: '0 0 0 4px white' }}
                    icon={<a href="https://www.geotab.com/" target="_blank" rel="noopener noreferrer"><IconImage src="/geotab.png" alt="Geotab" className="timeline-icon" /></a>}
                >
                    <h3 className="vertical-timeline-element-title">Software Engineer Intern</h3>
                    <h4 className="vertical-timeline-element-subtitle">Geotab</h4>
                    <p>
                        My most recent internships were at Geotab, where I worked on the MyGeotab web application. I devloped a new feature that allows drivers to view their driving history and performance metrics, and earn rewards for safe driving.
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{ background: 'gold', color: '#fff' }}
                    icon={<FaStar className="timeline-icon" />}
                />
            </VerticalTimeline>
        </div>
    )
}

export default Timeline;