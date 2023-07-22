import { useCards } from "../context/CardsContext";
import Menu from "./Menu";
import Play from "./Play";
import styles from "./Main.module.css";

export function Main() {
  const {stage} = useCards();

  return <main className={styles.main}>
    {stage !== "playing" && <Menu/>}
    {stage === "playing" && <Play/>}
  </main>;
}
