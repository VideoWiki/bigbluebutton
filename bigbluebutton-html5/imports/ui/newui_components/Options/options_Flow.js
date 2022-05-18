import React from "react";
import ChatContainer from '/imports/ui/newui_components/chat/container';
import { LayoutContextFunc } from "../../components/layout/context";
import BreakoutRoom from '/imports/ui/newui_components/actions-bar/create-breakout-room/container';
import NewBreakoutRoom from './BreakoutRoom/BreakoutRoom_flow';
import { styles } from "./styles.scss";
import UsersContainer from "./Users/container"
import ExtVideoPlayer from "./external-video-player/modal/container";
import PollContainer from "./Poll/PollContainer";
import NoteContainer from './note/container'
import SettingsMenuContainer from '/imports/ui/newui_components/settings/container';
import PresentationUploader from './external-presentation/presentation-uploader/container'
import WaitingUsersPanel from '../waiting-users/container';

const Option_flow = (props) => {
    
    const { layoutContextState, layoutContextDispatch } = props;
    const { input } = layoutContextState;
    const { sidebarContent } = input;
    const { sidebarContentPanel } = sidebarContent;

    return (<div className={sidebarContentPanel != "none" ? styles.optionOuter : ""}>
        {sidebarContentPanel === "chat" && <ChatContainer />}
        {sidebarContentPanel === "breakoutroom" && <BreakoutRoom/>}
        {sidebarContentPanel === "document" && <NoteContainer/>}
        {sidebarContentPanel === "user" && <UsersContainer />}
        {sidebarContentPanel === "poll" && <PollContainer/>}
        {sidebarContentPanel === "video" && <ExtVideoPlayer/>}
        {sidebarContentPanel === "settings" && <SettingsMenuContainer />}
        {sidebarContentPanel === "presentation" && <PresentationUploader value={{isopen:true}}/>}
        {sidebarContentPanel === "waitingusers" && <WaitingUsersPanel/>}
    </div>)
}
export default LayoutContextFunc.withConsumer(Option_flow);