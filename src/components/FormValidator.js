export default class FormValidator {
  constructor(selectorsConfig, formSelector) {
    this._inputSelector = selectorsConfig.inputSelector;
    this._fieldSelector = selectorsConfig.fieldSelector;
    this._submitButtonSelector = selectorsConfig.submitButtonSelector;
    this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
    this._inputErrorClass = selectorsConfig.inputErrorClass;
    this._errorClass = selectorsConfig.errorClass;
    this._form = formSelector;
    this._formElement = null;
    this._inputList = null;
  }

  enableValidation() {
    const form = document.querySelector(this._form);
    this._formElement = form;
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    const fieldsetList = Array.from(form.querySelectorAll(this._fieldSelector));
    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._inputList = inputList;
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

  hideErrorMessage() {
    this._inputList.forEach(input => {
      this._hideInputError(this._formElement, input);
    })
  }
}

