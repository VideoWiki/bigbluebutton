import React from "react";
import MeetingOption from "./MeetingOption";
import { styles } from "./styles.scss";
import Voice from "./Voice";
function PresentationDisplay() {
    return (<div>
        <div className={styles.Presentation}>
            <div className={styles.InOneLine}>
                <Voice />
                <Voice />
                <Voice />
            </div>
        </div>
        <MeetingOption />
    </div>);
}
export default PresentationDisplay;