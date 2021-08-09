import {
  BASE_URL,
  BEATFILM_MOVIES_URL
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

  //  Получение сохраненных пользователем фильмов
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
        headers: this._getHeaders(localStorage.getItem('jwt'))
      })
      .then(this._checkResponse);
  }

  //  Добавление фильма в сохраненные
  addMovieToSaved(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._getHeaders(localStorage.getItem('jwt')),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BEATFILM_MOVIES_URL}${movie.image.url}`,
        thumbnail: `${BEATFILM_MOVIES_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    }).then(this._getResponse)
  }

  //  Удаление фильма из сохраненных
  removeMovieFromSaved(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._getHeaders(localStorage.getItem('jwt')),
    }).then(this._checkResponse)
  }
}



export const mainApi = new MainApi(BASE_URL);