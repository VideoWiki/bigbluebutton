import React from "react";
import Poll from "./Icons/poll";
import BreakoutRoom from "./Icons/breakout_room";
import Document from "./Icons/document";
import Settings from "./Icons/settings";
import User from "./Icons/user";
import Video from "./Icons/video";
import Chat from "./Icons/chat";
import { ACTIONS } from "../../components/layout/enums";
import { styles } from "./styles";

function IconBox(props) {

    const { sidebarContent, icon, contextDispatch } = props;
    const { sidebarContentPanel } = sidebarContent;

    function updateSelectedFeature() {
        if (sidebarContentPanel === icon) {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: "none"
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: false
            });
        }
        else {
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_PANEL,
                value: icon
            });
            contextDispatch({
                type: ACTIONS.SET_SIDEBAR_CONTENT_IS_OPEN,
                value: true
            });
        };
    }
    return (<div className={styles.IconBox}
        onClick={() => updateSelectedFeature()}
    >
        <div className={sidebarContentPanel === icon ? styles.selectedBox : styles.IconShadow} >
            {icon === "chat" && <Chat
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "user" && <User
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "document" && <Document
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "breakoutroom" && <BreakoutRoom
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "poll" && <Poll
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "video" && <Video
                sidebarContentPanel={sidebarContentPanel}
            />}
            {icon === "settings" && <Settings
                sidebarContentPanel={sidebarContentPanel}
            />}
        </div>
    </div>);
}
export default IconBox;