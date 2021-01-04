import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faRobot, faCode } from "@fortawesome/free-solid-svg-icons";

import divisionNavStyles from "../styles/divisionNav.module.css";

const DivisionNav = ({ section, direction, transition }) => {
    const nav = useRef();

    const navAnimation = () => {
        const observer = new IntersectionObserver(records => {
            records.forEach(record => {
                if (record.intersectionRatio > 0) {
                    const target = record.target;
                    //|| direction === "middle"
                    target.style.opacity = direction === "up"  ? 1 : 0;
                }
            })
        });

        observer.observe(nav.current);
    }

    const redirect = newLocation => {
        if (newLocation === section) return;
        transition(newLocation);
    }

    useEffect(() => navAnimation());

    return (
        <ul className={divisionNavStyles.division_nav} ref={nav} >
            <li 
                className={divisionNavStyles.division} 
                style={{ color: section === "photography" ? "white" : "rgba(255, 255, 255, 0.5)"}}
                onClick={() => {
                    redirect("photography")
                }}>
                <FontAwesomeIcon icon={faCamera} className={divisionNavStyles.section_icon}/>
            </li>
            <li 
                className={divisionNavStyles.division}
                style={{ color: section === "artificial-intelligence" ? "white" : "rgba(255, 255, 255, 0.5)"}}
                onClick={() => {
                    redirect("artificial-intelligence")
                }}>
                <FontAwesomeIcon icon={faRobot} className={divisionNavStyles.section_icon}/>
            </li>
            <li 
                className={divisionNavStyles.division}
                style={{ color: section === "web-projects" ? "white" : "rgba(255, 255, 255, 0.5)"}}
                onClick={() => {
                    redirect("web-projects")
                }}>
                <FontAwesomeIcon icon={faCode} className={divisionNavStyles.section_icon}/>
            </li>
        </ul>
    )
}

export default DivisionNav;