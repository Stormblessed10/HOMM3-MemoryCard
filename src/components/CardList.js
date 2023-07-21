import { useCards } from "../context/CardsContext";
import { CardItem } from "./CardItem";

export function CardList() {
  const { levelCards } = useCards();

  return <ul className="cards">
    {levelCards.map(card => <CardItem key={card.name} card={card} />)}
  </ul>;
}
