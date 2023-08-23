import { useState } from "react";
import "./App.css";

const CardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* card grid */}
      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="">
              <img src={card.src} className="front" alt="card-front" />
              <img src="/img/cover.png" alt="cover card" className="back" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
