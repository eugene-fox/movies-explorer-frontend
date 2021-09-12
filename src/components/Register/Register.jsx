import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';

import useFormWithValidation from '../../hooks/useFormWithValidation';

export const Register = ({
  onRegistration,
  commonMistakeText,
  isSendingRequest
}) => {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const { name, email, password } = values;

  // Обработчик сабмита формы регистрации
  const handleRegisterFormSubmit = (evt) => {
    evt.preventDefault();
    onRegistration({ name, email, password });
    resetForm();
  }

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
          onSubmit={handleRegisterFormSubmit}
          commonMistakeText={commonMistakeText}
          isSendingRequest={isSendingRequest}
        >
          <div className="user-auth-form__input-container">
            <label className="user-auth-form__label" htmlFor="name">
              Имя
              <input
                className="user-auth-form__input"
                placeholder="Имя"
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                required
                onChange={handleChange}
                value={name || ''}
                disabled={isSendingRequest ? true : false}
              />
              <span className="user-auth-form__error">
                {errors.name}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="email">
              E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                required
                onChange={handleChange}
                value={email || ''}
                disabled={isSendingRequest ? true : false}
              />
              <span className="user-auth-form__error">
                {errors.email}
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="password">
              Пароль
              <input
                className="user-auth-form__input"
                placeholder="Пароль"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={handleChange}
                value={password || ''}
                minLength="8"
                disabled={isSendingRequest ? true : false}
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