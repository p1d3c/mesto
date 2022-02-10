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

export const profilePopupElement = document.querySelector('.popup_type_edit');
export const addCardPopupElement = document.querySelector('.popup_type_add');
export const imgPopupElement = document.querySelector('.popup_type_img');

export const profNameSelector = '.profile__title';
export const profJobSelector = '.profile__subtitle';
export const profilePopupName = document.querySelector('.popup__input_type_name');
export const profilePopupJob = document.querySelector('.popup__input_type_job');

export const editFormElementSelector = '.popup__form_type_edit';
export const editSubmitBtn = document.querySelector('button[name="edit-submit"]');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const addFormElementSelector = '.popup__form_type_add';
export const addSubmitBtn = document.querySelector('button[name="add-submit"]');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_image');

export const cardListSelector = '.elements';

export const showImage = imgPopupElement.querySelector('.popup__image');
export const showCaption = imgPopupElement.querySelector('.popup__caption');
