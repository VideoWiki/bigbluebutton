import React from 'react';
import {styles} from '../../styles.scss'

const BreakoutRemainingTime = props => (
  <span data-test="breakoutRemainingTime" className={styles.breakoutRemainingTime}>
    {props.children}
  </span>
);


export default BreakoutRemainingTime;
