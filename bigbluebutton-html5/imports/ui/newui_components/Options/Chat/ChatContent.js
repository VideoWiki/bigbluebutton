import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { styles } from "./styles.scss";

function ChatContent() {
    const messageRef = useRef(null);

    useEffect(() => 
        messageRef.current.scrollIntoView(
        {
            behavior: 'smooth'
        })
    );

    return (<div id="chat" className={styles.ChatContent} ref={messageRef}>
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
        <Message user={true} />
        <Message user={false} />
    </div>);
}
export default ChatContent;