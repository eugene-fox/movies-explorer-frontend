import { Header } from '../Header/Header';
import './Profile.css';

import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/currentUser/CurrentUserContext';


import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Profile = ({
  isLoggedIn,
  commonMistakeText,
  setCommonMistakeText,
  onUpdateUser,
  onLogout,
}) => {

  const { values, setValues, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const { name, email } = values;

  //  Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  //  Стейт редактируются ли поля информации о пользователе
  const [isUserInfoEdit, setIsUserInfoEdit] = useState(false);

  //  Стейт совпадают ли обновленные значения профиля пользователя с текущими
  const [isValuesEqual, setIsValuesEqual] = useState(true);

  useEffect(() => {
    setCommonMistakeText('')
  }, [setCommonMistakeText]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser, isUserInfoEdit]);

  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
      setIsValuesEqual(true);
    } else {
      setIsValuesEqual(false);
    }
  }, [name, email, currentUser]);

  const editButtonClickHandler = (evt) => {
    evt.preventDefault();
    setIsUserInfoEdit(!isUserInfoEdit);
    setCommonMistakeText('');
    if (isUserInfoEdit === false) {
      resetForm();
    }
  }

  // Обработчик сабмита формы логина
  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ name, email });
    setIsUserInfoEdit(!isUserInfoEdit);
    resetForm();
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <section className="profile">
        <div className="profile__container">
          <form
            className="profile__form"
            onSubmit={handleProfileFormSubmit}
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
                  maxLength="45"
                  required
                  placeholder={currentUser.name}
                  value={name || ''}
                  disabled={isUserInfoEdit ? false : true}
                  onChange={handleChange}
                />
                <span className="profile__input-error-text">{errors.name}</span>
              </label>
              <label className="profile__input-container">
                E-mail
                <input
                  className="profile__text-input"
                  type="email"
                  name="email"
                  id=""
                  maxLength="45"
                  required
                  placeholder={currentUser.email}
                  value={email || ''}
                  disabled={isUserInfoEdit ? false : true}
                  onChange={handleChange}
                />
                <span className="profile__input-error-text">{errors.email}</span>
              </label>
            </div>
            <div className="profile__save-profile-button-container">
              <span className="profile__save-profile-button-error">
                {commonMistakeText}
              </span>
              <button
                className="profile__save-profile-button"
                disabled={(isValid && !isValuesEqual && isUserInfoEdit)
                  ? false
                  : true
                }
              >
                Сохранить
              </button>
            </div>
            <button
              className="profile__edit-button"
              onClick={editButtonClickHandler}
            >
              {!isUserInfoEdit ? 'Редактировать' : 'Отменить редактирование'}
            </button>
            <button type="button"
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