import { renderLoadingText,
  editSubmitBtn,
  addSubmitBtn,
  delConfirmSubmitBtn,
  avatarSubmitBtn
} from '../utils/utils';

export default class Api {
  constructor({ baseUrl, headers, renderCardsCallback, setUserInfoCallback, addNewCardCallback }) {
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
      this._renderCardsCallback(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getUserInfo(avatarImg) {
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
      avatarImg.src = res.avatar;
      this._setUserInfoCallback(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  setUserinfo({ name, about, popupClose }) {
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
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupClose();
      renderLoadingText(editSubmitBtn, 'Сохранить', 'Сохранение...', false);
    })
  }

  addCard({ name, link, popupClose }) {
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupClose();
      renderLoadingText(addSubmitBtn, 'Создать', 'Сохранение...', false);
    })
  }

  delCard({ cardId, popupClose }) {
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
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupClose();
      renderLoadingText(delConfirmSubmitBtn, 'Да', 'Удаление...', false);
    })
  }

  likeCard({ cardId, changeLikeBtnView }) {
    fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      changeLikeBtnView(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  dislikeCard({ cardId, changeLikeBtnView }) {
    fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      changeLikeBtnView(res);
    })
    .catch((err) => {
      console.log(cardId)
      console.log(err);
    })
  }

  changeAvatar({ avatarPopupInputValue, avatarImg, popupClose }) {
    fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarPopupInputValue.avatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(() => {
      avatarImg.src = avatarPopupInputValue.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupClose();
      renderLoadingText(avatarSubmitBtn, 'Сохранить', 'Сохранение...', false);
    })
  }
}
