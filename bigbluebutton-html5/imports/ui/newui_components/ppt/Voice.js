import React from "react";
import Speak from "./Icons/Speak"
import { styles } from "./styles.scss";
function Voice() {
    return (<div className={styles.VoiceBox}>
        <Speak />
        <div className={styles.SpeakerName}>
            Jyoti Singh
        </div>
    </div>)
}
export default Voice;