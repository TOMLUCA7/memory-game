import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const CardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("not good");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset choices and turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* cards grid */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            CardsGrid={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
