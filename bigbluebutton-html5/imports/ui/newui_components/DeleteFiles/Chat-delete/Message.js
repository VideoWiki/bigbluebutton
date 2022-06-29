import React from "react";
import { styles } from "./styles.scss";
function Message(props) {
    return (<div className={styles.MessageOuter}>
        {props.user && <div>
            <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.UserImage}/>
        </div>}
        <div className={styles.MessageContent}>
            {props.user && <div
                className={styles.MessageSender}>
                Savannah Nguyen
            </div>}
            {<div className={!props.user&&styles.userMe}>
                <div className={props.user?styles.Message1:styles.Message2}>
                    Deserunt reprehenderit quis excepteur et amet.
                </div>
            </div>}
            {<div className={!props.user&&styles.userMe}>
                <div className={styles.time}>
                    12:51 AM
                </div>
            </div>}
        </div>
    </div>);
}
export default Message;