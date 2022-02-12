import React from "react";
import Heading from "./Heading";
import PresentationDisplay from "./PresentationDisplay";
import { styles } from "./styles.scss";

function Presentation_flow() {
    return (<div className={styles.Presentation_Box}>
        <div>
            <Heading />
            <PresentationDisplay />
        </div>  
    </div>)
}
export default Presentation_flow;