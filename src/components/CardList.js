import { CardItem } from "./CardItem";

export function CardList({ collection, onCardClick }) {
  return <ul className="cards">
    {collection.map(card => <CardItem key={card.name} card={card} onCardClick={onCardClick} />)}
  </ul>;
}
