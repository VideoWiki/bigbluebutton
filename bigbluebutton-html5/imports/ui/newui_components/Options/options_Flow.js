import React from "react";
import ChatContainer from '/imports/ui/newui_components/chat/container';
import { LayoutContextFunc } from "../../components/layout/context";
import BreakoutRoom from '/imports/ui/newui_components/actions-bar/create-breakout-room/container';
import { styles } from "./styles.scss";
import UsersContainer from "./Users/container"

const Option_flow = (props) => {
    
    const { layoutContextState, layoutContextDispatch } = props;
    const { input } = layoutContextState;
    const { sidebarContent } = input;
    const { sidebarContentPanel } = sidebarContent;

    return (<div className={sidebarContentPanel != "none" ? styles.optionOuter : ""}>
        {sidebarContentPanel === "chat" && <ChatContainer />}
        {sidebarContentPanel === "breakoutroom" && <BreakoutRoom/>}
        {sidebarContentPanel === "user" && <UsersContainer />}
    </div>)
}
export default LayoutContextFunc.withConsumer(Option_flow);