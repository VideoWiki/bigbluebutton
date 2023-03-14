import React, { useEffect, useState } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
// import EndcallIcon from '../icons/EndcallIcon';
// import LogoutIcon from '../icons/LogoutIcon';
// import { makeCall } from '/imports/ui/services/api';
// import logger from '/imports/startup/client/logger';
// import { Meteor } from 'meteor/meteor';
import { styles } from '../styles.scss';

function WebcamOptionsPopup(props) {

    const { label, buttonLabel, handleOpenAdvancedOptions } = props
    return (
        <div className={styles.popupCover}>
            <div className={styles.webcamPopup}>
                <div className={styles.webcamPopupWrapper}>
                    <div className={styles.outWOptions}>
                        <button className={styles.advOptButton} onClick={handleOpenAdvancedOptions} >{buttonLabel}</button>
                        <span className={styles.webcamLabel} >{label}</span>
                    </div>
                </div>
                <div className={styles.wPopupArrow}></div>
            </div>
        </div>
    )
}

export default injectIntl(WebcamOptionsPopup);