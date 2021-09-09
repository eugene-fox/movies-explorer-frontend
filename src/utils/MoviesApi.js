import {
  MOVIES_API_URL
} from './constants';

export default class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  //Установка заголовков запроса
  _getHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  //Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение всех фильмов со стороннего API
  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
        method: 'GET',
        headers: this._getHeaders()
      })
      .then((res) => this._checkResponse(res));
  }
}

export const moviesApi = new MoviesApi(MOVIES_API_URL);