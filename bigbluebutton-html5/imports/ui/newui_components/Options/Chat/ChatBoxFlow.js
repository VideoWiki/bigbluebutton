import React from "react";
import ChatContent from "./ChatContent";
import ChatHeading from "./ChatHeading";
import {styles} from "./styles.scss";
import WriteMessage from "./WriteMessage";
function ChatBoxFlow()
{
    return (<div className={styles.chatFlow}>
        <ChatHeading/>
        <ChatContent/>
        <WriteMessage/>
        </div>);
}
export default ChatBoxFlow;