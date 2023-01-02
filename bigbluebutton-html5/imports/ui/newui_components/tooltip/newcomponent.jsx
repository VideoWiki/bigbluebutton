import React from 'react';
import { styles } from './styles.scss'
export default function Tooltip(props) {
    return (
        <>
            <div className={styles.tooltipIcon}>
                {
                    props.title ?
                        <div className={styles.tooltipWrapper}>
                            <div className={styles.tooltipTitle}><span>{props.title}</span></div>
                            {/* <div className={styles.tooltipArrow}></div> */}
                        </div> : null
                }
                {
                    props.children
                }
            </div>
        </>
    )
}