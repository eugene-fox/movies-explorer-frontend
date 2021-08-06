import { useState } from 'react';

import './Login.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

export const Login = ({ onLogin }) => {

// Данные для аутентификации
  const [loginData, setloginData] = useState({
    email: '',
    password: ''
  });

  // Обработчик изменения значений в инпутах
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setloginData({
      ...loginData,
      [name]: value
    });
  }

  // Обработчик сабмита формы
  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          onSubmit={handleLoginSubmit}
          name="user-login-form"
          headerText="Рады видеть!"
          submitButtonText="Войти"
          additionalText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          linkUrl="/signup"
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="userEmail">E-mail</label>
            <input
              className="user-auth-form__input"
              placeholder="E-mail"
              type="text"
              name="email"
              id="userEmail"
              required
              autoComplete="off"
              value={loginData.email}
              onChange={handleInputChange}
            />
            <label className="user-auth-form__label" htmlFor="userPassword">Пароль</label>
            <input
              className="user-auth-form__input"
              placeholder="Пароль"
              type="password"
              name="password"
              id="userPassword"
              required
              autoComplete="off"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
        </UserAuthForm>
      </div>
    </section>
  )
}