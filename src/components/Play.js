import Spinner from "./Spinner";
import CardList from "./CardList";
import styles from "./Play.module.css";
import { useCards } from "../context/CardsContext";
import { useEffect } from "react";

export default function Game() {
    const {score, isLoading, fact, getFact} = useCards();

    useEffect(() => {
        if (score >= 0) getFact();
    }, [score]);

    return <>
      <blockquote className={styles.message}>{fact}</blockquote>
      <CardList/>
      {isLoading && <Spinner/>}
    </>
}
  