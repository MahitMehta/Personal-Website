import React, { useRef, useEffect, useState } from "react";
import homeStyles from "../styles/home.module.css";
import Footer from "./footer";
import Navbar from "../components/navbar";

//IMGS
// import Buildings from "../images/buildings.jpg";
import Moments from "../images/moments-default.svg";
import Ai from "../images/machine-default.svg";
import Code from "../images/code-default.svg";
import Alert from "./alert";

const partsTransition = (parts, direction) => {
    const allParts = Array.from(parts.current.children);

    allParts.forEach((part, index) => {
        const transformStylesStr = getComputedStyle(part).getPropertyValue("transform").split(",");
        const transformStyleInt = parseInt(transformStylesStr[transformStylesStr.length - 1].replace(/[\s()]/g, ""));
        const adjustAmount = direction === "up" ? 35 : -35;
        const opacityAmount = direction === "up" ? 1 : 0; 

        const observer = new IntersectionObserver(record => {
            record.forEach(eachRecord => {
                if (!eachRecord.intersectionRatio) return;
                const delay = Math.abs(index * adjustAmount * 5);
                eachRecord.target.style.transitionDelay = `${delay}ms`;
                eachRecord.target.style.transform = `translateY(${transformStyleInt - adjustAmount}px)`;
                eachRecord.target.style.opacity = opacityAmount;
                setTimeout(() => {
                    eachRecord.target.style.transitionDelay = "0ms";
                }, window.innerWidth > 1000 ? delay : 0);
                observer.unobserve(eachRecord.target);
            });
        });

        observer.observe(part);
    });
}

const updateGreeting = () => {
    const date = new Date();
    const currentHour = date.getHours();

    if (0 <= currentHour && currentHour < 12) return "Morning";
    else if (12 <= currentHour && currentHour < 18) return "Afternoon";
    else if (18 <= currentHour && currentHour < 24) return "Evening";
}

const updateBirthday = () => {
    const birthDate = new Date("02/13/2006");
    const currentDate = new Date();
    const differenceInMS = currentDate - birthDate;
    const msInAYear = 1000 * 60 * 60 * 24 * 365.25;
    const differenceInY = differenceInMS / msInAYear;
    const age = Math.floor(differenceInY);
    return age;
}

const generalTransition = (section, direction) => {
    const adjustAmount = direction === "up" ? -35 : 35;
    const opacity = direction === "up" ? 1 : 0;
    const elements = Array.from(section.current.children);
    if (direction !== "up") elements.reverse();

    elements.forEach((element, idx) => {
        setTimeout(() => {
            element.style.transform = `translateY(${adjustAmount}px)`;
            element.style.opacity = opacity;
        }, idx * 150);
    });
}

const updateCodeBox = codeBox => {
    if (!codeBox.current) return;
    const codeLines = [
        {text: "<html>", spaces: 0},
        {text: "<head>", spaces: 1},
        {text: "</head>", spaces: 1},
        {text: "<body>", spaces: 1},
        {text: "<h1>Hello World!</h1>", spaces: 2},
        {text: "</body>", spaces: 1},
        {text: "</html>", spaces: 0}
    ];
    codeLines.forEach(({ text, spaces }) => {
        const codeLine = document.createElement("p");
        codeLine.innerText = text;
        codeLine.style.paddingLeft = `${spaces}vw`;
        codeBox.current.appendChild(codeLine);
    });
}



const Home = ({ section }) => {
    document.title = "Home - Mahit Mehta";
    const [ alert, setAlert ] = useState({});

    const greetingRef = useRef();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        setGreeting(updateGreeting());
    }, []);

    const [birthday, setBirthday] = useState();
    useEffect(() => {
        setBirthday(updateBirthday());
    }, []);

    const parts = useRef();
    useEffect(() => {
        partsTransition(parts, "up");
    }, [parts]);

    const general = useRef();
    useEffect(() => {
        generalTransition(general, "up");
    });

    const codeDiv = useRef();
    useEffect(() => {
        updateCodeBox(codeDiv);
    }, [codeDiv]);

    const mainSection = useRef();

    const pageTransition = (location) => {
        if (location.toLowerCase() === section.toLowerCase()) return;
        partsTransition(parts, "down");
        generalTransition(general, "down");
        setTimeout(() => {
            const origin = window.location.origin;
            window.location = `${origin}/${location.toLowerCase()}`;
        }, 750);
    }

    /* Original Photography Section Visual Markup
        <div className={homeStyles.buildings_div}>
                <img src={Buildings} alt="Building" className={homeStyles.buildings}/>
                <div className={homeStyles.quote_div}>
                    <p className={homeStyles.quote}>No man really is happy or safe without a hobby</p>
                    <p className={homeStyles.quote_author}>~ William Osler</p>
                </div>
        </div>
    */

    /* Original Web Projects Section Visual Markup
        <div className={homeStyles.part_code_div} ref={codeDiv}></div>
    */

    return (
        <React.Fragment>
            <Navbar section={section} change={location => pageTransition(location)}/>
            <section className={homeStyles.home_section} ref={mainSection} id="home_section">
            <div className={homeStyles.general} ref={general}>
                <div className={homeStyles.greeting}>
                    <h1 ref={greetingRef}>{greeting}
                    </h1>
                </div>
                <h1 className={homeStyles.name}>Mahit Mehta</h1>
                <div className={homeStyles.seperator}></div>
                    <p className={homeStyles.description}>I’m a { birthday } year old passionate web 
                    developer and AI Enthusiast. I excel at JavaScript, Python, HTML & CSS.
                    Currently I’m a Freelancer.
                    </p>
            </div>
            <div className={homeStyles.parts} ref={parts}>
                <div className={homeStyles.photography}>
                    <h1 className={homeStyles.part_title}>Photography &<br />Cinematography</h1>
                    <img className={`${homeStyles.part_img} ${homeStyles.photography_img}`} src={Moments} alt="Photography Moments"/>
                    <p className={homeStyles.part_description}>
                            Capturing moments has always been a enjoyable hobby of mines. Here you can view a few of my best captures!
                    </p>
                    <button className={homeStyles.part_more} onClick={() => {
                            pageTransition('photography')
                            // setAlert({ header: "Photography", message: "Coming Soon!" })
                        }}>Discover</button>
                </div>
                <div className={homeStyles.ai}>
                        <h1 className={homeStyles.part_title}>Artificial<br />Intelligence</h1>
                        <img className={`${homeStyles.part_img} ${homeStyles.ai_img}`} src={Ai} alt="Artificial Intelligence"/>
                        <p className={homeStyles.part_description}>
                            Over the years, Artificial Intelligence has been grabbing everyone’s attention including mines. 
                        </p>
                        <button className={homeStyles.part_more} onClick={() => {
                            setAlert({ header: "Artificial Intelligence", message: "Coming Soon!" })
                        }}>Learn More</button>
                </div>
                <div className={homeStyles.web_projects}>
                        <h1 className={homeStyles.part_title}>Web<br />Projects</h1>
                        <img className={`${homeStyles.part_img} ${homeStyles.web_projects_img}`} src={Code} alt="Web Projects"/>
                        <p className={homeStyles.part_description}>
                            Web designing / developing is a creative passion of mine. Here you can view some of my best work!
                        </p>
                        <button className={homeStyles.part_more} onClick={() => {
                            setAlert({ header: "Web Projects", message: "Coming Soon!" })
                        }}>Browse</button>
                </div>
            </div>
            </section>
            <Footer mainSection={mainSection} showAlert={(alertObj) => {
                setAlert(alertObj);
            }}/>
            {Object.keys(alert).length ? 
                <Alert header={alert.header} message={alert.message} closeHandler={() => {
                    setAlert({});   
                    document.body.style.overflow = "initial";
                }}/> 
            : null}
        </React.Fragment>
    )
}

export default Home; 