import React, { useEffect, useState } from "react";
import Room from "./Room";
import { styles } from "../styles.scss";

function RoomGroup(props) {

    const [rooms, setRooms] = useState([]);
    console.log("rooms",props)
    useEffect(()=>{
        let arr = [];
        for(let i=1;i<=props.numberOfRooms;i++){
            arr.push(i);
        }
        setRooms(arr);
    },[props])

    return (<div className={styles.AllRoomsBox}>
        <div>
            {
                rooms.map((obj)=>{
                    return <Room room={obj} {...props}/>
                })
            }
        </div>
    </div>);
}
export default RoomGroup;