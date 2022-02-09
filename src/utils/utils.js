export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const editBtn = document.querySelector('.profile__edit-btn');
export const addBtn = document.querySelector('.profile__add-btn');

export const profilePopup = document.querySelector('.popup_type_edit');
export const addCardPopup = document.querySelector('.popup_type_add');
export const imgPopup = document.querySelector('.popup_type_img');

export const profName = document.querySelector('.profile__title');
export const profJob = document.querySelector('.profile__subtitle');
export const profilePopupName = document.querySelector('.popup__input_type_name');
export const profilePopupJob = document.querySelector('.popup__input_type_job');

export const editFormElement = '.popup__form_type_edit';
export const editSubmitBtn = document.querySelector('button[name="edit-submit"]');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const addFormElement = '.popup__form_type_add';
export const addSubmitBtn = document.querySelector('button[name="add-submit"]');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_image');

export const cardListSelector = '.elements';

export const showImage = imgPopup.querySelector('.popup__image');
export const showCaption = imgPopup.querySelector('.popup__caption');
