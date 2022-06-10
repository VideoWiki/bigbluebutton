import React from "react";
import {styles} from "./styles.scss";

function Webcamoff()
{
    return (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" className={styles.iconOffFill} fill-opacity="0.1"/>
    <path d="M15.1065 11.3333H17.3332C17.6868 11.3333 18.0259 11.4738 18.276 11.7239C18.526 11.9739 18.6665 12.313 18.6665 12.6667V14.8933L19.3332 15.56L23.3332 12.6667V19.3333M18.6665 18.6667V19.3333C18.6665 19.687 18.526 20.0261 18.276 20.2761C18.0259 20.5262 17.6868 20.6667 17.3332 20.6667H9.99984C9.64622 20.6667 9.30708 20.5262 9.05703 20.2761C8.80698 20.0261 8.6665 19.687 8.6665 19.3333V12.6667C8.6665 12.313 8.80698 11.9739 9.05703 11.7239C9.30708 11.4738 9.64622 11.3333 9.99984 11.3333H11.3332L18.6665 18.6667Z" className={styles.iconOffStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.6665 8.66667L23.3332 23.3333" className={styles.iconOffStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>    
    );
}
export default Webcamoff;