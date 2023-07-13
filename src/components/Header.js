export function Header({ score, level, best, isMenuOpen }) {
  return <header>
    <h1>Memory Game</h1>
    {!isMenuOpen && <div className="stats">
      <span>level: {level}</span>
      <span>score: {score}</span>
      <span>best: {best}</span>
    </div>}
  </header>;
}
