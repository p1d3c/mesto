import Popup from './Popup.js';
import { selectorsConfig } from './selectorsConfig.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, submitFormCallback }) {
    super({ popup });
    this._callback = submitFormCallback;
    this._form = this._popup.querySelector(selectorsConfig.formSelector);
    this._inputSelector = selectorsConfig.inputSelector;
    this._submitBtn = this._popup.querySelector('.popup__submit');
  }

  getInputValues() {
    this._inputList = this._popup.querySelectorAll(this._inputSelector);
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  _handleSubmit = (evt) => {
    this._callback(evt);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
