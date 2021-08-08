import {
  BASE_URL
} from './constants';

export default class MainApi {
  constructor(url) {
    this._url = url;
  }

  //  Установка заголовков запроса
  _getHeaders(jwt) {
    jwt = typeof jwt == 'undefined' ? '' : jwt;
    return {
      authorization: `Bearer ${jwt}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  //  Проверка ответа сервера
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  //  Регистрация нового пользователя в сервисе
  register({
    email,
    password,
    name
  }) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          email,
          password,
          name
        })
      })
      .then(this._checkResponse);
  }

  //  Авторизация нового пользователя в сервисе
  authorize({
    email,
    password
  }) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          email,
          password
        })
      })
      .then(this._checkResponse);
  }

  //  Получение данных о пользователе
  getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: this._getHeaders(localStorage.getItem('jwt')),
      })
      .then(this._checkResponse);
  }

  //  Обновление профиля пользователя
  updateUserProfile(userData) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(localStorage.getItem('jwt')),
        body: JSON.stringify(userData)
      })
      .then(this._checkResponse);
  }
}

export const mainApi = new MainApi(BASE_URL);