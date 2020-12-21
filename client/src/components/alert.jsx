import React from 'react';
import alertStyles from "../styles/alert.module.css";

const Alert = ({ header, message, closeHandler }) => {
    const alertHeader = header ? header : "Alert";
    const alertMessage = message ? message : "You have triggered an alert!";
    document.body.style.overflow = "hidden";

    return (
        <section className={alertStyles.alert_bg}>
            <div className={alertStyles.alert_div}>
                <div className={alertStyles.message_container}>
                    <h1 className={alertStyles.header}>{alertHeader}</h1>
                    <p className={alertStyles.message}>{alertMessage}</p>
                </div>
                <button className={alertStyles.close} onClick={closeHandler}>Close</button>
            </div>
        </section>
    )   
}

export default Alert;