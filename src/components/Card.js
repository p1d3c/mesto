export default class Card {
  constructor({ data, ownerId, handleImgClick, handleDelClick, handleLike, handleDislike, templateSelector }) {
    this._imgCallback = handleImgClick;
    this._delCallback = handleDelClick;
    this._likeCallback = handleLike;
    this._dislikeCallback = handleDislike;
    this._ownerId = ownerId;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._data = data;
    this._templateSelector = templateSelector;
  }

  createCard() {
    this._elementCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    this._img = this._elementCard.querySelector('.element__image');
    this._title = this._elementCard.querySelector('.element__title');
    this._likeBtn = this._elementCard.querySelector('.element__heart');
    this._delBtn = this._elementCard.querySelector('.element__button');
    this._likesCount = this._elementCard.querySelector('.element__likes-count');

    this._img.src = this._link;
    this._img.alt = this._alt;
    this._title.textContent = this._name;
    this._likesCount.textContent = this._data.likes.length || '0';

    this._isOwner();

    this._setEventListeners();

    return this._elementCard;
  }

  delCard() {
    this._elementCard.remove();
    this._elementCard = null;
    this._delBtn = null;
    this._likeBtn = null;
    this._img = null;
  }

  changeBtnView(res) {
    this._likeBtn.classList.toggle('element__heart_active');
    this._likesCount.textContent = res.likes.length;
  }

  likeCard = () => {
    if (this._likeBtn.classList.contains('element__heart_active')) {
      this._dislikeCallback();
    } else {
      this._likeCallback();
    }
  }

  _setEventListeners() {
    this._delBtn.addEventListener('click', (evt) => this._delCallback(evt));
    this._likeBtn.addEventListener('click', this.likeCard);
    this._img.addEventListener('click', () => this._imgCallback());
  }

  _isOwner() {
    if (this._data.owner._id != this._ownerId) {
      this._delBtn.style.display = 'none';
    }

    this._data.likes.forEach((userLike) => {
      if (userLike._id === this._ownerId) {
        this._likeBtn.classList.toggle('element__heart_active');
      }
    })
  }
}


