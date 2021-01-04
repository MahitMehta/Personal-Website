import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import postCreatorStyles from "../styles/postCreator.module.css";

const PostLink = ({ show, remove, finalize }) => {
    const linkName = useRef();
    const linkValue = useRef();

    return (
        <div className={postCreatorStyles.refrence_link_creator} style={{ display: show ? "flex" : "none" }}>
            <input type="text" placeholder="Name" className={postCreatorStyles.post_field} ref={linkName} />
            <input type="text" placeholder="Link" className={postCreatorStyles.post_field} ref={linkValue} />
            <button className={postCreatorStyles.refrence_link_remove} onClick={() => {
                linkName.current.value = "";
                linkValue.current.value = "";
                remove();
            }}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className={postCreatorStyles.refrence_link_add} onClick={() => {
                const name = linkName.current.value;
                const value = linkValue.current.value;
                if (!name || !value) return;
                finalize(name, value);
                linkName.current.value = "";
                linkValue.current.value = "";
            }}>
                <FontAwesomeIcon icon={faCheck} />
            </button> 
        </div>
    )
}

export default PostLink;