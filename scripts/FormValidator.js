import { selectorsConfig } from './selectorsConfig.js'

const showInputError = (formElement, inputElement, errorMessage, selectorsConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsConfig.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsConfig.inputErrorClass);
  errorElement.classList.remove(selectorsConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorsConfig);
  } else {
    hideInputError(formElement, inputElement, selectorsConfig);
  }
};

const setEventListeners = (formElement, selectorsConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsConfig.inputSelector));
  const buttonElement = formElement.querySelector(selectorsConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectorsConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectorsConfig);
      toggleButtonState(inputList, buttonElement, selectorsConfig);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const activateButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

const toggleButtonState = (inputList, buttonElement, selectorsConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, selectorsConfig.inactiveButtonClass);
  } else {
    activateButton(buttonElement, selectorsConfig.inactiveButtonClass);
  }
}

const enableValidation = (selectorsConfig) => {
  const formList = Array.from(document.querySelectorAll(selectorsConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll(selectorsConfig.fieldSelector));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, selectorsConfig);
    });
  });
};

enableValidation(selectorsConfig);
