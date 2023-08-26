import React from "react";
import "./SingleCard.css";

const SingleCard = ({ CardsGrid, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(CardsGrid);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="">
          <img src={CardsGrid.src} className="front" alt="card-front" />
          <img
            onClick={handleClick}
            src="/img/cover.png"
            alt="cover card"
            className="back"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
