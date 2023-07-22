import { useRef, useState } from "react";
import { useCards } from "../context/CardsContext";
import styles from "./CardItem.module.css";

export function CardItem({ card }) {
  const [transform, setTransform] = useState("");
  const cardDOM = useRef(null);
  const { dispatch, clicked, levelCards } = useCards();

  const cardRotateStyle = {
    transform: transform,
  };
  const defaulCoords = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  function handlerRotation(e) {
    const el = cardDOM.current.getBoundingClientRect();
    setTransform(`perspective(1000px) rotateX(${((e.clientY - el.y - el.height / 2) / 10) * 1.4}deg) rotateY(${((e.clientX - el.x - el.width / 2) / 10) * -2}deg) scale3d(1, 1, 1)`);
  }

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

  function handleClick(card) {
    if (clicked.includes(card)) return dispatch({type: "clickedWrong"});
    dispatch({type: "clickedRight", payload: {card, shuffle: shuffle(levelCards)}});
  }

  return <li ref={cardDOM} style={cardRotateStyle} className={styles.card} onMouseLeave={() => setTransform(defaulCoords)} onMouseMove={(e) => handlerRotation(e)} onClick={() => handleClick(card.name)}>
    <img src={card.url} alt={card.name} />
    <img className={styles["frame"]} src="frame.png" alt="frame" />
  </li>;
}