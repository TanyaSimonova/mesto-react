import React from 'react';
import api  from '../utils/api.js';
import Card from './Card.js';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const [userName, setUserName] = React.useState('Санчо Панса');
  const [userDescription, setUserDescription] = React.useState('оруженосец Дон Кихота');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([])

   const handleCardClick = (card) => {
    onCardClick(card);
  }

  React.useEffect(() => {
    api.getUser().then(res => {
      
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
    .catch((error => console.log(`Ошибка при загрузке данных пользователя ${error}`)))
  }, []);


  React.useEffect(() => {
    api.getItems().then(res => {
      setCards(res)
      
    })
    .catch((error => console.log(`Ошибка при загрузке данных карточек ${error}`)))
  }, []);

  return (
    <>
      <main className="main">
        <section className="profile">
          <button 
          type="button" 
          className="profile__button"
          onClick={onEditAvatar} 
          >
            <img className="profile__avatar" alt="ваша фотография" style={{ backgroundImage: `url(${userAvatar})` }}/>
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__speciality">{userDescription}</p>
            <button
              className="edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile} 
            >
              <span className="edit-button__icon" />
            </button>
          </div>
          <button
            className="add-button"
            type="button"
            aria-label="добавить карточку"
            onClick={onAddPlace}
          >
            <span className="add-button__icon" />
          </button>
        </section>
        <section className="elements">
          <ul className="element-list">
            {cards.map(card => (
              <Card key={card._id} card={card} onCardClick={handleCardClick}/>             
            ))}
          </ul>
        </section>
      </main>
    </>   
  );
}

export default Main;
