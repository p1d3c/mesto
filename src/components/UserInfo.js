import { profilePopupName,
profilePopupJob,
nameInput,
jobInput,
profName,
profJob } from '../utils/constants.js';

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._desc = description;
  }

  getUserInfo() {
    profilePopupName.value = this._name;
    profilePopupJob.value = this._desc;
  }

  setUserInfo() {
    profName.textContent = nameInput.value;
    profJob.textContent = jobInput.value;
  }
}
