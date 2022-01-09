const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add');
const imgPopup = document.querySelector('.popup_type_img');

const popupCloseBtn = document.querySelectorAll('.popup__close-btn');
const popupOverlay = document.querySelectorAll('.popup__overlay');

const profName = document.querySelector('.profile__title');
const profJob = document.querySelector('.profile__subtitle');
const profilePopupName = document.querySelector('.popup__input_type_name');
const profilePopupJob = document.querySelector('.popup__input_type_job');

const editFormElement = document.querySelector('.popup__form_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const addFormElement = document.querySelector('.popup__form_type_add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_image');

const template = document.querySelector('#temp').content;
const cardList = document.querySelector('.elements');

const showImage = imgPopup.querySelector('.popup__image');
const showCaption = imgPopup.querySelector('.popup__caption');

const initialCards = [
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

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closeViaEsc);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeViaEsc);
}

function submitFormHandler (evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

function fillProfilePopup() {
  profilePopupName.value = profName.textContent;
  profilePopupJob.value = profJob.textContent;
  openPopup(profilePopup);
}

function fillAddCardPopup() {
  openPopup(addCardPopup);
}

function fillImgPopup(el) {
  showImage.src = el.link;
  showImage.alt = el.name;
  showCaption.textContent = el.name;
  openPopup(imgPopup);
}

function delCard(el) {
  el.remove();
}

function likeCard(el) {
  el.classList.toggle('element__heart_active');
}

function createCard(el) {
  const elementCard = template.querySelector('.element').cloneNode(true);
  const img = elementCard.querySelector('.element__image');
  const title = elementCard.querySelector('.element__title');
  const likeBtn = elementCard.querySelector('.element__heart');
  const delBtn = elementCard.querySelector('.element__button');
  img.src = el.link;
  img.alt = el.name;
  title.textContent = el.name;

  delBtn.addEventListener('click', () => delCard(elementCard))
  likeBtn.addEventListener('click', () => likeCard(likeBtn));
  img.addEventListener('click', ()  => fillImgPopup(el));
  return elementCard;
}

function pasteCard(el, method) {
  const elementCard = createCard(el);
  if (method === 'end') {
    cardList.prepend(elementCard);
  } else {
    cardList.append(elementCard);
  }
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: titleInput.value,
    link: linkInput.value
  };
    pasteCard(newCard, 'end');
    closePopup(addCardPopup);
    addFormElement.reset();
}

function renderCards() {
  initialCards.forEach((el) => pasteCard(el, 'start'));
}

function closeViaEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')
  || evt.target.classList.contains('popup__close-btn')) {
    const closestPopup = evt.target.closest('.popup');
    closePopup(closestPopup);
  }
})

window.onload = renderCards();

editBtn.addEventListener('click', fillProfilePopup);
addBtn.addEventListener('click', fillAddCardPopup);

editFormElement.addEventListener('submit', submitFormHandler);
addFormElement.addEventListener('submit', addNewCard);
