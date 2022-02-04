export default class Popup {
  constructor(popupSelector) { //class
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners(evt) {
    if (evt.target.classList.contains('popup__overlay')
  || evt.target.classList.contains('popup__close-btn')) {
    this.close();
  }
  }
}
