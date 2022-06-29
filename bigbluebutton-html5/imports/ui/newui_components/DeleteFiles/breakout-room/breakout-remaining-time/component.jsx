import React from 'react';
import {styles} from "../styles.scss";

const BreakoutRemainingTime = props => (
  <span data-test="breakoutRemainingTime" className={styles.duration}>
    {props.children}
  </span>
);


export default BreakoutRemainingTime;
