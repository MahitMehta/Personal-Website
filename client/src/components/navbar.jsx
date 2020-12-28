import React, { useEffect, useRef } from 'react';
import navStyles from "../styles/navbar.module.css";

//IMGS
import mmLogoT from "../images/mmLogoT.svg";

const sections = {"home": "/", "divisions": "/photography", "timeline": "/timeline"};

const Navbar = ({ section, change }) => {
    const navbar = useRef();

    useEffect(() => {
        let currentOffset = window.pageYOffset;
        window.addEventListener("scroll", (e) => {
            if (window.pageYOffset > 0 && navbar.current && window.innerWidth <= 1200) {
                navbar.current.style.boxShadow = "0px 5px 10px 0px rgba(0, 0, 0, 0.5)";
                navbar.current.style.backgroundColor = "var(--dark-grey)";
            } else if (window.pageYOffset <= 0 && navbar.current) {
                navbar.current.style.boxShadow = "";
                navbar.current.style.backgroundColor = "transparent";
            }
            if (window.pageYOffset > currentOffset && navbar.current && window.pageYOffset > 0) {
                navbar.current.style.transform = "translateY(-100%)";
                currentOffset = window.pageYOffset;
            } else if (window.pageYOffset <= currentOffset && navbar.current) {
                navbar.current.style.transform = "translateY(0%)";
                currentOffset = window.pageYOffset;
            }
        });
    }, [navbar]);

    return (
        <nav className={navStyles.nav} ref={navbar}>
            <img className={navStyles.website_logo} src={mmLogoT} alt="website logo" />
            <ul className={navStyles.nav_ul}>
                {Object.keys(sections).map((sectionName, idx) => {
                    const styles = sectionName === section ? 
                        { color: "white", fontWeight: "" } : 
                        {color: "rgba(255, 255, 255. 0.5)"};
                    return (
                            <li 
                                key={idx}
                                style={ styles } 
                                data-selected={sectionName === section} 
                                className={navStyles.nav_ul_item}
                                onClick={e => {
                                    e.target.style.color = "white";
                                    const changeHandler = change;
                                    changeHandler(e.target.innerText);
                                }}>
                                {sectionName} 
                            </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navbar; 