import React from 'react';
import {styles} from './styles.scss'
export default function Tooltip(props) {
    console.log("tips", props);
    return (
        <>
            <div className={styles.tooltipIcon}>
                <div className={styles.tooltipWrapper}>
                    <div className={styles.tooltipTitle}><span>{props.title}</span></div>
                    {/* <div className={styles.tooltipArrow}></div> */}
                </div>
                {
                    props.children
                }
            </div>
        </>
    )
}