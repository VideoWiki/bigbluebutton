import React, { useEffect, useState } from "react";
import { BreakoutContextProvider } from "../context/BreakoutContext";
import BreakoutroomHeading from "./BreakoutRoomHeading";
import CreateBreakout from "./CreateBreakout";
import RoomGroup from "./RoomGroup";
import SelectUserModal from "./select-user/SelectUserModal";
import {styles} from "./styles.scss";
function BreakoutRoom_flow(props)
{
    const [state, setState] = useState({
        numberOfRooms: 2,
        seletedId: '',
        users: [],
        durationTime: 15,
        freeJoin: false,
        roomNameDuplicatedIsValid: false,
        formFillLevel: 1,
        roomNamesChanged: [],
        roomSelected: 0,
        preventClosing: true,
        leastOneUserIsValid: true,
        numberOfRoomsIsValid: true,
        roomNameDuplicatedIsValid: true,
        roomNameEmptyIsValid: true,
        record: false,
        durationIsValid: true,
        breakoutJoinedUsers: props.breakoutJoinedUsers,
        WantCreate: true,
        selectedUsers: 0,
        openRoom: 0,
    });
    useEffect(()=>{
        let arr = [];
        props.users.forEach((user)=>{
            arr.push({
                userId: user.userId,
                userName: user.name,
                isModerator: user.role === "MODERATOR",
                room: 0,
            })
        })
        setState({...state, users:arr});
    },[])
    return (
        <div className={styles.breakoutRoomFlow}>
            <BreakoutroomHeading/>
            {
                state.formFillLevel=="1" &&
                <>
                    <CreateBreakout state={state} setState={setState}/>
                    <RoomGroup state={state} setState={setState}/>
                </> 
            }
            {
                state.formFillLevel=="2" && <SelectUserModal state={state} setState={setState}/>
            }
        </div>
    );
}
export default BreakoutRoom_flow;