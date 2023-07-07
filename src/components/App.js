import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { PopupWithForm } from './PopupWithForm.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard


  const handleCardClick = (card) => {
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
      <Header />
      <Main onEditProfile={handleEditProfilePopupOpen}
        onAddPlace={handleAddPlacePopupOpen}
        onEditAvatar={handleEditAvatarPopupOpen}
        onCardClick={handleCardClick}
        />
      <Footer />
      <PopupWithForm isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} name="profile-popup" title="Редактировать профиль" label="сохранить" button="Coxpaнить">
        <input
          className="popup-form__input popup-form__input_type_name"
          type="text"
          placeholder="Имя"
          id="name"
          name="name"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span className="popup-form__error popup-form__error_name" />
        <input
          className="popup-form__input popup-form__input_type_speciality"
          type="text"
          placeholder="О себе"
          id="speciality"
          name="speciality"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span className="popup-form__error popup-form__error_speciality" />
      </PopupWithForm> 
      <PopupWithForm isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} name="avatar-popup" title="Обновить аватар" label="сохранить" button="Coxpaнить">
        <input
          className="popup-form__input popup-form__input_type_avatar"
          type="url"
          placeholder="Ссылка на картинку"
          id="avatar"
          name="avatar"
          required=""
        />
        <span className="popup-form__error popup-form__error_avatar" />
      </PopupWithForm>
      <PopupWithForm isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} name="card-popup" title="Новое место" label="Создать" button="Создать">
        <input
          className="popup-form__input popup-form__input_type_name"
          type="text"
          placeholder="Название"
          name="name"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span className="popup-form__error popup-form__error_name" />
        <input
          className="popup-form__input popup-form__input_type_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required=""
        />
        <span className="popup-form__error popup-form__error_link" />
      </PopupWithForm>
      <PopupWithForm isOpened={false} onClose={false} name="delete-popup" title="Вы уверены?" label="Да" button="Да">
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
