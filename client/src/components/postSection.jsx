import React, { useEffect, useRef } from 'react';
import Post from './post';
import timelineStyles from "../styles/timeline.module.css";

const headerAnimation = (element, direction) => {
    const translateAmount = direction === "up" ? 0 : 25;
    const opacity = direction === "up" ? 1 : 0

    const observer = new IntersectionObserver(records => {
        records.forEach(record => {
            if (record.intersectionRatio !== 0) {
                element.style.opacity = opacity;
                element.style.transform = `translateY(${translateAmount}px)`;
                observer.unobserve(record.target);
            }
        });
    })
    observer.observe(element);
}

// Make it proporly order the posts (newest - oldest)
const PostSection = ({ postKeys, showYear, postData, year, months, direction, monthName, admin, idx}) => {
    const postSection = useRef();
    const header = useRef();

    useEffect(() => {
        postSection.current.scrollIntoView({
            block: "nearest"
        });
    }, [postSection]);

    useEffect(() => {
        headerAnimation(header.current, direction);
    }, [header, direction])  

    return (
        <section 
            className={timelineStyles.month_section} 
            ref={postSection}>
            <h1 
                className={timelineStyles.month} 
                ref={header}
                style={{ marginTop: admin && idx === 0 ? "0vh" : "8.5vh"}}
            >{monthName} {showYear ? year : ""}</h1>
            <div className={timelineStyles.month_div}>
                {postKeys.map((postKey, idx) => <Post key={idx} 
                                                    direction={direction} 
                                                    post={postData[idx][postKey]} 
                                                    months={months} 
                                                    postTimeOut={() => {
                    const maxFadeTime = 750;
                    const normalTimeOut = 250;
                    const totalTimeOut = normalTimeOut * postKeys.length - 1;
                    if (totalTimeOut <= maxFadeTime) {
                        return normalTimeOut * idx;
                    } else {
                        const posts = postKeys.length - 1 ? postKeys.length - 1: postKeys.length;
                        const timeOut = (maxFadeTime / posts) * idx;
                        return timeOut
                    }
                }} admin={admin} />)}
            </div>
        </section>
    )
}

export default PostSection;