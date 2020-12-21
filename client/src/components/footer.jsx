import React from 'react';
import footerStyles from "../styles/footer.module.css";

//IMGS
import displayPicture from "../images/dp.jpg";

const Footer = ({ mainSection, showAlert }) => {

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
                    </tbody>
                </table>
                <table className={footerStyles.footer_part}>
                    <tbody style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <tr><th className={footerStyles.footer_part_header}>Social Media</th></tr>
                        <tr className={footerStyles.footer_part_row 
                        }>  
                            <td>
                                <a href="https://www.instagram.com/the_beauty_in_this_earth/?hl=en" target="_blank" rel="noreferrer">
                                    <img src="https://www.flaticon.com/svg/static/icons/svg/174/174855.svg" alt="instagram-icon" className={footerStyles.footer_sm_icon}/>
                                </a>
                            </td>
                            <td>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174848.svg" alt="facebook-icon" className={footerStyles.footer_sm_icon} onClick={() => {
                                    showAlert({ header: "Link Broken", message: "Try Again Later!" })
                                }}/>
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
        </footer>
    ) 
}

export default Footer; 