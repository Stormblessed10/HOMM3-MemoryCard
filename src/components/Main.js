import { useCards } from "../context/CardsContext";
import { CardList } from "./CardList";
import Menu from "./Menu";
import Spinner from "./Spinner";
import styles from "./Main.module.css";

export function Main() {
  const {isLoading, stage} = useCards();

  return <main className={styles.main}>
    {stage !== "playing" && <Menu/>}
    {stage === "playing" && (!isLoading ? <>
    <blockquote className={styles.message}>Hello</blockquote>
    <CardList/>
    </> : <Spinner/>)}
  </main>;
}
