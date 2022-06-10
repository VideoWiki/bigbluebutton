import React, { useState } from "react";
import Cross from "./Icons/Cross";
import Button from '/imports/ui/components/button/component';
import { styles } from "./styles";
import { defineMessages, injectIntl } from 'react-intl';
import _ from 'lodash';
import RoomGroup from "./RoomGroup";
import Random from "./Icons/Random";

const intlMessages = defineMessages({
    modalClose: {
      id: 'app.modal.close',
      description: 'Close',
    },
    modalCloseDescription: {
      id: 'app.modal.close.description',
      description: 'Disregards changes and closes the modal',
    },
    modalDone: {
      id: 'app.modal.confirm',
      description: 'Close',
    },
    modalDoneDescription: {
      id: 'app.modal.confirm.description',
      description: 'Disregards changes and closes the modal',
    },
    breakoutRoomTitle: {
      id: 'app.createBreakoutRoom.title',
      description: 'modal title',
    },
    breakoutRoomDesc: {
      id: 'app.createBreakoutRoom.modalDesc',
      description: 'modal description',
    },
    confirmButton: {
      id: 'app.createBreakoutRoom.confirm',
      description: 'confirm button label',
    },
    dismissLabel: {
      id: 'app.presentationUploder.dismissLabel',
      description: 'used in the button that close modal',
    },
    numberOfRooms: {
      id: 'app.createBreakoutRoom.numberOfRooms',
      description: 'number of rooms label',
    },
    duration: {
      id: 'app.createBreakoutRoom.durationInMinutes',
      description: 'duration time label',
    },
    randomlyAssign: {
      id: 'app.createBreakoutRoom.randomlyAssign',
      description: 'randomly assign label',
    },
    randomlyAssignDesc: {
      id: 'app.createBreakoutRoom.randomlyAssignDesc',
      description: 'randomly assign label description',
    },
    breakoutRoom: {
      id: 'app.createBreakoutRoom.room',
      description: 'breakout room',
    },
    freeJoinLabel: {
      id: 'app.createBreakoutRoom.freeJoin',
      description: 'free join label',
    },
    roomLabel: {
      id: 'app.createBreakoutRoom.room',
      description: 'Room label',
    },
    leastOneWarnBreakout: {
      id: 'app.createBreakoutRoom.leastOneWarnBreakout',
      description: 'warn message label',
    },
    notAssigned: {
      id: 'app.createBreakoutRoom.notAssigned',
      description: 'Not assigned label',
    },
    breakoutRoomLabel: {
      id: 'app.createBreakoutRoom.breakoutRoomLabel',
      description: 'breakout room label',
    },
    addParticipantLabel: {
      id: 'app.createBreakoutRoom.addParticipantLabel',
      description: 'add Participant label',
    },
    nextLabel: {
      id: 'app.createBreakoutRoom.nextLabel',
      description: 'Next label',
    },
    backLabel: {
      id: 'app.audio.backLabel',
      description: 'Back label',
    },
    invitationTitle: {
      id: 'app.invitation.title',
      description: 'isInvitationto breakout title',
    },
    invitationConfirm: {
      id: 'app.invitation.confirm',
      description: 'Invitation to breakout confirm button label',
    },
    minusRoomTime: {
      id: 'app.createBreakoutRoom.minusRoomTime',
      description: 'aria label for btn to decrease room time',
    },
    addRoomTime: {
      id: 'app.createBreakoutRoom.addRoomTime',
      description: 'aria label for btn to increase room time',
    },
    record: {
      id: 'app.createBreakoutRoom.record',
      description: 'label for checkbox to allow record',
    },
    roomTime: {
      id: 'app.createBreakoutRoom.roomTime',
      description: 'used to provide current room time for aria label',
    },
    numberOfRoomsIsValid: {
      id: 'app.createBreakoutRoom.numberOfRoomsError',
      description: 'Label an error message',
    },
    roomNameEmptyIsValid: {
      id: 'app.createBreakoutRoom.emptyRoomNameError',
      description: 'Label an error message',
    },
    roomNameDuplicatedIsValid: {
      id: 'app.createBreakoutRoom.duplicatedRoomNameError',
      description: 'Label an error message',
    },
    you: {
      id: 'app.userList.you',
      description: 'Text for identifying your user',
    },
    minimumDurationWarnBreakout: {
      id: 'app.createBreakoutRoom.minimumDurationWarnBreakout',
      description: 'minimum duration warning message label',
    },
    roomNameInputDesc: {
      id: 'app.createBreakoutRoom.roomNameInputDesc',
      description: 'aria description for room name change',
    }
  });

function CreateBreakout(props) {

    const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;
    const BREAKOUT_LIM = Meteor.settings.public.app.breakouts.breakoutRoomLimit;
    const MIN_BREAKOUT_ROOMS = 2;
    const MAX_BREAKOUT_ROOMS = BREAKOUT_LIM > MIN_BREAKOUT_ROOMS ? BREAKOUT_LIM : MIN_BREAKOUT_ROOMS;
    const MIN_BREAKOUT_TIME = 5;
    // const [state, setState] = useState({
    //     numberOfRooms: MIN_BREAKOUT_ROOMS,
    //     seletedId: '',
    //     users: [],
    //     durationTime: 15,
    //     freeJoin: false,
    //     roomNameDuplicatedIsValid: false,
    //     formFillLevel: 1,
    //     roomNamesChanged: [],
    //     roomSelected: 0,
    //     preventClosing: true,
    //     leastOneUserIsValid: true,
    //     numberOfRoomsIsValid: true,
    //     roomNameDuplicatedIsValid: true,
    //     roomNameEmptyIsValid: true,
    //     record: false,
    //     durationIsValid: true,
    //     breakoutJoinedUsers: null,
    //     WantCreate: true,
    //     selectedUsers: 0
    // });

    const [room, setRoom] = useState(0);

    const handleMinuteChange = (e) =>{
        e.preventDefault();
        props.setState({...props.state, durationTime: parseInt(e.target.value)});
    }

    const handleRoomNoChange = (e) =>{
        e.preventDefault();
        props.setState({...props.state, numberOfRooms: parseInt(e.target.value)});
    }

    const getUserByRoom = (room)=> {
        const { users } = props.state;
        return users.filter((user) => user.room === room);
      }
    const hasNameDuplicated = (position)=> {
        const { numberOfRooms } = props.state;
        const currName = getRoomName(position).trim();
        const equals = _.range(1, numberOfRooms + 1)
          .filter((n) => getRoomName(n).trim() === currName);
        if (equals.length > 1) return true;
    
        return false;
      }

    const getRoomName = (position)=> {
        const { intl } = props.action;
        const { roomNamesChanged } = props.state;
    
        if (hasNameChanged(position)) {
          return roomNamesChanged[position];
        }
    
        return intl.formatMessage(intlMessages.breakoutRoom, { 0: position });
    }

    const getFullName = (position)=> {
        const { meetingName } = props.action;
    
        return `${meetingName} (${getRoomName(position)})`;
      }

    const hasNameChanged = (position)=> {
        const { intl } = props.action;
        const { roomNamesChanged } = props.state;
    
        if (typeof roomNamesChanged[position] !== 'undefined'
          && roomNamesChanged[position] !== intl
            .formatMessage(intlMessages.breakoutRoom, { 0: position })) {
          return true;
        }
        return false;
      }

    const handleCreateAction = (e) =>{
        e.preventDefault();
        const { createBreakoutRoom } = props.action;
        const {
            users,
            freeJoin,
            record,
            numberOfRoomsIsValid,
            numberOfRooms,
            durationTime,
            durationIsValid,
          } = props.state;

        if ((durationTime || 0) < MIN_BREAKOUT_TIME) {
            props.setState({ durationIsValid: false });
            return;
        }

        if (users.length === getUserByRoom(0).length && !freeJoin) {
            props.setState({ leastOneUserIsValid: false });
            return;
        }
        if (!numberOfRoomsIsValid || !durationIsValid) {
            return;
        }

        const duplicatedNames = _.range(1, numberOfRooms + 1).filter((n) => hasNameDuplicated(n));
        if (duplicatedNames.length > 0) {
            props.setState({ roomNameDuplicatedIsValid: false });
            return;
        }
        const emptyNames = _.range(1, numberOfRooms + 1).filter((n) => getRoomName(n).length === 0);
        if (emptyNames.length > 0) {
            props.setState({ roomNameEmptyIsValid: false });
            return;
        }

        const rooms = _.range(1, numberOfRooms + 1).map((seq) => ({
            users: getUserByRoom(seq).map((u) => u.userId),
            name: getFullName(seq),
            shortName: getRoomName(seq),
            isDefaultName: !hasNameChanged(seq),
            freeJoin,
            sequence: seq,
        }));
        console.log("rooms",rooms)
        createBreakoutRoom(rooms, durationTime, record);
        props.setState({...props.state, formFillLevel: 3});
    }

    const handleCancelAction = (e) =>{
        e.preventDefault();
        props.setState({...props.state, formFillLevel: 2});
    }

    const changeUserRoom = (userId, room) => {
      const { users, freeJoin } = props.state;
  
      const idxUser = users.findIndex((user) => user.userId === userId);
  
      const usersCopy = [...users];
  
      usersCopy[idxUser].room = room;
      props.setState({
        ...props.state,
        users: usersCopy,
        leastOneUserIsValid: (getUserByRoom(0).length !== users.length || freeJoin),
      });
    }

    const onAssignRandomly = () => {
      const { numberOfRooms } = props.state;
      const { users } = props.state;
      // We only want to assign viewers so filter out the moderators. We also want to get
      // all users each run so that clicking the button again will reshuffle
      const viewers = users.filter((user) => !user.isModerator);
      // We want to keep assigning users until all viewers have been assigned a room
      while (viewers.length > 0) {
        // We cycle through the rooms picking one user for each room so that the rooms
        // will have an equal number of people in each one
        for (let i = 1; i <= numberOfRooms && viewers.length > 0; i += 1) {
          // Select a random user for the room
          const userIdx = Math.floor(Math.random() * (viewers.length));
          changeUserRoom(viewers[userIdx].userId, i);
          // Remove the picked user so they aren't selected again
          viewers.splice(userIdx, 1);
        }
      }
    }

    const setFreeJoin = (e)=>{
      props.setState({...props.state, freeJoin: e.target.checked, leastOneUserIsValid: true });
    }

    return (
        <div className={styles.centerAlign1}>
            <div className={styles.createBreakOutBox}>
                <div className={styles.createBreakoutHeading}>Create breakout rooms</div>
                <div className={styles.BreakoutInput}>
                    <div>
                        <div className={styles.InputHeadings}>Rooms</div>
                        <select className={styles.InputRooms} onChange={handleRoomNoChange}>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                    <div className={styles.InputBox}>
                        <div className={styles.InputHeadings}>Duration</div>
                        <input className={styles.InputDuration} type="number" value={props.state.durationTime} onChange={handleMinuteChange}/>
                        <label className={styles.mylabel}>Minutes</label>
                    </div>
                </div>
                <div className={styles.centerAlign}>
                    <div className={styles.Tick}><input type="checkbox" onChange={setFreeJoin} checked={props.state.freeJoin}/></div>
                    <div className={styles.Check}>Allow users to choose a breakout room to join</div>
                </div>
                <div className={styles.centerAlign}>
                    <div className={styles.close} onClick={onAssignRandomly}><Random/></div>
                    <div className={styles.create} onClick={handleCreateAction}>Create Room</div>
                </div>
            </div>
            
        </div>);
}

export default CreateBreakout;
