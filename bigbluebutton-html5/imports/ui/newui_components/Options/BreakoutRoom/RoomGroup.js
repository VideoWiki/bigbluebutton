import React, { useEffect, useState } from "react";
import Room from "./Room";
import { styles } from "./styles.scss";

function RoomGroup(props) {
    const [state, setState] = useState({numberOfRooms:0});
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        let arr = [];
        for(let i=1; i<=props.numberOfRooms; i++){
            arr.push(i);
        }
        setRooms(arr);
    },[])

    return (
    <div className={styles.AllRoomsBox}>
        <div>
            {
                rooms.map(()=>{
                    return (
                        <Room/>
                    )
                })
            }
        </div>
    </div>);
}
export default RoomGroup;