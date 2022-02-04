import Popup from "./Popup";
import { selectorsConfig } from "./selectorsConfig";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._callback = submitFormCallback;
        this._form = document.querySelector(selectorsConfig.formSelector);
        this._fieldSelector = selectorsConfig.fieldSelector;
        this._inputSelector = selectorsConfig.inputSelector;
        this._inputValues = []; // [['qwe', 1], ['weq', 2]]
    }

    _getInputValues() {
        let fieldSetList = Array.from(this._form.querySelectorAll(this._fieldSelector));
        fieldSetList.foreach(fieldset => {
            let inputsInFieldset = fieldset.querySelectorAll(this._inputSelector);
            this._inputValues.push(inputsInFieldset.map(input => input.value));
        });
    }

    setEventListeners(evt) {
        if (evt.target.classList.contains('popup__overlay')
                || evt.target.classList.contains('popup__close-btn')) {
            this.close();
      }
      this._form.addEventListener('submit', this._callback);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._form.reset();
    }
}