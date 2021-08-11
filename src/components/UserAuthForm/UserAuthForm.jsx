import './UserAuthForm.css'
import { NavLink } from 'react-router-dom';

export const UserAuthForm = ({
  onSubmit,
  isValid,
  name,
  headerText,
  children,
  submitButtonText,
  additionalText,
  linkText,
  linkUrl,

}) => {
  return (
    <form
      className="user-auth-form"
      name={name}
      onSubmit={onSubmit}
      noValidate
    >
      <h2 className="user-auth-form__header">{headerText}</h2>
      {children}
      <button
        className={`user-auth-form__button ${!isValid && 'user-auth-form__button_disabled'}`}
        type="submit"
        disabled={!isValid && true}
      >
        {submitButtonText}
      </button>
      <p className="user-auth-form__additional-text">{additionalText}&nbsp;
        <NavLink className="user-auth-form__additional-link" to={linkUrl}>{linkText}</NavLink></p>
    </form>
  )
}