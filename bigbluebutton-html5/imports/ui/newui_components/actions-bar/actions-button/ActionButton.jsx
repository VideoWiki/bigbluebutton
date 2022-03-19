import {styles} from "./actionbutton.scss"
import React from 'react';

const ActionButton = ({icon, ...rootDOMAttributes}) => {
    console.log({icon, ...rootDOMAttributes})
    return (
        <div>
            <button className={styles.actionBtn} {...rootDOMAttributes}>
            <img src={icon} alt=""/>
            </button>
        </div>
    )
}

export default ActionButton;