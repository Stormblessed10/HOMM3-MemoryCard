import { useState } from "react";
import { useCards } from "../context/CardsContext"
import Modal from "./Modal";
import styles from "./Menu.module.css";

export default function Menu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {score, best, dispatch, stage} = useCards();

    return <div className={styles.menu}>
      {stage === "won" && <h2>Congratulations, you won</h2>}
      {stage === "lost" && <h2>You lose. Try again</h2>}
      {stage === "default" && <h2>Start the game</h2>}
      {stage === "default" && <p>Even if you don't like the game, you will learn a couple of new facts</p>}
      {stage !== "default" && 
      <div className={styles.stats}>
          <span>score: {score}</span>
          <span>best: {best}</span>
      </div>
      }
      <button onClick={() => dispatch({type: "started"})}>Start</button>
      <button onClick={() => setIsModalOpen(true)}>Rules</button>
      {isModalOpen && <Modal onButton={() => setIsModalOpen(false)}/>}
  </div>
}