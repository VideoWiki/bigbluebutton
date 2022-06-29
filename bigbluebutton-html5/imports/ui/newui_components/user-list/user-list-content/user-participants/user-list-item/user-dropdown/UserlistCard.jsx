import React, { useState } from 'react'
import Micoff from './icons/Micoff';
import Micon from './icons/Micon';
import Webcamoff from './icons/Webcamoff';
import Webcamon from './icons/Webcamon';
import UserAvatar from '/imports/ui/components/user-avatar/component';
import Icon from '/imports/ui/components/icon/component';
import { styles } from './styles'

export default function UserlistCard(props) {

    const LABEL = Meteor.settings.public.user.label;
    const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

    const [user, setUser] = useState(props.user);

    const renderUserAvatar = () => {
        const {
            normalizeEmojiName,
            user,
            userInBreakout,
            breakoutSequence,
            meetingIsBreakout,
            voiceUser,
        } = props;
        
        const { clientType } = user;
        const isVoiceOnly = clientType === 'dial-in-user';

        const iconUser = user.emoji !== 'none'
            ? (<Icon iconName={normalizeEmojiName(user.emoji)} />)
            : user.name.toLowerCase().slice(0, 2);

        const iconVoiceOnlyUser = (<Icon iconName="volume_level_2" />);
        const userIcon = isVoiceOnly ? iconVoiceOnlyUser : iconUser;

        return (
            <UserAvatar
                moderator={user.role === ROLE_MODERATOR}
                presenter={user.presenter}
                // talking={voiceUser.isTalking}
                // muted={voiceUser.isMuted}
                // listenOnly={voiceUser.isListenOnly}
                // voice={voiceUser.isVoiceUser}
                // noVoice={!voiceUser.isVoiceUser}
                color={user.color}
                whiteboardAccess={user.whiteboardAccess}
                emoji={user.emoji !== 'none'}
                avatar={user.avatar}
            >
                {
                    userInBreakout
                        && !meetingIsBreakout
                        ? breakoutSequence : userIcon
                }
            </UserAvatar>
        );
    }

    return (
        <div className={styles.userlistcard}>
            <div className={styles.userlistcardWrapper}>
                <div className={styles.userListLeft}>
                    <div className="userlistDp">
                        {
                            user ? renderUserAvatar() : null
                        }
                        {/* {
                            user ?
                                <>
                                    {
                                        user.avatar ?
                                            <img src={avatar}/> : <div className={styles.userDP} style={{backgroundColor: user.color}}>{user.name.charAt(0).toUpperCase()}</div>
                                    }
                                </> : null
                        } */}
                    </div>
                    <div className={styles.userListName}>
                        {
                            user ?
                                <>
                                    <span className={styles.userName}>{user.name}</span>
                                    <span className={styles.userPos}>{user.role === "MODERATOR" ? "Host" : "Attended"}</span>
                                </> : null
                        }
                    </div>
                </div>

                <div className={styles.userlistActions}>
                    {
                        user ?
                            <>
                                {
                                    props.voiceUser.isVoiceUser && (props.voiceUser.isMuted ? <Micoff /> : <Micon />)
                                }
                                {
                                    props.user.isSharingWebcam ? <Webcamon /> : <Webcamoff />
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