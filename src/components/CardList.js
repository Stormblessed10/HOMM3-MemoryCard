import { useCards } from "../context/CardsContext";
import { CardItem } from "./CardItem";
import styles from "./CardList.module.css";

export function CardList() {
  const { levelCards } = useCards();

  return <ul className={styles.cards}>
    {levelCards.map((card) => <CardItem key={card.name} card={card} />)}
  </ul>;
}