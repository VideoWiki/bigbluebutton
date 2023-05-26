import React, { useEffect, useState } from "react";
import { styles } from '../styles.scss'

export default function SelectUserModal(props) {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(props.users);
  }, [])

  const handleCreateDuo = () => {
    const users = props.users.map((u)=>{
      return (
        {
          "id": u.userId,
          "image":"https://firebasestorage.googleapis.com/v0/b/teamdynamics-a9ed1.appspot.com/o/fateahmad0%40gmail.com%2Fprofile_pictures%2Fcache25.png?alt=media&token=27b549b5-a540-4e5f-942c-64daac75bdae",
          "full_name": u.userName,
          "title":"Flutter dev"
       }
      )
    })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        "participants" : users,
        "room_type": "virtual"
      }),
      redirect: 'follow'
    };

    fetch("https://teamdynamics.getboarded.com/unique_duo_groups", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        props.updateState({ formLevel: 2, td_data: result });
      })
      .catch(error => console.log('error', error));
  }

  const onChage = (userId) => {
    return (ev) => {
      const idxUser = users.findIndex((user) => user.userId === userId);
      const usersCopy = [...users];
      usersCopy[idxUser].checked = !usersCopy[idxUser].checked;
      props.updateState({ users: usersCopy });
      setUsers(usersCopy);
      return;
    };
  }

  return (
    <div className="select-user-modal">
      <div className="select-user-list">
        {
          users.map((obj, idx) => {
            return <div className={styles.userBox}>
              <span className={styles.round}>
                <input
                  type="checkbox"
                  id={`itemId${idx}`}
                  defaultChecked={obj.checked}
                  onChange={onChage(obj.userId)}
                />
                <label htmlFor={`itemId${idx}`}>
                  <input
                    type="checkbox"
                    id={`itemId${idx}`}
                    defaultChecked={obj.checked}
                    onChange={onChage(obj.userId)}
                  />
                </label>
              </span>
              <span className={styles.userNameLabel}>{obj.userName}</span>
            </div>
          })
        }
      </div>
    </div>
  )
}