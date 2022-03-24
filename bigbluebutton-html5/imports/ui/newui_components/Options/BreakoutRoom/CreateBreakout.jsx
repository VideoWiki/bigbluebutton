import React, { useState } from "react";
import Cross from "./Icons/Cross";
import Button from '/imports/ui/components/button/component';
import { styles } from "./styles";
import RoomGroup from "./RoomGroup";
function CreateBreakout(props) {

    // const BREAKOUT_LIM = Meteor.settings.public.app.breakouts.breakoutRoomLimit;
    const MIN_BREAKOUT_ROOMS = 2;
    // const MAX_BREAKOUT_ROOMS = BREAKOUT_LIM > MIN_BREAKOUT_ROOMS ? BREAKOUT_LIM : MIN_BREAKOUT_ROOMS;
    // const MIN_BREAKOUT_TIME = 5;

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
                    <div className={styles.Tick}><input type="checkbox" /></div>
                    <div className={styles.Check}>Allow users to choose a breakout room to join</div>
                </div>
                <div className={styles.centerAlign}>
                    <div className={styles.close} ><Cross /></div>
                    <div className={styles.create}>Create Room</div>
                </div>
            </div>
            
        </div>);
}
export default CreateBreakout;
