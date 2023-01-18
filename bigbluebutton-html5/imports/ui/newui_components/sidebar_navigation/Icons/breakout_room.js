import React from "react";
import { styles } from "./styles.scss";

function BreakoutRoom(props) {
    const { sidebarContentPanel } = props;

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2107_300)">
                <path d="M8.25 0.9375H3.1875C1.94486 0.9375 0.9375 1.94486 0.9375 3.1875V8.25C0.9375 9.49264 1.94486 10.5 3.1875 10.5H8.25C9.49264 10.5 10.5 9.49264 10.5 8.25V3.1875C10.5 1.94486 9.49264 0.9375 8.25 0.9375Z" fill="#9EA5AF" className={(sidebarContentPanel === "newbreakoutroom") ? styles.iconDark : styles.iconNormal}/>
                <path d="M20.8125 0.9375H15.75C14.5074 0.9375 13.5 1.94486 13.5 3.1875V8.25C13.5 9.49264 14.5074 10.5 15.75 10.5H20.8125C22.0551 10.5 23.0625 9.49264 23.0625 8.25V3.1875C23.0625 1.94486 22.0551 0.9375 20.8125 0.9375Z" fill="#9EA5AF" className={(sidebarContentPanel === "newbreakoutroom") ? styles.iconDark : styles.iconNormal}/>
                <path d="M8.25 13.5H3.1875C1.94486 13.5 0.9375 14.5074 0.9375 15.75V20.8125C0.9375 22.0551 1.94486 23.0625 3.1875 23.0625H8.25C9.49264 23.0625 10.5 22.0551 10.5 20.8125V15.75C10.5 14.5074 9.49264 13.5 8.25 13.5Z" fill="#9EA5AF" className={(sidebarContentPanel === "newbreakoutroom") ? styles.iconDark : styles.iconNormal}/>
                <path d="M21.375 16.5938H19.9688V15.1875C19.9688 14.7399 19.791 14.3107 19.4745 13.9943C19.158 13.6778 18.7288 13.5 18.2812 13.5C17.8337 13.5 17.4045 13.6778 17.088 13.9943C16.7715 14.3107 16.5938 14.7399 16.5938 15.1875V16.5938H15.1875C14.7399 16.5938 14.3107 16.7715 13.9943 17.088C13.6778 17.4045 13.5 17.8337 13.5 18.2812C13.5 18.7288 13.6778 19.158 13.9943 19.4745C14.3107 19.791 14.7399 19.9688 15.1875 19.9688H16.5938V21.375C16.5938 21.8226 16.7715 22.2518 17.088 22.5682C17.4045 22.8847 17.8337 23.0625 18.2812 23.0625C18.7288 23.0625 19.158 22.8847 19.4745 22.5682C19.791 22.2518 19.9688 21.8226 19.9688 21.375V19.9688H21.375C21.8226 19.9688 22.2518 19.791 22.5682 19.4745C22.8847 19.158 23.0625 18.7288 23.0625 18.2812C23.0625 17.8337 22.8847 17.4045 22.5682 17.088C22.2518 16.7715 21.8226 16.5938 21.375 16.5938Z" fill="#9EA5AF" className={(sidebarContentPanel === "newbreakoutroom") ? styles.iconDark : styles.iconNormal}/>
            </g>
            <defs>
                <clipPath id="clip0_2107_300">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
export default BreakoutRoom;

