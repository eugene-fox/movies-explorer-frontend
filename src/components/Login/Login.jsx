import './Login.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Login = ({ onLogin }) => {

  const {values, errors, isValid, handleChange} = useFormWithValidation();

  const {email, password} = values;

  // Обработчик сабмита формы
  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({email, password});
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__logo-wrapper"><ProjectLogo /></div>
        <UserAuthForm
          onSubmit={handleLoginSubmit}
          isValid={isValid}
          name="user-login-form"
          headerText="Рады видеть!"
          submitButtonText="Войти"
          additionalText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          linkUrl="/signup"
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="userEmail">E-mail
              <input
                type="email"
                className="user-auth-form__input"
                placeholder="E-mail"
                name="email"
                id="userEmail"
                required
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
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
                required
                minLength="6"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
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