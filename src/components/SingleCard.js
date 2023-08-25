import React from "react";
import "./SingleCard.css";

const SingleCard = ({ CardsGrid, handleChoice }) => {
  const handleClick = () => {
    handleChoice(CardsGrid);
  };

  return (
    <div className="card">
      <div className="">
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
