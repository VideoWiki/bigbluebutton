import React, { useEffect, useState } from "react";
import { styles } from '../styles.scss'

export default function Runs(props) {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(props.users);
  }, [])

  const startRun = () => {

  }

  return (
    <div className="select-user-modal">
      <div className="select-user-list">
        {
          users.map((obj, idx) => {
            return <div className={styles.userBox}>
              <span className={styles.userNameLabel}>{obj.userName}</span>
            </div>
          })
        }
      </div>
      <div className="select-run-list">
        <div><p>Run 1</p></div>
        <div><p>Run 2</p></div>
      </div>
      <div className={styles.smBottomDiv}>
        <button className={styles.create1} onClick={startRun}>Start Run</button>
      </div>
    </div>
  )
}