import React from 'react';
import api  from '../utils/api.js';
import Card from './Card.js';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([])


   const handleCardClick = (card) => {
    onCardClick(card);
  }

  //console.log(card)

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

/*
{cards.map(item => (
  <li className="element-list__item" key={item._id}>
  <img className="element-list__image" alt="" style={{ backgroundImage: `url(${item.link})` }} />
  <h2 className="element-list__title">{item.name}</h2>
  <button className="element-list__icon" type="button">
    <div className="element-list__score" />
  </button>
  <button className="element-list__delete" type="button" />
</li>              
  ))}
  */


    /*React.useEffect(() =>{
    api.getUser().then(res => {
      const cardsFromApi = res.results.map(item => ({
        id: item.id,
        src: item.urls.regular,
        alt: item.alt_description,
        title: item.description,
        subtitle: item.user.name,
      }));
  
      setCards(cardsFromApi);
    })
    .finally(() => setIsLoading(false));
  }
  
  }, []);
  */
  /*React.useEffect(() => {
    api.getUser().then(res => {
      const userInfo = res.results.map(item => ({
        name: item.name,
        description: item.about,
      }));
      setUserName(userInfo.name);
      setUserDescription(userInfo.description);
    })
    .catch((error => console.log(`Ошибка при загрузке данных пользователя ${error}`)))
  }) */

   /* React.useEffect(() => {
    api.getItems().then(res => {
      const cardsFromApi = res.map(item =>
        setCard(cardsFromApi))
      //setCard(res)
      console.log(res)
      
    })
    .catch((error => console.log(`Ошибка при загрузке данных карточек ${error}`)))
  }, []);
  */

 /* React.useEffect(() => {
    api.getItems().then(res => {
      res.map(item =>
        setCards(item))
      //setCard(res)
      console.log(res)
      
    })
    .catch((error => console.log(`Ошибка при загрузке данных карточек ${error}`)))
  }, []);
  */