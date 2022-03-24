import React, { useEffect, useState } from "react";
import Room from "./Room";
import { styles } from "./styles.scss";

function RoomGroup(props) {

    const [room, setRoom] = useState([]);

    useEffect(()=>{
        let arr = [];
        for(let i=1;i<=props.state.numberOfRooms;i++){
            arr.push(i);
        }
        setRoom(arr);
    },[props])

    return (<div className={styles.AllRoomsBox}>
        <div>
            {
                room.map((obj)=>{
                    return <Room room={obj} key={obj} state={props.state} setState={props.setState}/>
                })
            }
        </div>
    </div>);
}
export default RoomGroup;