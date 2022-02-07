import Popup from './Popup.js';
import { selectorsConfig } from './selectorsConfig.js';
import { addFormElement,
  titleInput,
  linkInput } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, closeBtnSelector, submitFormCallback }) {
    super({ popup, closeBtnSelector });
    this._callback = submitFormCallback;
    this._form = this._popup.querySelector(selectorsConfig.formSelector);
    this._inputSelector = selectorsConfig.inputSelector;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(this._inputSelector);
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());

    this._popupOverlay.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));

    addFormElement.addEventListener('submit', (evt) => this._callback(this._getInputValues(), evt));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
    this._form.reset();
  }
}
