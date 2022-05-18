import React from "react";
import { styles } from "../styles.scss";

function ExternalPresentation(props) {
    const {sidebarContentPanel}=props;

    return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.75 1.65H12.75V0.75C12.75 0.325 12.425 0 12 0C11.575 0 11.25 0.325 11.25 0.75V1.65H2.25C1.825 1.65 1.5 1.975 1.5 2.4V14.975H22.5V2.4C22.5 1.975 22.175 1.65 21.75 1.65Z" fill={(sidebarContentPanel === "presentation") ? "#7816F7" : "#9EA5AF"}/>
    <path d="M23.25 16.225H0.75C0.35 16.225 0 16.575 0 16.975C0 17.4 0.325 17.725 0.75 17.725H10.475L6.05 22.4C5.775 22.7 5.775 23.175 6.075 23.45C6.375 23.725 6.85 23.725 7.125 23.425L11.25 19.075V23.25C11.25 23.675 11.575 24 12 24C12.425 24 12.75 23.675 12.75 23.25V19.075L16.875 23.425C17.15 23.725 17.625 23.75 17.925 23.45C18.225 23.175 18.25 22.7 17.95 22.4L13.525 17.725H23.25C23.675 17.725 24 17.4 24 16.975C24 16.55 23.675 16.225 23.25 16.225Z" fill={(sidebarContentPanel === "presentation") ? "#7816F7" : "#9EA5AF"}/>
    </svg>
    );
}
export default ExternalPresentation;
