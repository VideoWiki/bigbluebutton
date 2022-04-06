import Joinroom from "./Joinroom";
import React, { useEffect, useState } from "react";
import { styles } from "../styles.scss";

export default function Joincontainer(props) {

    return (
        <div className={styles.AllRoomsBox}>
            <div>
                {
                    props.breakout.breakoutRooms.map((obj) => {
                        return (
                            <Joinroom action={props.action} breakoutRoom={obj} breakout={props.breakout} state={props.state} setState={props.setState} />
                        )
                    })
                }
            </div>
        </div>
    )
}