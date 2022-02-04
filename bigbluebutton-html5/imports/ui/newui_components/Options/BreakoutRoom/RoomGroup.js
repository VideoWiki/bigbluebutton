import React from "react";
import Room from "./Room";
import { styles } from "./styles.scss";

function RoomGroup() {
    return (<div className={styles.AllRoomsBox}>
        <div>
            <Room />
            <Room />
            <Room />
            <Room />
            <Room />
        </div>
    </div>);
}
export default RoomGroup;