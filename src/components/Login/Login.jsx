import './Login.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Login = ({onLogin, commonMistakeText}) => {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const { email, password } = values;

  // Обработчик сабмита формы логина
  const handleLoginFormSubmit = (evt) => {
    evt.preventDefault();
    onLogin({email, password});
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
          commonMistakeText={commonMistakeText}
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="email">
              E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="email"
                name="email"
                id="email"
                required
                autoComplete="off"
                onChange={handleChange}
                value={email || ''}
              />
              <span className="user-auth-form__error">
                {errors.email}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="password">Пароль
              <input
                className="user-auth-form__input"
                placeholder="Пароль"
                type="password"
                name="password"
                id="password"
                required
                autoComplete="off"
                onChange={handleChange}
                value={password || ''}
                minLength="8"
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