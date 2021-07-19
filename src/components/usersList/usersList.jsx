import styles from "../room/room.module.scss";
import React, { useState } from "react";

function UsersList (props) {
    const [usersList, setUsersList] = useState(false);
    const userNames = props.userNames;
    return(
        <div id="toggle"
          className={styles.userslist}
          onClick={() => {
            setUsersList((previousState) => !previousState);
          }}
        >
          {usersList === true
            ? !!userNames && userNames.map((username, index) => (
              <div className={styles.bg_list}>
                <div className={styles.img_user} key={index}>
                  <div className={styles.user_name}>{username}</div>
                </div>
              </div>
              ))
            : null}
        </div>
    )
}

export default UsersList;