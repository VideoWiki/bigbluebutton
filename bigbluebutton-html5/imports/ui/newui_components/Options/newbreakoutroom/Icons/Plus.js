import { nominalTypeHack } from "prop-types";
import React from "react";
import {styles} from "../styles.scss";
function Plus({...rootDOMAttributes})
{
    return (
        <button style={{border: "none", background: "transparent"}} {...rootDOMAttributes}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" className={styles.add} stroke="#44CC88" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12H19" className={styles.add} stroke="#44CC88" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    );
}
export default Plus;