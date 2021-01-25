import React, { useState, useEffect, useRef } from 'react';
import photographyStyles from "../styles/photography.module.css";

const InstragramPost = ({ post, direction }) => {
    const [postSrc, setPostSrc] = useState();

    const postDiv = useRef();
    const postAnimation = () => {
        const observer = new IntersectionObserver((records) => {
            const posts = records.filter(record => record.intersectionRatio > 0);
            posts.forEach(record => {
                const target = record.target;
                target.style.opacity = direction === "up" ? 1 : 0;
                target.style.transform = `translateY(${ direction === "up" ? '0px' : '25px' })`;
                observer.unobserve(target);
            });
        });
        observer.observe(postDiv.current);
    }

    const postDate = () => {
        const months = [
            "January", "February", "March",
            "April", "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        const date = new Date(post.timestamp);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getUTCFullYear()}`
    }

    const loadSrc = () => {
        const image = new Image();
        image.onload = () => {
            setPostSrc(image.src)
        }
        image.src = post.media_url;
    }

    useEffect(() => {
        postAnimation(direction);
        if (!postSrc) {
            loadSrc();
        }
    });

    return (
        <a href={post.permalink} target="_blank" rel="noreferrer" ref={ postDiv }  className={photographyStyles.post_div}>
            <div className={photographyStyles.post} >
                { postSrc ? (
                    <img src={postSrc} alt="instagram post" loading="lazy" />
                ) : <p>Click To View</p> }
            </div>
            <p className={photographyStyles.post_date}>{ postDate() }</p>
        </a>
    )
}

export default InstragramPost;