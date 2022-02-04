import React from "react";
import Plus from "./Icons/Plus";
import { styles } from "./styles.scss";

function Room() {
    return (<div className={styles.RoomBox}>
        <div className={styles.alignAtcorners}>
            <div className={styles.RoomName}>Room 1</div>
            <div className={styles.RoomDuration}>45 min</div>
        </div>
        <div className={styles.alignAtcorners}>
            <div className={styles.ImageGroup}>
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
                <div className={styles.remaining}>+10</div>
            </div>
            <div className={styles.PlusButton}>
                <Plus />
            </div>
        </div>
    </div>);
}
export default Room;