import React, { useEffect, useState } from "react";
import Plus from "./Icons/Plus";
import { defineMessages, injectIntl } from 'react-intl';
import { styles } from "./styles.scss";

const intlMessages = defineMessages({
    breakoutTitle: {
      id: 'app.createBreakoutRoom.title',
      description: 'breakout title',
    },
    breakoutAriaTitle: {
      id: 'app.createBreakoutRoom.ariaTitle',
      description: 'breakout aria title',
    },
    breakoutDuration: {
      id: 'app.createBreakoutRoom.duration',
      description: 'breakout duration time',
    },
    breakoutRoom: {
      id: 'app.createBreakoutRoom.room',
      description: 'breakout room',
    },
    breakoutJoin: {
      id: 'app.createBreakoutRoom.join',
      description: 'label for join breakout room',
    },
    breakoutJoinAudio: {
      id: 'app.createBreakoutRoom.joinAudio',
      description: 'label for option to transfer audio',
    },
    breakoutReturnAudio: {
      id: 'app.createBreakoutRoom.returnAudio',
      description: 'label for option to return audio',
    },
    askToJoin: {
      id: 'app.createBreakoutRoom.askToJoin',
      description: 'label for generate breakout room url',
    },
    generatingURL: {
      id: 'app.createBreakoutRoom.generatingURL',
      description: 'label for generating breakout room url',
    },
    endAllBreakouts: {
      id: 'app.createBreakoutRoom.endAllBreakouts',
      description: 'Button label to end all breakout rooms',
    },
    alreadyConnected: {
      id: 'app.createBreakoutRoom.alreadyConnected',
      description: 'label for the user that is already connected to breakout room',
    },
    extendTimeInMinutes: {
      id: 'app.createBreakoutRoom.extendTimeInMinutes',
      description: 'Label for input to extend time (minutes)',
    },
    extendTimeLabel: {
      id: 'app.createBreakoutRoom.extendTimeLabel',
      description: 'Button label to incresce breakout rooms time',
    },
    extendTimeCancel: {
      id: 'app.createBreakoutRoom.extendTimeCancel',
      description: 'Button label to cancel extend breakout rooms time',
    },
    extendTimeHigherThanMeetingTimeError: {
      id: 'app.createBreakoutRoom.extendTimeHigherThanMeetingTimeError',
      description: 'Label for error when extend breakout rooms time would be higher than remaining time in parent meeting',
    },
  });

function Room(props) {
  
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        let arr = [];
        let count = 1;
        props.state.users.forEach((user)=>{
            if(user.room == props.room){
                arr.push({...user, count:count})
                count+=1;
            }
        })
        setUsers(arr);
    },[props.state.users])
    const openSelectUserModal = (e)=>{
        e.preventDefault();
        props.setState({...props.state, formFillLevel: 2, openRoom: props.room});
    }

    return (<div className={styles.RoomBox}>
        <div className={styles.alignAtcorners}>
            <div className={styles.RoomName}>Room {props.room}</div>
            <div className={styles.RoomDuration}>{props.state.durationTime} min</div>
        </div>
        <div className={styles.alignAtcorners}>
            <div className={styles.ImageGroup}>
                {
                    users.map((user)=>{
                        if(user.count <= 6){
                            // return <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                            return (
                                <div className={styles.userRoom} ><span>{user.userName.charAt(0)}</span></div>
                            )
                        }
                    })
                }
                
                {/* <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} /> */}
                {
                    users.length > 6 ? <div className={styles.remaining}>+{users.length-6}</div> : null
                }
                
            </div>
            <div className={styles.PlusButton}>
              <Plus onClick={openSelectUserModal} />
            </div>
        </div>
    </div>);
}
export default Room;