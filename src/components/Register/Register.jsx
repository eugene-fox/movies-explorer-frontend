import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';


export const Register = () => {
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
              />
              <span className="user-auth-form__error">
                Что-то пошло не так...
              </span>
            </label>
            <label className="user-auth-form__label" htmlFor="userEmail">
              E-mail
              <input
                className="user-auth-form__input"
                placeholder="E-mail"
                type="text"
                name="userEmail"
                id="userEmail"
                autoComplete="off"
                required
              />
              <span className="user-auth-form__error">
                Что-то пошло не так...
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
              />
              <span className="user-auth-form__error">
                Что-то пошло не так...
              </span>
            </label>
          </div>
        </UserAuthForm>
      </div>
    </section>
  )
}