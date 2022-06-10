import React from "react";
import {styles} from "./styles.scss";

function Micon()
{
    return (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="16" className={styles.iconFill} fill-opacity="0.1"/>
    <g clip-path="url(#clip0_1177_1933)">
    <path d="M16 8.66666C15.4696 8.66666 14.9609 8.87738 14.5858 9.25245C14.2107 9.62752 14 10.1362 14 10.6667V16C14 16.5304 14.2107 17.0391 14.5858 17.4142C14.9609 17.7893 15.4696 18 16 18C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V10.6667C18 10.1362 17.7893 9.62752 17.4142 9.25245C17.0391 8.87738 16.5304 8.66666 16 8.66666Z" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.6668 14.6667V16C20.6668 17.2377 20.1752 18.4247 19.3 19.2998C18.4248 20.175 17.2378 20.6667 16.0002 20.6667C14.7625 20.6667 13.5755 20.175 12.7003 19.2998C11.8252 18.4247 11.3335 17.2377 11.3335 16V14.6667" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 20.6667V23.3333" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3335 23.3333H18.6668" className={styles.iconStroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_1177_1933">
    <rect width="16" height="16" fill="white" transform="translate(8 8)"/>
    </clipPath>
    </defs>
    </svg>
    
    );
}
export default Micon;