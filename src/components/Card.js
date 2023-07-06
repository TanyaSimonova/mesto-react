import React from 'react';

export default function Card({ onCardClick, card }) {

  const handleClick = () => {
    onCardClick(card);
  }

  //console.log(card)

  return (
    <li className="element-list__item" key={card._id} onClick={handleClick}>
      <img className="element-list__image" alt="" style={{ backgroundImage: `url(${card.link})` }} />
      <h2 className="element-list__title">{card.name}</h2>
      <button className="element-list__icon" type="button">
          <div className="element-list__score" />
      </button>
      <button className="element-list__delete" type="button" />
    </li>              
  )
}
