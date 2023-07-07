import React from 'react';

export default function Card({ onCardClick, card }) {

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="element-list__item" onClick={handleClick}>
      <img className="element-list__image" alt={card.name} src={card.link} />
      <h2 className="element-list__title">{card.name}</h2>
      <button className="element-list__icon" type="button">
          <div className="element-list__score" />
      </button>
      <button className="element-list__delete" type="button" />
    </li>              
  )
}
