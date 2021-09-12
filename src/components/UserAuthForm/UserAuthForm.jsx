import './UserAuthForm.css'
import { NavLink } from 'react-router-dom';

export const UserAuthForm = ({
  name,
  headerText,
  children,
  submitButtonText,
  additionalText,
  linkText,
  linkUrl,
  isValid,
  onSubmit,
  commonMistakeText,
  isSendingRequest
}) => {
  return (
    <form className="user-auth-form"
      name={name}
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="user-auth-form__header">{headerText}</h2>
      {children}

      <p className="user-auth-form__common-mistake-text">
        {commonMistakeText}
      </p>
      <button
        className={`user-auth-form__button ${!isValid ? 'user-auth-form__button_disabled' : ''}`}
        type="submit"
        disabled={!isValid || isSendingRequest ? true : false}
      >
        {submitButtonText}
      </button>
      <p className="user-auth-form__additional-text">
        {additionalText}
        <NavLink className="user-auth-form__additional-link" to={linkUrl}>
          &nbsp;{linkText}
        </NavLink>
      </p>
    </form>
  )
}