import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';
import { useState } from 'react';

import useFormWithValidation from '../../hooks/useFormWithValidation';


export const Register = ({ onRegister }) => {

  const {values, errors, isValid, handleChange} = useFormWithValidation();

  const {name ,email, password} = values;

  // const [registerData, setRegisterData] = useState({
  //   email: '',
  //   password: '',
  //   name: ''
  // });

  // Обработчик изменения значений в инпутах
  // const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value
  //   });
  // }

  // Обработчик сабмита формы
  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    onRegister({name, email, password});
  }

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          onSubmit={handleRegisterSubmit}
          isValid={isValid}
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
              <input
                className="user-auth-form__input"
                placeholder="Имя"
                type="text"
                name="name"
                id="userName"
                autoComplete="off"
                value={values.name}
                required
                onChange={handleChange}
              />
            <span className="user-auth-form__error">
            {errors.name}
            </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userEmail">E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="email"
                name="email"
                id="userEmail"
                autoComplete="off"
                required
                onChange={handleChange}
                value={values.email}
              />
              <span className="user-auth-form__error">
                {errors.email}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userPassword">Пароль
              <input
                className="user-auth-form__input"
                placeholder="Пароль"
                type="password"
                name="password"
                id="userPassword"
                autoComplete="off"
                required
                onChange={handleChange}
                value={values.password}
                minLength="6"
              />
              <span className="user-auth-form__error">
              {errors.password}
              </span>
            </label>
          </div>
        </UserAuthForm>
      </div>
    </section>
  )
}