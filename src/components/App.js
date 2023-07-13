import { useEffect, useState } from "react";
import { cards } from "../data";
import { CardList } from "./CardList";
import { Header } from "./Header";
import { Main } from "./Main";

export default function App() {
  const [level, setLevel] = useState(1);
  const [collection, setCollection] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const winScore = 3;

  function shuffle(arr) {
    const newArr = arr;
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  }

  function reset() {
    setScore(0);
    setLevel(1);
    setClicked([]);
  }

  function handleStartGame() {
    reset();
    setIsMenuOpen(false);
  }

  function handleCardClick(card) {
    if (clicked.find(click => click.name === card.name)) return setIsMenuOpen(true);
    setClicked(clicked => [...clicked, card]);
    setCollection(collection => shuffle(collection));
    setScore(score => score + 1);
  }

  useEffect(() => {
    function createDeck() {
      const uniqueIndexes = new Set();
      while (uniqueIndexes.size !== 4 * level) {
        uniqueIndexes.add(Math.floor(Math.random() * cards.length));
      }

      return Array.from(uniqueIndexes, (i) => cards[i]);
    }

    setBest(best => score >= best ? score : best);

    if (score === [4, 12, 24, 40][level - 1]) {
      setLevel(level => level + 1);
      setClicked([]);
    }

    if (!clicked[0]) setCollection(createDeck());

  }, [clicked, score, level]);

  useEffect(() => {
    let options = {
      method: 'GET',
      headers: { 'x-api-key': 'zKIE1l5vAdRj8Vpwz2Fy/A==c8NXBESJJrtxguKo' }
    }

    async function fetching() {
      setIsLoading(true);
      const res = await fetch("https://api.api-ninjas.com/v1/facts?limit=1", options);
      const data = await res.json();
      setMessage(data[0].fact);
      setIsLoading(false);
    }
    
    if (score >= 0) fetching()
    console.log(["hellop"])
  }, [score]);

  useEffect(() => {
    if (score === winScore) {
      setIsMenuOpen(true);
      document.body.style.background = "url(https://usagif.com/wp-content/uploads/gif/confetti-4.gif) center center / cover no-repeat";
    } else {
      document.body.style.background = "";
    }
  }, [score]);

  return <div className={score === winScore ? "app light-theme" : "app"}>
    <Header best={best} level={level} score={score} isMenuOpen={isMenuOpen}/>
    <Main winScore={winScore} best={best} score={score} isMenuOpen={isMenuOpen} onStartGame={handleStartGame}>
      <blockquote className="message">
      {isLoading ? <span className="loading">Loading...</span> : <span>{message}</span> }
      </blockquote>
      <CardList collection={collection} onHover={() => 1} onCardClick={handleCardClick}/>
    </Main>
  </div>
}