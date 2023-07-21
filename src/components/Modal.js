export default function Modal({onButton}) {
    return <ul className="modal">
        <li>To get a point, you need to choose a card.</li>
        §
        <li>You cannot choose the same card twice per level.</li>
        §
        <li>Random facts will be displayed at the top. Why? Why not.</li>
        <li><button onClick={onButton}>ok</button></li>
  </ul>
}