import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef } from 'react';
import postCreatorStyles from "../styles/postCreator.module.css";
import PostLink from "./postLink";

const PostCreator = ({ show, cancel, setPost }) => {
    const [ links, setLinks ] = useState([]);
    const [ showLinkCreator, setShowLinkCreator ] = useState(false);

    const finalizeLink = (name, link) => {
        setShowLinkCreator(!showLinkCreator);
        const currentLinks = [];
        links.forEach(link => currentLinks.push(link));
        const newLink = { name: name, link: link };
        currentLinks.push(newLink);
        setLinks(currentLinks);
    }

    const title = useRef();
    const description = useRef();

    return (
        <div className={postCreatorStyles.creator} 
            style={{ 
                minHeight: show ? "215px" : "0px", 
                padding: show ? "15px" : "0px",
                height: show ? "auto" : "0px",
                opacity:  show ? "1" : "0",
            }}>
            <h1 className={postCreatorStyles.title}>New Post</h1>
            <input type="text" placeholder="Title" className={postCreatorStyles.post_field} ref={title}/>
            <input type="text" placeholder="Description" className={postCreatorStyles.post_field} ref={description} />
            <p className={postCreatorStyles.sub_title}>Refrences</p>
            <ul className={postCreatorStyles.refrence_links_list}>{
                links.map(({ name, link }, idx) => {
                    return (
                        <li key={idx} className={postCreatorStyles.refrence_link}>
                            <div>
                                <span className={postCreatorStyles.refrence_link_part}>Name: </span>
                                <span className={postCreatorStyles.refrence_link_data}>{ name }</span>
                            </div>
                            <div>
                                <span className={postCreatorStyles.refrence_link_part}>Link: </span>
                                <span className={postCreatorStyles.refrence_link_data}>{ link }</span>
                            </div>
                        </li>
                    )
                })
            }</ul>
            <PostLink show={showLinkCreator} remove={() => setShowLinkCreator(!showLinkCreator)} finalize={finalizeLink} />
            <FontAwesomeIcon 
                icon={faPlus} 
                className={postCreatorStyles.post_add_links} 
                onClick={() => setShowLinkCreator(!showLinkCreator)}
                />
            <div className={postCreatorStyles.post_buttons}>
                <button onClick={() => {
                    setLinks([]);
                    title.current.value = "";
                    description.current.value = "";
                    setShowLinkCreator(false);
                    cancel();
                }}>Cancel</button>
                <button onClick={() => {
                    const data = {
                        title: title.current.value,
                        description: description.current.value,
                        links: links
                    };
                    const seralizedData = JSON.stringify(data)
                    setPost(seralizedData);

                    setLinks([]);
                    title.current.value = "";
                    description.current.value = "";
                    setShowLinkCreator(false);
                    cancel();
                }}>Post</button>
            </div>
        </div>
    )
}

export default PostCreator