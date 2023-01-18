import React from "react"
import { styles } from './styles.scss'
import CustomTemplate from '../icons/CustomTemplate'
import SmartTemplate from '../icons/SmartTemplate'
import { useState } from "react"
import { useEffect } from "react"

function Popup(props) {
    const { handleSelectChange, selectedLayout, isModerator} = props
    const [smartLayout, setSmartLayout] = useState(false);
    const [isAll, setIsAll] = useState(false);

    useEffect(() => {
        if (selectedLayout == "smart" || selectedLayout == "smartPush") {
            setSmartLayout(true)
            if (selectedLayout == "smartPush") {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
        } else {
            setSmartLayout(false)
            if (selectedLayout == "customPush") {
                setIsAll(true)
            } else {
                setIsAll(false)
            }
        }

    }, [props])

    const handleLayoutClick = (lay) => {
        if (lay == "smart") {
            handleSelectChange('selectedLayout', isAll && isModerator ? "smartPush" : "smart")
        } else {
            handleSelectChange('selectedLayout', isAll && isModerator ? "customPush" : "custom")
        }
    }

    const handleCheckClick = () => {
        if (isModerator) {
            setIsAll(!isAll)
        }
    }

    return (
        <>
            <div className={styles.layoutArrow}></div>
            <div className={styles.layoutPopup}>
                <h4>Layout</h4>
                {isModerator ? <label htmlFor="selectLayoutCheckbox" className={styles.selectLayoutLabel} key="select-layout-checkbox">
                    <input
                        type="checkbox"
                        id="selectLayoutCheckbox"
                        className={styles.freeJoinCheckbox}
                        onChange={handleCheckClick}
                        checked={isAll}
                    // aria-label={intl.formatMessage(intlMessages.freeJoinLabel)}
                    />
                    <span>Mark to change layout for all the users in the meeting</span>
                </label> : null}
                <div className={styles.layoutCenter}>
                    <div className={`${styles.layLeft} ${smartLayout ? styles.fillBorder : null}`} onClick={() => handleLayoutClick("smart")}>
                        <SmartTemplate />
                        <p>Smart Layout</p>
                    </div>
                    <div className={`${styles.layRight} ${!smartLayout ? styles.fillBorder : null}`} onClick={() => handleLayoutClick("custom")}>
                        <CustomTemplate />
                        <p>Custom Layout</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;
