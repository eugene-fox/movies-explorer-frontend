import './Register.css';
import { ProjectLogo } from '../ProjectLogo/ProjectLogo.jsx';
import { UserAuthForm } from '../UserAuthForm/UserAuthForm';


export const Register = () => {
  return (
    <section className="register">
      <div className="register__container">
        <ProjectLogo />
        <UserAuthForm
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
              name="userName"
              id="userName"
              required
              autocomplete="off"
            />
            <label className="user-auth-form__label" htmlFor="userEmail">E-mail</label>
            <input
              className="user-auth-form__input"
              placeholder="E-mail"
              type="text"
              name="userEmail"
              id="userEmail"
              required
              autocomplete="off"
            />
            <label className="user-auth-form__label" htmlFor="userPassword">Пароль</label>
            <input
              className="user-auth-form__input"
              placeholder="Пароль"
              type="password"
              name="userPassword"
              id="userPassword"
              required
              autocomplete="off"
            />
          </div>
          <p className="user-auth-form__error">Что-то пошло не так...</p>
        </UserAuthForm>
      </div>
    </section>
  )
}