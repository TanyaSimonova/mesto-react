import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import api  from '../utils/api.js';
import {CurrentUserContext} from '../context/CurrentUserContext.js';
import Card from './Card.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard

  React.useEffect(() => {
    api.getItems().then(res => {
      setCards(res)     
    })
    .catch((error => console.log(`Ошибка при загрузке данных карточек ${error}`)))
  }, []);

  function handleCardLike (card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
      
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error => console.log(`Ошибка при добавлении лайка ${error}`)));
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error => console.log(`Ошибка при удалении лайка ${error}`)));
    };
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((error => console.log(`Ошибка при удалении карточки ${error}`)));
  }

  const handleUpdateUser = (currentUser) => {
    api.setUser(currentUser).then((currentUser) => {
      setCurrentUser(currentUser);
      closeAllPopups();
    })
    .catch((error => console.log(`Ошибка при редактировании данных профиля ${error}`)));
  }
  
  const handleUpdateAvatar = (currentUser) => {
    api.setUserAvatar(currentUser).then((currentUser) => {
      setCurrentUser (currentUser);
      closeAllPopups();
    })
    .catch((error => console.log(`Ошибка при редактировании фото профиля ${error}`)));
  }

  const handleAddPlace = (newCard) => {
    api.addItems(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((error => console.log(`Ошибка при добавлении карточки ${error}`)));
  }

  React.useEffect(() => {
    api.getUser().then(res => {
      setCurrentUser(res);
    })
    .catch((error => console.log(`Ошибка при загрузке данных пользователя ${error}`)))
  }, []);

  function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  React.useEffect(() => {
    const handleEsc = (event) => {
       if (event.key === 'Escape') {
        closeAllPopups();
      }   
    }
    
    if(isOpen) {

      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
      }
    }    
  }, [isOpen]);


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfilePopupOpen}onAddPlace={handleAddPlacePopupOpen} onEditAvatar={handleEditAvatarPopupOpen} 
          cards={cards} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} > 
          {cards.map(card => (
              <Card key={card._id} card={card} />             
            ))}
        </Main>
        <Footer />
        <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <PopupWithForm isOpened={false} onClose={false} name="delete-popup" title="Вы уверены?" label="Да" button="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
