import React,{useContext} from "react";
import Arrow from "./Icons/Arrow";
import Recording from "./Icons/Recording";
import { styles } from "./styles.scss";

function Heading() {

    return (<div className={styles.centerAlign}>
        <div className={styles.InOneLine}>
            <div className={styles.arrowBox}>
                <Arrow />
            </div>
            <div className={styles.PresenationTitle}>Overview of new project ournet discation</div>
            <div className={styles.Recording}>
                <Recording />&nbsp;
                <div>Recording</div>
            </div>
        </div>
    </div>)
}
export default Heading;