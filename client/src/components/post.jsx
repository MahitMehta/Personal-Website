import React, { useEffect, useRef } from 'react';
import postStyles from "../styles/post.module.css";

const postAnimation = (element, timeOut, direction) => {
    const translateAmount = direction === "up" ? 0 : 25;
    const opacity = direction === "up" ? 1 : 0;

    const observer = new IntersectionObserver(records => {
        records.forEach(record => {
            if (record.intersectionRatio !== 0) {
                setTimeout(() => {
                    element.style.transform = `translateY(${translateAmount}px)`;
                    element.style.opacity = opacity;
                }, timeOut);
                observer.unobserve(element)
            }
        });
    })
    observer.observe(element);
}

const Post = ({ direction, post, months, postTimeOut, admin }) => {
    const isLinks = post.links.length ? true : false;
    const colorOptions = ["#9CEEFF", "#A29CFF", "#B0FF9C", "#FFD488"];
    const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const getDate = () => {
        const timestamp = post.timestamp;
        if (!timestamp) return
        const date = new Date(timestamp._seconds ? timestamp._seconds * 1000 : timestamp);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    const postDiv = useRef();
    useEffect(() => {
        postDiv.current.style.backgroundColor = color;
        postAnimation(postDiv.current, postTimeOut(), direction);
    }, [postDiv, color, postTimeOut, direction]);

    return (
        <div className={postStyles.post_div} ref={postDiv}>
            <div className={postStyles.post_bg}></div>
            <h1 className={postStyles.post_header} contentEditable={admin} suppressContentEditableWarning={admin}>{post.header}</h1>
            <p className={postStyles.post_date}>{getDate()}</p>
            <p className={postStyles.post_description} contentEditable={admin} suppressContentEditableWarning={admin}>{post.description}</p>
            {isLinks ? <h3 className={postStyles.demo_subheading}>Demonstration at:</h3> : null}
                <ul className={postStyles.links_list}>
                {isLinks ? post.links.map((link, idx) => {
                    const key = Object.keys(link)[0];
                return <li key={idx} className={postStyles.post_link}><a href={link[key]} target="_blank" rel="noreferrer">{key}</a></li>
                }) : null}
            </ul>
        </div>
    )
}

export default Post; 