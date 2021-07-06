import styles from "./landing.module.scss";

function Landing(props) {
  function turnOn() {
    props.history.push("/");
  }

  return (
    <div className={styles.Landing_page}>
        <div className={styles.left_side}></div>
        <div className={styles.center_down}>
          <div className={styles.slider}>
            <div className={styles.switch_button}>
            {/*Checkbox*/}
            <input type="checkbox" name="switch_button" id="switch_label" onClick={turnOn} className={styles.switch_button__checkbox} />
            {/*switch*/}
            <label for="switch_label" className={styles.switch_button__label}>
            </label>
            </div>
          </div>
        </div>
        <div className={styles.right_side}>
          <div className={styles.logo}></div>
          <div className={styles.startmeeting}></div>
        </div>
    </div>
  );
}
export default Landing;
