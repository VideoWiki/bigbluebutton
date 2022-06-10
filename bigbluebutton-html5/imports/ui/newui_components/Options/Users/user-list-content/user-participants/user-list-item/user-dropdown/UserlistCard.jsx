import React, { useState } from 'react'
import Micoff from './icons/Micoff';
import Micon from './icons/Micon';
import Webcamoff from './icons/Webcamoff';
import Webcamon from './icons/Webcamon';
import { styles } from './styles'

export default function UserlistCard(props) {

    const LABEL = Meteor.settings.public.user.label;
    const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

    const [user, setUser] = useState(props.user);
    console.log("userlist",props)
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
                            {
                                props.voiceUser.isVoiceUser && (props.voiceUser.isMuted ? <Micoff/> : <Micon/>)
                            }
                            {
                                props.user.isSharingWebcam ? <Webcamon/> : <Webcamoff/>
                            }
                                {/* <img className={styles.userMic} src="https://s3.us-east-2.amazonaws.com/video.wiki/media/room_icons/mic_off.svg" />
                                <img className={styles.userWebcam} src="https://s3.us-east-2.amazonaws.com/video.wiki/media/room_icons/video_off.svg" /> */}
                            </>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}