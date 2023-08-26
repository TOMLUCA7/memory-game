import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [disabled, setDisabled] = useState(false);

  //* compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
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
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //* start a new game Automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  // Check if all cards are matched
  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched) {
      setTimeout(
        () =>
          toast.success(
            "Congratulations! You've completed the game! 🎉 Press on the new game to start again!"
          ),
        1000
      );
    }
  }, [cards]);

  //* shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //* handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //* reset choices and turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <ToastContainer />
      <h1>Memory Game</h1>
      <p className="">Turns : {turns}</p>
      <button onClick={shuffleCards}>New Game</button>

      {/* cards grid */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            CardsGrid={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
