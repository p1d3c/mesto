import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popup, data }) {
    super({ popup });
    this._image = this._popup.querySelector('.popup__image')
    this._caption = this._popup.querySelector('.popup__caption')
    this._data = data;
  }

  open() {
    super.open();
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._caption.textContent = this._data.name;
  }
}
