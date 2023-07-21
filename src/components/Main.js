import { useCards } from "../context/CardsContext";
import { CardList } from "./CardList";
import Menu from "./Menu";

export function Main() {
  const {isMenuOpen} = useCards();

  if (isMenuOpen) return <main><Menu/></main>

  return <main>
    <blockquote className="message"></blockquote>
    <CardList/>
  </main>;
}
