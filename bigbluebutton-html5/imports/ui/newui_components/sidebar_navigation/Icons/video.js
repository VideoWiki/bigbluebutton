import React from "react";
import { styles } from "./styles.scss";

function Video(props) {
    const { sidebarContentPanel } = props;

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M24 9.01373H19.8818V14.9863H24V9.01373Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M24 9.01373H19.8818V14.9863H24V9.01373Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M23.2654 2.30646H19.8818V7.54432H24V3.04118C24 2.63561 23.6709 2.30646 23.2654 2.30646Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M19.8818 16.4556V21.6935H23.2654C23.6709 21.6935 24 21.3643 24 20.9588V16.4556H19.8818Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M5.58765 2.30646V21.6935H18.4125V2.30646H5.58765ZM15.2508 12.6353L10.5351 15.3737C10.0453 15.6575 9.43154 15.3047 9.43154 14.7385V9.26158C9.43154 8.69594 10.0455 8.34246 10.5351 8.62633L15.2508 11.3648C15.7378 11.6472 15.7383 12.3525 15.2508 12.6353Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M4.1182 9.01373H0V14.9863H4.1182V9.01373Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M0.734672 2.30646C0.329156 2.30646 0 2.63561 0 3.04118V7.54436H4.1182V2.30646H0.734672Z" fill="#9EA5AF" />
            <path className={(sidebarContentPanel === "video") ? styles.iconDark : styles.iconNormal} d="M0 16.4556V20.9588C0 21.3644 0.329156 21.6935 0.734672 21.6935H4.1182V16.4556H0Z" fill="#9EA5AF" />
        </svg>
        )
}
export default Video;