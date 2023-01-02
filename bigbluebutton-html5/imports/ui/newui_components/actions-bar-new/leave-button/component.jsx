import React, { useState } from 'react';
import Button from '/imports/ui/newui_components/button/component';
import Leavecall from '../icon/Leavecall';
import { defineMessages, injectIntl } from 'react-intl';
import LeavePopupContainer from "./leave-popup/container"
import { styles } from './styles.scss';

function LeaveButton(props) {

    const { intl } = props
    const [isOpen, setIsOpen] = useState(false);

    window.addEventListener('click', function (e) {
        if (!document.getElementById('leave-popup').contains(e.target)) {
            setIsOpen(false)
        }
    });

    const handleLeaveButtonToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div id="leave-popup" className={styles.leaveWrapper}>
            <LeavePopupContainer isOpen={isOpen}/>
            <Button
                customIcon={<Leavecall />}
                className={styles.iconBg}
                label={!isOpen ? intl.formatMessage({
                    id: 'app.navBar.settingsDropdown.leaveSessionLabel',
                }) : null}
                color={'primary'}
                hideLabel
                circle
                size="lg"
                onClick={handleLeaveButtonToggle}
            />
        </div>
    )
}

export default injectIntl(LeaveButton);