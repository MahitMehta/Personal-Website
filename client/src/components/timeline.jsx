import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/navbar";
import timelineStyles from "../styles/timeline.module.css";

import Footer from "./footer";
import Alert from "./alert";
import PostSection from "./postSection";
import PostCreator from "./postCreator";

import TimelineAPI from "../Classes/timeline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Timeline = ({ section, token }) => {
    document.title = "Timeline - Mahit Mehta"

    const [alert, setAlert] = useState({});

    const [posts, setPosts] = useState({});
    const [allMonths, setAllMonths] = useState([]);
    const [datesLoaded, setDatesLoaded] = useState(0);
    const [direction, setDirection] = useState("up");
    const [isError, setIsError] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [notAdmin, setNotAdmin] = useState(false);

    const checkAdmin = () => {
        const endpoint = "/validate-token";
        fetch(endpoint, {
            method: "POST",
            credentials: "include"
        }).then(res => {
            if (!res.ok) setNotAdmin(true);
            if (res.status === 200) setAdmin(true);
        })
    }

    const parseDate = (rawDate) => {
        const year = rawDate.match(/y[0-9]{4}m/g)[0].slice(1, -1);
        const month = rawDate.match(/m[0-9]{1,2}/g)[0].slice(1);
        return  {year: year, month: month};
    }

    const timelineAPI = new TimelineAPI(token);

    const getMonths = async () => {
        await timelineAPI.months().then(data => {
            if (!data.length) setIsError(true);
            const sortedData = data.sort((a, b) => {
                const dateOne = parseInt(parseDate(a).year + parseDate(a).month);
                const dateTwo = parseInt(parseDate(b).year + parseDate(b).month);
                return dateOne - dateTwo;
            })
            setAllMonths(sortedData.reverse());
        }).catch(err => console.error(err))
    }
    
    const getTimeline = () => {
        const {year, month} = parseDate(allMonths[datesLoaded]);

        timelineAPI.posts(year, month)
            .then(data => {
                if (!data.length) setIsError(true);
                const queryiedPosts = { ...data };
                const queryiedPostKeys = Object.keys(queryiedPosts);
                queryiedPostKeys.forEach(queryiedPost => {
                    queryiedPosts[queryiedPost].reverse();
                })
                const currentPosts = {...queryiedPosts, ...posts};
                setPosts(currentPosts);
                setDatesLoaded(datesLoaded + 1);
            }).catch(err => console.error(err))
    }

    useEffect(() => {
        if (!allMonths.length && !isError) getMonths();
        else if (!Object.keys(posts).length && !isError) getTimeline();
        if (!admin && !notAdmin) checkAdmin();
    });

    const months = [
        "January", "February", "March",
        "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    const monthPostKeys = Object.keys(posts).length ? Object.keys(posts) : [];
    const mainSection = useRef();
    const loadMore = useRef();

    const [ showPostCreator, setShowPostCreator ] = useState(false);

    const setPost = data => {
        timelineAPI.setPost(data)
        .then(res => {
            if (res.ok) {
                console.log("Added Post");
                // Make it refresh current posts
            }
            else setAdmin(false);
        })
    }

    return (
        <React.Fragment>
            <Navbar section={section} change={location => {
                if (location.toLowerCase() === section.toLowerCase()) return;
                if (loadMore.current) loadMore.current.style.opacity = "0";
                setDirection("down");
                setTimeout(() => {
                    const origin = window.location.origin;
                    window.location = `${origin}/${location.toLowerCase()}`;
                }, 1000);
            }}/>
            
            <section className={timelineStyles.posts_section} ref={mainSection}>
                <div 
                    className={timelineStyles.add_post} 
                    style={{ 
                        display: admin ? "flex" : "none",
                        opacity: direction === "up" ? 1 : 0,
                    }} 
                    onClick={() => {
                    setShowPostCreator(!showPostCreator);
                }}>
                    <FontAwesomeIcon icon={faPlus} style={{ cursor: "pointer" }} onClick={() => {
                    setShowPostCreator(!showPostCreator);
                }}/>
                </div>
                { admin ? 
                    <PostCreator 
                        show={showPostCreator} 
                        cancel={() => 
                        setShowPostCreator(!showPostCreator)}
                        setPost={data => setPost(data)}
                /> : null }
                {monthPostKeys.reverse().map((monthPostKey, idx) => {
                    const dateObj = new Date();
                    const {year, month} = parseDate(monthPostKey);
                    const monthName = months[month - 1];
                    const showYear = dateObj.getFullYear() !== parseInt(year);
                    const postKeys = posts[monthPostKey].map(postObj => Object.keys(postObj)[0]);
                    const postData = posts[monthPostKey];
                    return <PostSection postKeys={postKeys} 
                                        postData={postData} 
                                        showYear={showYear} 
                                        year={year} 
                                        key={idx}
                                        months={months} 
                                        direction={direction}
                                        monthName={monthName}
                                        idx={idx}
                                        admin={admin}/>
                })}
                {datesLoaded < allMonths.length && Object.keys(posts).length ? 
                    <p className={timelineStyles.load_more} onClick={getTimeline} ref={loadMore}>Load More</p> : null}
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

export default Timeline; 