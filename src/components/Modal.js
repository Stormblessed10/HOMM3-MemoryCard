import styles from "./Modal.module.css";

export default function Modal({onButton}) {
    return <ul className={styles.modal}>
        <li>To get a point, you need to choose a card.</li>
        §
        <li>You cannot choose the same card twice per level.</li>
        §
        <li>Random facts will be displayed at the top. Why? Why not.</li>
        <li><button onClick={onButton}>ok</button></li>
  </ul>
}