import { useRef, useState } from "react";

export function CardItem({ card, onCardClick }) {
  const [transform, setTransform] = useState("");
  const cardDOM = useRef(null);

  const cardRotateStyle = {
    transform: transform,
  };
  const defaulCoords = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

  function handlerRotation(e) {
    const el = cardDOM.current.getBoundingClientRect();
    setTransform(`perspective(1000px) rotateX(${((e.clientY - el.y - el.height / 2) / 10) * 1.4}deg) rotateY(${((e.clientX - el.x - el.width / 2) / 10) * -2}deg) scale3d(1, 1, 1)`);
  }

  return <li ref={cardDOM} style={cardRotateStyle} className="card" onMouseLeave={() => setTransform(defaulCoords)} onMouseMove={(e) => handlerRotation(e)} onClick={() => onCardClick({ ...card })}>
    <img src={card.url} alt={card.name} />
    <img className="card__frame" src={require("../img/frame.png")} alt="frame" />
  </li>;
}
