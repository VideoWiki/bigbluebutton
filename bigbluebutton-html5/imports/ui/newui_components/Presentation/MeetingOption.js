import React from "react";
import Call from "./Icons/call";
import Cast from "./Icons/cast";
import Expand from "./Icons/Expand";
import Microphone from "./Icons/Microphone";
import Video from "./Icons/video";
import { styles } from "./styles.scss";
function MeetingOption() {
    return (<div className={styles.MeetingOption}>
        <div className={styles.InOneLine}>
            <div className={styles.CircularBox}><Expand /></div>
            <div className={styles.CircularBox}><Microphone /></div>
            <div className={styles.SquareBox}><Call /></div>
            <div className={styles.CircularBox}><Video /></div>
            <div className={styles.CircularBox}><Cast /></div>
        </div>
    </div>);
}
export default MeetingOption;