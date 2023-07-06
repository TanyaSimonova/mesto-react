import React from 'react';

function ImagePopup({isOpened, onClose, card}) {

  //console.log(card)

  return (
    <div className={`popup image-popup ${isOpened ? 'popup_active': ''}`}>
      <div className="popup-focus">
      <img className="popup-focus__image" alt="" style={{ backgroundImage: `url(${card.link})` }}/>
      <h3 className="popup-focus__subtitle">{card.name}</h3>
      <button
          className="close-button"
          type="button"
          form="popupFormElement"
          aria-label="закрыть"
          onClick={() => onClose()}
      />
      </div>
    </div>   
  );
}

export default ImagePopup;