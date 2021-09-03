import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Register = () => {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const { userName, userEmail, userPassword } = values;

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          name="user-register-form"
          headerText="Добро пожаловать!"
          submitButtonText="Зарегистрироваться"
          additionalText="Уже зарегистрированы?"
          linkText="Войти"
          linkUrl="/signin"
          isValid={isValid}
          commonMistakeText={'Общая ошибка'}
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="userName">
              Имя
              <input
                className="user-auth-form__input"
                placeholder="Имя"
                type="text"
                name="userName"
                id="userName"
                autoComplete="off"
                required
                onChange={handleChange}
                value={userName}
              />
              <span className="user-auth-form__error">
                {errors.userName}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userEmail">
              E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="email"
                name="userEmail"
                id="userEmail"
                autoComplete="off"
                required
                onChange={handleChange}
                value={userEmail}
              />
              <span className="user-auth-form__error">
                {errors.userEmail}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userPassword">
              Пароль
              <input
                className="user-auth-form__input"
                placeholder="Пароль"
                type="password"
                name="userPassword"
                id="userPassword"
                autoComplete="off"
                required
                onChange={handleChange}
                value={userPassword}
                minLength="8"
              />
              <span className="user-auth-form__error">
                {errors.userPassword}
              </span>
            </label>
          </div>
        </UserAuthForm>
      </div>
    </section>
  )
}