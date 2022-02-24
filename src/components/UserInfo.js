export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
  }

  setUserInfo({ name, job, avatarLink }) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
    this._userAvatar.src = avatarLink;
  }

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }
}
