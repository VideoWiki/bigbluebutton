import React from "react";
import BreakoutroomHeading from "./BreakoutRoomHeading";
import CreateBreakout from "./CreateBreakout";
import RoomGroup from "./RoomGroup";
import {styles} from "./styles.scss";
function BreakoutRoom_flow(props)
{
    return (<div className={styles.breakoutRoomFlow}>
        <BreakoutroomHeading/>
        <CreateBreakout {...props}/>
        {/* <RoomGroup/> */}
        </div>);
}
export default BreakoutRoom_flow;