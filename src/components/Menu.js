import { useState } from "react";
import { useCards } from "../context/CardsContext"
import Modal from "./Modal";

export default function Menu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {winScore, score, best, dispatch, uniqueCards} = useCards();

    return <div className="menu">
    <>
      {score === winScore && <h2>Congratulations, you won</h2>}
      {score === 0 && <h2>Start the game</h2>}
      {score > 0 && <h2>You lose. Try again</h2>}
      {score === 0 && <p>If you don't find it entertaining, at least you'll learn a couple of new facts.</p>}
    </>
    <div className="stats">
      {!!score && <span>score: {score}</span>}
      {!!score && <span>best: {best}</span>}
    </div>
    <button onClick={() => dispatch({type: "started", payload: uniqueCards()})}>Start</button>
    <button onClick={() => setIsModalOpen(true)}>Rules</button>
    {isModalOpen && <Modal onButton={() => setIsModalOpen(false)}/>}
  </div>
}