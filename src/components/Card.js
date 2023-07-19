import React from 'react';
import {CurrentUserContext} from '../context/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( `element-list__icon ${isLiked && 'element-list__icon_active'}` );

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }
  
  return (
    <li className="element-list__item" key={card._id}>
      <img className="element-list__image" alt={card.name} src={card.link} onClick={handleClick}/>
      <h2 className="element-list__title">{card.name}</h2>
      <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
          <div className="element-list__score" >{card.likes.length}</div>
      </button>
      { isOwn && <button className="element-list__delete" type="button" 
      onClick={handleDeleteClick} 
      />}
    </li>              
  )
}

