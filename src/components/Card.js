import { fillImgPopup } from './components.js';
import PopupWithImage from './PopupWithImage.js';

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._data = data;
  }

  _getTemplate() {
    const elementCard = document
      .querySelector('#temp')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elementCard;
  }

  createCard() {
    this._elementCard = this._getTemplate();
    this._img = this._elementCard.querySelector('.element__image');
    this._title = this._elementCard.querySelector('.element__title');
    this._likeBtn = this._elementCard.querySelector('.element__heart');
    this._delBtn = this._elementCard.querySelector('.element__button');

    this._img.src = this._link;
    this._img.alt = this._alt;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._elementCard;
  }

  _delCard() {
    this._elementCard.remove();
    this._delBtn = null;
    this._likeBtn = null;
    this._img = null;
  }

  _likeCard() {
    this._likeBtn.classList.toggle('element__heart_active');
  }

  _setEventListeners() {
    this._delBtn.addEventListener('click', () => this._delCard());
    this._likeBtn.addEventListener('click', () => this._likeCard());
    this._img.addEventListener('click', () => new PopupWithImage('.popup_type_img').open(this._data));
  }
}

export { Card };
