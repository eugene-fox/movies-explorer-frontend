import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';
import { useState } from 'react';


export const Register = ({ onRegister }) => {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: ''
  });

  // Обработчик изменения значений в инпутах
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  }

  // Обработчик сабмита формы
  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    if (!registerData.email || !registerData.password) {
      return;
    }
    onRegister(registerData);
  }

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          onSubmit={handleRegisterSubmit}
          name="user-register-form"
          headerText="Добро пожаловать!"
          submitButtonText="Зарегистрироваться"
          additionalText="Уже зарегистрированы?"
          linkText="Войти"
          linkUrl="/signin"
        >
          <div className="user-auth-form__input-container">
            <label
              className="user-auth-form__label"
              htmlFor="userName">
              Имя
            </label>
            <input
              className="user-auth-form__input"
              placeholder="Имя"
              type="text"
              name="name"
              id="userName"
              autoComplete="off"
              required
              onChange={handleInputChange}
            />
            <label className="user-auth-form__label" htmlFor="userEmail">E-mail</label>
            <input
              className="user-auth-form__input"
              placeholder="E-mail"
              type="text"
              name="email"
              id="userEmail"
              autoComplete="off"
              required
              onChange={handleInputChange}
            />
            <label className="user-auth-form__label" htmlFor="userPassword">Пароль</label>
            <input
              className="user-auth-form__input"
              placeholder="Пароль"
              type="password"
              name="password"
              id="userPassword"
              autoComplete="off"
              required
              onChange={handleInputChange}
            />
          </div>
          <p className="user-auth-form__error">Что-то пошло не так...</p>
        </UserAuthForm>
      </div>
    </section>
  )
}