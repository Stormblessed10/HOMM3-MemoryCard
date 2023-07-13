import { useState } from "react";

export function Main({ children, isMenuOpen, onStartGame, score, best, winScore }) {
  const [modal, setModal] = useState(false);

  return <main>
    {isMenuOpen ? <div className="menu">
      <>
        <h2>{score === winScore ? "Congratulations, you won" : score === 0 ? "Start the game" : "You lose . Try again"}</h2>
        {score === 0 ? <p>"If you don't find it entertaining, at least you'll learn a couple of new facts."</p> : ""}
      </>
      <div className="stats">
        {!!score && <span>score: {score}</span>}
        {!!score && <span>best: {best}</span>}
      </div>
      <button onClick={onStartGame}>Start</button>
      <button onClick={() => setModal(true)}>Rules</button>
      {modal && <ul className="modal">
        <li>To get a point, you need to choose a card.</li>
        §
        <li>You cannot choose the same card twice per level.</li>
        §
        <li>Random facts will be displayed at the top. Why? Why not.</li>
        <li><button onClick={() => setModal(false)}>ok</button></li>
      </ul>}
    </div> : <>{children}</>}
  </main>;
}
