import { profilePopupName,
profilePopupJob,
profName,
profJob } from '../utils/utils.js';
import { selectorsConfig } from './selectorsConfig.js';

export default class UserInfo {
  constructor({ name, description, popup }) {
    this._name = name;
    this._desc = description;
    this._popup = popup;
    this._inputSelector = selectorsConfig.inputSelector;
  }

  getUserInfo() {
    profilePopupName.value = this._name;
    profilePopupJob.value = this._desc;
    return this._formValues;
  }

  setUserInfo() {
    this._inputList = this._popup.querySelectorAll(this._inputSelector);
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues)
    profName.textContent = this._formValues.name;
    profJob.textContent = this._formValues.desc;
  }
}
