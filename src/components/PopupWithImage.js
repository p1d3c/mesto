import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    if (!popupSelector.contains('img')) {
      throw 'This is not an image!'
    }
    super(popupSelector);
    this._image = this._popup.querySelector('popup__image')
    this._caption = this._popup.querySelector('popup__caption')
  }

  open(_data) {
    this._image.src = _data.link;
    this._image.alt = _data.name;
    this._caption.textContent = _data.name;
  }
}
