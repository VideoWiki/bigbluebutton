import React, { useEffect, useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import EndcallIcon from '../icons/EndcallIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { makeCall } from '/imports/ui/services/api';
import logger from '/imports/startup/client/logger';
import { Meteor } from 'meteor/meteor';
import { styles } from '../styles.scss';
import CheckIcon from '../../Icons/CheckIcon';
import UserListService from '/imports/ui/components/user-list/service';

const ROLE_VIEWER = Meteor.settings.public.user.role_viewer;

function LeavePopup(props) {

    const LOGOUT_CODE = '680';
    const { amIModerator, isBreakoutRoom, isMeteorConnected } = props
    const allowedToEndMeeting = amIModerator && !isBreakoutRoom;
    const [viewers, setViewers] = useState([])
    const [newHost, setNewHost] = useState("")

    useEffect(() => {
        if (amIModerator && isMeteorConnected) {
            UserListService.changeRole(newHost, 'MODERATOR')
        }
    }, [newHost])

    const leaveSession = () => {
        if (amIModerator) {
            setNewHost("")
            const { usersList } = props
            const viewer = usersList.filter((user) => user.role == ROLE_VIEWER)
            setViewers(viewer)
            if (viewer.length > 0 && viewer.length == usersList.length - 1) {
                setNewHost(viewer[viewer.length - 1].userId)
                UserListService.changeRole(newHost, 'MODERATOR')
                props.setShowList(true)
            } else {
                leaveCall()
            }
        } else {
            leaveCall()
        }
    }

    const leaveCall = () => {
        makeCall('userLeftMeeting');
        Session.set('codeError', LOGOUT_CODE);
    }

    const endMeeting = () => {
        logger.warn({
            logCode: 'moderator_forcing_end_meeting',
            extraInfo: { logType: 'user_action' },
        }, 'this user clicked on EndMeeting and confirmed, removing everybody from the meeting');
        makeCall('endMeeting');
    }

    const assignNewHost = (id) => {
        if (newHost != "" && id!=newHost) {
            UserListService.changeRole(newHost, 'VIEWER')
            setNewHost(id)
        }
    }

    const handleAssignUser = (e) => {
        console.log(e.target.id)
        assignNewHost(e.target.id)
    }

    const UserCard = (props) => {
        return (
            <div onClick={handleAssignUser} id={props.user.userId} className={`${styles.userOption} ${props.user.userId == newHost ? styles.userOptionActive : null}`} >
                <p>{props.user.name}</p>
                {
                    props.user.userId == newHost && <CheckIcon />
                }
            </div>
        )
    }

    return (
        <div className={props.isOpen ? `${styles.leavePopup} ${styles.activeLeavePopup}` : styles.leavePopup}>
            <div className={styles.leavePopupWrapper}>
                <div className={props.showList ? null: styles.outOptions}>
                    <div className={styles.viewerList}>
                        <h3>Assign a New Co-Host</h3>
                        <div className={styles.userList}>
                            {
                                viewers.map((user, key) => {
                                    return <UserCard key={key} user={user} />
                                })
                            }
                        </div>
                        {
                            (allowedToEndMeeting && isMeteorConnected) ? <button className={styles.endcallButton2} onClick={leaveSession}><EndcallIcon />Assign and Leave</button>
                                : null
                        }
                    </div>
                </div>
                <div className={props.showList ? styles.outOptions : null}>
                    {
                        (allowedToEndMeeting && isMeteorConnected) ? <button className={styles.endcallButton} onClick={endMeeting}><EndcallIcon />End Meeting for all</button>
                            : null
                    }
                    <button className={styles.leavecallButton} onClick={leaveSession}><LogoutIcon />Leave Meeting</button>
                </div>
            </div>
            <div className={styles.popupArrow}></div>
        </div>
    )
}

export default injectIntl(LeavePopup);