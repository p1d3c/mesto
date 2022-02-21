export default class Popup {
constructor({ popup }) {
    this._popup = popup;
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());

    this._popupOverlay.addEventListener('click', () => this.close());

    document.addEventListener('keydown', this._handleEscClose);
  }
}
