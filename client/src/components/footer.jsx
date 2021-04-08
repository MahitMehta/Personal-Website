import React, { useState, useEffect } from 'react';
import footerStyles from "../styles/footer.module.css";

//IMGS
import displayPicture from "../images/dp.jpg";
import gitHubSVG from "../images/github.svg";
import linkedInSVG from  "../images/linkedin.svg";

const Footer = ({ mainSection, showAlert }) => {
    const [ notAdmin, setNotAdmin ] = useState(false);
    const [ admin, setAdmin ] = useState(false);

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

    useEffect(() => {
        const isAdmin = atob(sessionStorage.getItem("a"));
        if (!notAdmin && !admin && isAdmin === "true") checkAdmin()
    }, [admin, notAdmin]);

    return (
        <footer className={footerStyles.footer}>
            <div className={footerStyles.footer_parts}>
                <img src={displayPicture} alt="DP" className={footerStyles.footer_dp}/>
                <table className={footerStyles.footer_part}>
                    <tbody>
                        <tr><th className={footerStyles.footer_part_header}>Channel</th></tr>
                        <tr className={footerStyles.footer_part_row}><td><a href="https://www.youtube.com/channel/UC_OXbojolphpidcIr4GRD4w" target="_blank" rel="noreferrer">Xeppa Academy</a></td></tr>
                        <tr className={footerStyles.footer_part_row}><td><a href="https://www.youtube.com/channel/UCM05YcPTJKeAfnZc493UO3Q" target="_blank" rel="noreferrer">MVCreates</a></td></tr>
                    </tbody>
                </table>
                <table className={footerStyles.footer_part}>
                    <tbody>
                        <tr><th className={footerStyles.footer_part_header}>Personal Projects</th></tr>
                        <tr className={footerStyles.footer_part_row}><td><a href="https://www.finshark.net" target="_blank" rel="noreferrer">FinShark</a></td></tr>
                        <tr className={footerStyles.footer_part_row}><td><a href="https://covid19facts.netlify.app" target="_blank" rel="noreferrer">Covid19Facts</a></td></tr>
                    </tbody>
                </table>
                <table className={footerStyles.footer_part}>
                    <tbody>
                        <tr><th className={footerStyles.footer_part_header}>Contact</th></tr>
                        <tr className={footerStyles.footer_part_row}>
                            <td>
                                <a href="mailto:mahit.py@gmail.com" target="_blank" rel="noreferrer" className={footerStyles.email}>Email
                                <span className={footerStyles.email_tt}>Hire Me!</span>
                                </a>
                            </td>
                        </tr>
                        <tr className={footerStyles.footer_part_row}><td><a href="/resume.pdf" target="_blank">Resume</a></td></tr>
                    </tbody>
                </table>
                <table className={footerStyles.footer_part}>
                    <tbody style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <tr><th className={footerStyles.footer_part_header}>Social Networks</th></tr>
                        <tr className={footerStyles.footer_part_row 
                        }>  
                            <td>
                                <a href="https://www.linkedin.com/in/mahit-mehta-068603203/" target="_blank" rel="noreferrer">
                                    <img src={linkedInSVG} alt="instagram-icon" className={footerStyles.footer_sm_icon}/>
                                </a>
                            </td>
                            <td>
                                <a href="https://github.com/MahitMehta" target="_blank" rel="noreferrer">
                                    <img src={gitHubSVG} alt="facebook-icon" className={footerStyles.footer_sm_icon} onClick={() => {
                                        // showAlert({ header: "Link Broken", message: "Try Again Later!" })
                                    }}/>
                                </a>
                            </td>
                            <td>
                                <a href="https://twitter.com/MahitMehta/status/1252650756810964993" target="_blank" rel="noreferrer">
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/733/733579.svg" alt="twitter-icon" className={footerStyles.footer_sm_icon}/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 className={footerStyles.web_author}>
                <a href={mainSection.current ? `#${mainSection.current.id}` : ""}>
                    Mahit Mehta
                </a>
            </h4>
            { admin ?
                <button className={footerStyles.logout} onClick={() => {
                    const endpoint = "/admin/logout";
                    fetch(endpoint, {
                        method: "POST",
                        credentials: "include"
                    }).then(res => {
                        if (res.ok) {
                            const origin = window.location.origin;
                            window.location.href = origin;
                        } else console.error('Failed to Log Out!');
                    }).catch(err => console.error(err));
                   
                }}>Log Out</button>
            : null}
        </footer>
    ) 
}

export default Footer; 