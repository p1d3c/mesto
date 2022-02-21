import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popup }) {
    super({ popup });
    this._image = this._popup.querySelector('.popup__image')
    this._caption = this._popup.querySelector('.popup__caption')

  }

  open(cardData) {
    super.open();
    super.setEventListeners();
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._caption.textContent = cardData.name;
  }
}
