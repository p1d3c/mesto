import { selectorsConfig } from './selectorsConfig.js';

class FormValidator {
  constructor(selectorsConfig) {
    this._formSelector = selectorsConfig.formSelector;
    this._inputSelector = selectorsConfig.inputSelector;
    this._fieldSelector = selectorsConfig.fieldSelector;
    this._submitButtonSelector = selectorsConfig.submitButtonSelector;
    this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
    this._inputErrorClass = selectorsConfig.inputErrorClass;
    this._errorClass = selectorsConfig.errorClass;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      const fieldsetList = Array.from(formElement.querySelectorAll(this._fieldSelector));

      fieldsetList.forEach((fieldSet) => {
        this._setEventListeners(fieldSet);
      });
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement, this._inactiveButtonClass);
    } else {
      this.activateButton(buttonElement, this._inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  activateButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}

export default FormValidator;
