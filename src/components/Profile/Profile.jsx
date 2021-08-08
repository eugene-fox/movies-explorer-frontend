import { useEffect, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Header } from '../Header/Header';
import './Profile.css';

export const Profile = ({
  isLoggedIn,
  currentUser,
  onUpdateUser,
  onLogout
}) => {

  // const currentUser = useContext(CurrentUserContext);

  // useEffect = (() => {

  // })

  // Данные пользователоя для изменения
  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email
  });

  // Обработчик изменения значений в инпутах
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  // Обработчик сабмита формы
  const handleUpdateUserSubmit = (evt) => {
    evt.preventDefault();
    if (!userData.name || !userData.email) {
      return;
    }
    onUpdateUser(userData);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="profile__container">
          <form
            className="profile__form"
            onSubmit={handleUpdateUserSubmit}
          >
            <h2 className="profile__header">Привет, {currentUser.name}!</h2>
            <div className="profile__inputs-wrapper">
              <label className="profile__input-container">
                Имя
                <input
                  className="profile__text-input"
                  type="text"
                  name="name"
                  id=""
                  value={userData.name}
                  onChange={handleInputChange} />

              </label>
              <label className="profile__input-container">
                E-mail
                <input
                  className="profile__text-input"
                  type="text"
                  name="email"
                  id=""
                  value={userData.email}
                  onChange={handleInputChange} />
              </label>
            </div>
            <button type="submit" className="profile__edit-button">
              Редактировать
            </button>
            <button
              className="profile__logout-button"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>

          </form>
        </div>
      </section>
    </>
  )
}