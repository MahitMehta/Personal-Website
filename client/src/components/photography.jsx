import React, { useState, useEffect, useRef } from 'react';
import photographyStyles from "../styles/photography.module.css";

import InstagramPost from "./instagramPost";
import Navbar from "./navbar";
import Footer from "./footer";
import Alert from "./alert";

import Instagram from "../Classes/instagram";

const Photography = () => {
    const [alert, setAlert] = useState({});
    const [ posts, setPosts ] = useState([]);
    const [ direction, setDirection ] = useState("up");

    const getPosts = () => {
        const instagram = new Instagram();
        instagram.posts()
            .then(data => setPosts(data));
    }

    useEffect(() => {
        if (posts.length) return;
        getPosts();
    })

    const mainSection = useRef();

    return (
        <React.Fragment>
            <Navbar section={"divisions"} change={location => {
                if (location.toLowerCase() === "divisions".toLowerCase()) return;
                setDirection("down")
                setTimeout(() => {
                    const origin = window.location.origin;
                    window.location = `${origin}/${location.toLowerCase()}`;
            }, 750);}}/>
            <ul className={photographyStyles.posts_section} ref={mainSection}>
               { posts.map(post => <InstagramPost post={post} key={post.id} direction={direction} />) } 
            </ul>
            <div className={photographyStyles.more}>
                <a href="https://www.instagram.com/the_beauty_in_this_earth/?hl=en" target="_blank" rel="noreferrer">
                    <img src="https://www.flaticon.com/svg/static/icons/svg/174/174855.svg" alt="instagram-icon" className={photographyStyles.sm_icon}/>
                </a>
                <a href="https://www.instagram.com/the_beauty_in_this_earth/?hl=en" target="_blank" rel="noreferrer">View More on Instagram</a>
                
            </div>
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

export default Photography;