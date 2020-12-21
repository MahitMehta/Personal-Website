import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/navbar";
import timelineStyles from "../styles/timeline.module.css";
import Footer from "./footer";
import Alert from "./alert";
import PostSection from "./postSection";

const Timeline = ({ section }) => {
    const [alert, setAlert] = useState({});

    const [posts, setPosts] = useState({});
    const [allMonths, setAllMonths] = useState([]);
    const [datesLoaded, setDatesLoaded] = useState(0);
    const [direction, setDirection] = useState("up");

    const parseDate = (rawDate) => {
        const year = parseInt(rawDate.match(/y[0-9]{4}m/g)[0].slice(1, -1));
        const month = parseInt(rawDate.match(/m[0-9]{1,2}/g)[0].slice(1));
        return  {year: year, month: month};
    }

    const getMonths = () => {
        fetch("/api/timeline/months").then(response => response.json()).then(data => {
            const sortedData = data.sort((a, b) => {
                const dateOne = parseDate(a).year + parseDate(a).month;
                const dateTwo = parseDate(b).year + parseDate(b).month;
                return dateOne - dateTwo;
            })
            setAllMonths(sortedData.reverse());
        });
    }
    
    const getTimeline = () => {
        const {year, month} = parseDate(allMonths[datesLoaded]);

        fetch(`/api/timeline?y=${year}&m=${month}`)
        .then(response => response.json())
        .then(data => {
            const currentPosts = {...data, ...posts};
            // const newDate = Object.keys(data)[0];
            setPosts(currentPosts);
            setDatesLoaded(datesLoaded + 1);
        });
    }

    useEffect(() => {
        if (!allMonths.length) getMonths();
        else if (!Object.keys(posts).length) getTimeline();
    });

    const months = [
        "January", "February", "March",
        "April", "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    const monthPostKeys = Object.keys(posts).length ? Object.keys(posts) : [];
    const mainSection = useRef();
    const loadMore = useRef();

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
                {monthPostKeys.reverse().map((monthPostKey, idx) => {
                    const dateObj = new Date();
                    const {year, month} = parseDate(monthPostKey);
                    const monthName = months[month - 1];
                    const showYear = dateObj.getFullYear() !== year;
                    const postKeys = posts[monthPostKey].map(postObj => Object.keys(postObj)[0]);
                    const postData = posts[monthPostKey];
                    return <PostSection postKeys={postKeys} 
                                        postData={postData} 
                                        showYear={showYear} 
                                        year={year} 
                                        key={idx}
                                        months={months} 
                                        direction={direction}
                                        monthName={monthName}/>
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