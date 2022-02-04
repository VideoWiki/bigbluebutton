import React from "react";
import {styles} from "./styles.scss";
function ChatHeading()
{
    return (<div className={styles.ChatHeadingOuter}>
        <div className={styles.ChatHeading}>Public Chat</div>
        </div>);
}
export default ChatHeading;