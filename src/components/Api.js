import { token } from '../utils/utils';

export default class Api {
  constructor({ baseUrl, headers, renderCardsCallback, setUserInfoCallback, addNewCardCallback }) {
    this._cardsContainer = [];
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderCardsCallback = renderCardsCallback;
    this._setUserInfoCallback = setUserInfoCallback;
    this._addNewCardCallback = addNewCardCallback;
  }

  getInitialCards() {
    fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      this._cardsContainer = res;
    })
    .then(() => {
      console.log(this._cardsContainer)
      this._renderInitialCards();
    })
  }

  _renderInitialCards() {
    this._renderCardsCallback(this._cardsContainer);
  }

  getUserInfo() {
    fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then ((res) => {
      this._setUserInfoCallback(res);
    });
  }

  setUserinfo({ name, about }) {
    fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((res) => {
      this._setUserInfoCallback(res);
    })
  }

  addCard({ name, link }) {
    fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      this._addNewCardCallback(res);
      console.log(res)
      this._cardsContainer.unshift(res);
    })
    .then(() => {
      console.log(this._cardsContainer)
    })
  }

  delCard(cardId) {
    fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
