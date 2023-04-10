import React, { Component, useEffect } from 'react';
import { styles } from './styles';
import Micon from "./icons/Micon"
import Micoff from "./icons/Micoff"
import Webcamon from "./icons/Webcamon"
import Webcamoff from "./icons/Webcamoff"

export default function Actions(props) {

    const { handleToggMic, handleToggWebcam, enableMic, enableWebcam, isMuted, setInitialMicStatus } = props

    useEffect(()=>{
        setInitialMicStatus(!isMuted)
    },[isMuted])

    return (
        <div className={styles.selectorDiv}>
            <button className={enableMic ? styles.enableResource : null} onClick={handleToggMic}>
                {enableMic ? <Micon /> : <Micoff />}
            </button>
            <button className={enableWebcam ? styles.enableResource : null} onClick={handleToggWebcam}>
                {enableWebcam ? <Webcamon /> : <Webcamoff />}
            </button>
        </div>
    )
}