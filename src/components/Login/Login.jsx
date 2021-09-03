import './Login.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Login = () => {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const { userEmail, userPassword } = values;

  // Обработчик сабмита формы логина
  const handleLoginFormSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          name="user-login-form"
          headerText="Рады видеть!"
          submitButtonText="Войти"
          additionalText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          linkUrl="/signup"
          isValid={isValid}
          onSubmit={handleLoginFormSubmit}
          commonMistakeText={'Общая ошибка'}
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="userEmail">
              E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="email"
                name="userEmail"
                id="userEmail"
                required
                autoComplete="off"
                onChange={handleChange}
                value={userEmail || ''}
              />
              <span className="user-auth-form__error">
                {errors.userEmail}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userPassword">Пароль
              <input
                className="user-auth-form__input"
                placeholder="Пароль"
                type="password"
                name="userPassword"
                id="userPassword"
                required
                autoComplete="off"
                onChange={handleChange}
                value={userPassword || ''}
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