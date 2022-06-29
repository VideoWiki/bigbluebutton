import React from "react";
import {styles} from "./styles.scss"; 

function Webcamon()
{
    return (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" className={styles.iconFill} fill-opacity="0.1"/>
    <path d="M24.25 12.25L19 16L24.25 19.75V12.25Z" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.5 10.75H9.25C8.42157 10.75 7.75 11.4216 7.75 12.25V19.75C7.75 20.5784 8.42157 21.25 9.25 21.25H17.5C18.3284 21.25 19 20.5784 19 19.75V12.25C19 11.4216 18.3284 10.75 17.5 10.75Z" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>    
    );
}
export default Webcamon;