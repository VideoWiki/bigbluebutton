import React from "react"
import { styles } from '../layout-popup/styles.scss'
import CustomTemplate from '../icons/CustomTemplate'
import SmartTemplate from '../icons/SmartTemplate'
import { useState } from "react"
import { useEffect } from "react"
import LayoutIcon from "../icons/LayoutIcon"
import LayoutPopup from '../layout-popup/container'

function LayoutButton(props) {

    const [isOpen, setIsOpen] = useState(false);

    window.addEventListener('click', function (e) {
        if (!document.getElementById('layout-popup').contains(e.target)) {
            setIsOpen(false)
        }
    });

    const handleLayoutButtonToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.layoutIcon} id="layout-popup">
            <div className={styles.layoutIconWrapper}>
                <div className={styles.popupIconDiv} onClick={handleLayoutButtonToggle}>
                    <LayoutIcon />
                </div>
                {
                    isOpen ?
                    <LayoutPopup/> : null
                }
            </div>
        </div>
    )
}

export default LayoutButton;
