import React, { useEffect, useState } from "react";
import Plus from "./Icons/Plus";
import { styles } from "./styles.scss";

function Room(props) {

    console.log("Room ",props)
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
    },[])
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
                            return <img src="https://s3.us-east-2.amazonaws.com/video.wiki/class-assets/user.svg" className={styles.userRoom} />
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