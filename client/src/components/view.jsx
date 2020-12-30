import React from 'react';
import Home from "../components/home";
import Timeline from "../components/timeline";
import "../styles/global.module.css";

const View = ({ section, token }) => {
    document.title = "Mahit Mehta";

    const selectSection = () => {
        switch(section) {
            case "home": 
                return <Home section={section} />
            case "timeline": 
                return <Timeline section={section} token={token} />
            default: 
                return <Home section="home" />
        }
    }

    return (
        <React.Fragment>
            { selectSection() }
        </React.Fragment>
    )
}

export default View; 