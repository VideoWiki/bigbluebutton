import React, { useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import EndcallIcon from '../icons/EndcallIcon';
import LogoutIcon from '../icons/LogoutIcon';
import { makeCall } from '/imports/ui/services/api';
import logger from '/imports/startup/client/logger';
import { styles } from '../styles.scss';

function LeavePopup(props) {

    const LOGOUT_CODE = '680';
    const { amIModerator, isBreakoutRoom, isMeteorConnected } = props
    const allowedToEndMeeting = amIModerator && !isBreakoutRoom;

    const leaveSession = () => {
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

    return (
        <div className={props.isOpen ? `${styles.leavePopup} ${styles.activeLeavePopup}` : styles.leavePopup}>
            <div className={styles.leavePopupWrapper}>
                {
                    (allowedToEndMeeting && isMeteorConnected) ? <button className={styles.endcallButton} onClick={endMeeting}><EndcallIcon />End Meeting for all</button>
                        : null
                }
                <button className={styles.leavecallButton} onClick={leaveSession}><LogoutIcon />Leave Meeting</button>
            </div>
            <div className={styles.popupArrow}>
            </div>
        </div>
    )
}

export default injectIntl(LeavePopup);