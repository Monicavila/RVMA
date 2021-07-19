import React, {useState} from "react";
import { v1 as uuid } from "uuid";
import styles from "./createRoom.module.scss";

const Meeting = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }
  function turnOff() {
    props.history.push("/back-soon");
  }
  const [urlLink, seturlLink] = useState('');
  return (
    <div className={styles.containerCR}>
      <div className={styles.creatingRoom}>
      <div className={styles.left_part}>
        <div className={styles.on}></div>
      </div>
      <div className={styles.centerDown}>
      <div className={styles.slider}>
            <div className={styles.switch_button}>
            {/*Checkbox*/}
            <input type="checkbox" name="switch_button" id="switch_label" onClick={turnOff} className={styles.switch_button__checkbox} />
            {/*switch*/}
            <label htmlFor="switch_label" className={styles.switch_button__label}>
            </label>
            </div>
          </div>
      </div>
      <div className={styles.right_part}>
        <div className={styles.logobla}></div>
        <div className={styles.letsnack}>
          <p className={styles.snacktogether}>
            Let's snack together while meeting is going on.
            <br />
            <br />
            It's FREE! Try it!
          </p>
        </div>
        <div className={styles.newmeet} onClick={create}>
          NEW MEETING
        </div>
        <input type="text" placeholder="Enter your URL" className={styles.link_input} onChange={(link) => seturlLink(link.target.value)}/>
        <div path={"/"} onClick={() => window.location = urlLink}  className={styles.join}>Join!</div>
      </div>
    </div>
    </div>
  );
};

export default Meeting;
