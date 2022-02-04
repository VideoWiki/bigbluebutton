import React from "react";
import Send from "./Icons/send";
import { styles } from "./styles.scss";

function WriteMessage() {
    return (<div className={styles.MessageBoxOuter}>
        <input placeholder="Write your message..." className={styles.MessageInput} />
        <div className={styles.sendBox}>
            <Send />
        </div>
    </div>)
}
export default WriteMessage;