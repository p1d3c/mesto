import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor({ popup }) {
    super({ popup });
    this._form = this._popup.querySelector('.popup__form');
  }

  _handleSubmitCallback = (evt) => {
    this._submitCallback(evt)
  }

  setSubmitAction(action) {
    this._submitCallback = action;
    this._form.addEventListener('submit', this._handleSubmitCallback);
  }
}
