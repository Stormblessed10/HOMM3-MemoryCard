import { useCards } from "../context/CardsContext";
import { CardList } from "./CardList";
import Menu from "./Menu";
import Spinner from "./Spinner";
import styles from "./Main.module.css";

export function Main() {
  const {isMenuOpen, isLoading} = useCards();

  return <main className={styles.main}>
    {isMenuOpen && <Menu/>}
    {!isMenuOpen && (!isLoading ? <>
    <blockquote className={styles.message}>Hello</blockquote>
    <CardList/>
    </> : <Spinner/>)}
  </main>;
}
