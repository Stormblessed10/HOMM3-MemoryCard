import { useCards } from "../context/CardsContext";
import styles from "./Header.module.css"

export function Header() {
  const { score, level, best, stage } = useCards();

  return <header className={styles.header}>
    <h1>Memory Game</h1>
    {stage === "playing" && <div className={styles.stats}>
      <span>level: {level}</span>
      <span>score: {score}</span>
      <span>best: {best}</span>
    </div>}
  </header>;
}
