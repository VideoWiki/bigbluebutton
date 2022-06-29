import React, { useEffect, useState } from "react";
import { BreakoutContextProvider } from "../context/BreakoutContext";
import BreakoutroomHeading from "../newbreakoutroom/BreakoutRoomHeading";
import CreateBreakout from "./CreateBreakout";
import RoomGroup from "./RoomGroup";
import SelectUserModal from "./select-user/SelectUserModal";
import { withModalMounter } from '/imports/ui/newui_components/modal/service';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import AudioManager from '/imports/ui/services/audio-manager';
import Service from '/imports/ui/components/breakout-room/service'
import AudioService from '/imports/ui/components/audio/service';

import {styles} from "./styles.scss";
import Joincontainer from "./join-room/Joincontainer";

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
    console.log("breaak",props)

    const {
        endAllBreakouts,
        requestJoinURL,
        extendBreakoutsTime,
        isExtendTimeHigherThanMeetingRemaining,
        findBreakouts,
        getBreakoutRoomUrl,
        transferUserToMeeting,
        transferToBreakout,
        meetingId,
        amIModerator,
        isUserInBreakoutRoom,
    } = Service;

    const breakoutRooms = findBreakouts();
    const isMicrophoneUser = AudioService.isConnected() && !AudioService.isListenOnly();
    const isMeteorConnected = Meteor.status().connected;
    const isReconnecting = AudioService.isReconnecting();
    const {
        setBreakoutAudioTransferStatus,
        getBreakoutAudioTransferStatus,
    } = AudioService;

    const breakout = {
        ...props,
        breakoutRooms,
        endAllBreakouts,
        requestJoinURL,
        extendBreakoutsTime,
        isExtendTimeHigherThanMeetingRemaining,
        getBreakoutRoomUrl,
        transferUserToMeeting,
        transferToBreakout,
        isMicrophoneUser,
        meetingId: meetingId(),
        amIModerator: amIModerator(),
        isMeteorConnected,
        isUserInBreakoutRoom,
        exitAudio: () => AudioManager.exitAudio(),
        isReconnecting,
        setBreakoutAudioTransferStatus,
        getBreakoutAudioTransferStatus,
      }

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
        if(breakoutRooms.length>0){
            setState({...state, formFillLevel:3});
        }
        setState({...state, users:arr});
    },[])
    
    // endAllBreakouts
    const handleBreakoutEnd  = ()=>{
        endAllBreakouts();
        setState({...state, formFillLevel: 1})
    }
    return (
        <div className={styles.breakoutRoomFlow}>
            <BreakoutroomHeading/>
            {
                breakoutRooms.length > 0 ?
                <>
                    <Joincontainer action={props} breakout={breakout} state={state} setState={setState}/>
                    {/* <button onClick={handleBreakoutEnd}>End All Breakout</button> */}
                    <div className={styles.smBottomDiv}>
                        <button className={styles.create1} onClick={handleBreakoutEnd}>End All Breakout</button>
                    </div>
                </> :
                <>
                    {
                        state.formFillLevel=="1" &&
                        <>
                            <CreateBreakout action={props} breakout={breakout} state={state} setState={setState}/>
                            <RoomGroup action={props} breakout={breakout} state={state} setState={setState}/>
                        </> 
                    }
                    {
                        state.formFillLevel=="2" && <SelectUserModal state={state} setState={setState}/>
                    }
                </>
            }
        </div>
    );
}

BreakoutRoom_flow.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  isInvitation: PropTypes.bool.isRequired,
  isMe: PropTypes.func.isRequired,
  meetingName: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  createBreakoutRoom: PropTypes.func.isRequired,
  getUsersNotAssigned: PropTypes.func.isRequired,
  getBreakouts: PropTypes.func.isRequired,
  sendInvitation: PropTypes.func.isRequired,
  mountModal: PropTypes.func.isRequired,
  isBreakoutRecordable: PropTypes.bool.isRequired,
};
export default withModalMounter(injectIntl(BreakoutRoom_flow));