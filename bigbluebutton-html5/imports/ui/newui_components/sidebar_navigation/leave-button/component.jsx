import React, { useState } from 'react';
import Button from '/imports/ui/newui_components/button/component';
import Leavecall from './icons/Leavecall';
import { defineMessages, injectIntl } from 'react-intl';
import LeavePopupContainer from "./leave-popup/container"
import { styles } from './styles.scss';

function LeaveButton(props) {

    const { intl } = props
    const [isOpen, setIsOpen] = useState(false);
    const [showList, setShowList] = useState(false)

    window.addEventListener('click', function (e) {
        const ele = document.getElementById('leave-popup')
        if (ele && !ele.contains(e.target) && !e.target.id) {
            setIsOpen(false)
        }
    });

    const handleLeaveButtonToggle = () => {
        setIsOpen(!isOpen)
        if(!isOpen){
            setShowList(false)
        }
    }

    return (
        <div className={styles.leaveWrapper} id="leave-popup">
            <LeavePopupContainer isOpen={isOpen} showList={showList} setShowList={setShowList}/>
            {/* <Button
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
            /> */}
            <button className={styles.leaveBtn} onClick={handleLeaveButtonToggle}>
                <Leavecall />
            </button>
        </div>
    )
}

export default injectIntl(LeaveButton);