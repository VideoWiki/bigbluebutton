import React, { useState } from 'react'
import { styles } from './styles'

export default function UserlistCard(props) {

    const [user, setUser] = useState(props.value.user);

    return (
        <div className={styles.userlistcard}>
            <div className={styles.userlistcardWrapper}>
                <div className={styles.userListLeft}>
                    <div className="userlistDp">
                        {
                            user ?
                                <>
                                    {
                                        user.avatar ?
                                            <img src={avatar}/> : <div className={styles.userDP} style={{backgroundColor: user.color}}>{user.name.charAt(0).toUpperCase()}</div>
                                    }
                                </> : null
                        }
                    </div>
                    <div className={styles.userListName}>
                        {
                            user ?
                                <>
                                    <span className={styles.userName}>{user.name}</span>
                                    <span className={styles.userPos}>{user.role ==="MODERATOR" ? "Host" : "Attended" }</span>
                                </> : null
                        }
                    </div>
                </div>

                <div className={styles.userlistActions}>
                    {
                        user ?
                            <>
                                <img className={styles.userMic} src="https://s3.us-east-2.amazonaws.com/video.wiki/media/room_icons/mic_off.svg" />
                                <img className={styles.userWebcam} src="https://s3.us-east-2.amazonaws.com/video.wiki/media/room_icons/video_off.svg" />
                            </>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}