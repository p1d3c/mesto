export default class Popup {
constructor({ popup }) {
    this._popup = popup;
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());

    this._popupOverlay.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _removeEventListeners() {
    this._closeBtn.removeEventListener('click', () => this.close());

    this._popupOverlay.removeEventListener('click', () => this.close());

    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }
}
