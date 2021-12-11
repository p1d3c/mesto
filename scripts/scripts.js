const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const modal = document.querySelector('.modal');
const mesto = document.querySelector('.new-mesto');

const modalCloseBtn = document.querySelector('.modal__close-btn');
const mestoCloseBtn = document.querySelector('.new-mesto__close-btn');

const modalOverlay = document.querySelector('.modal__overlay');
const mestoOverlay = document.querySelector('.new-mesto__overlay');

let profName = document.querySelector('.profile__title');
let profJob = document.querySelector('.profile__subtitle');
let modalName = document.querySelector('.modal__input_type_name');
let modalDesc = document.querySelector('.modal__input_type_job');

let modalFormElement = document.querySelector('.modal__form');
let nameInput = document.querySelector('.modal__input_type_name');
let jobInput = document.querySelector('.modal__input_type_job');

const mestoFormElement = document.querySelector('.new-mesto__form');
let titleInput = document.querySelector('.new-mesto__input_type_name');
let linkInput = document.querySelector('.new-mesto__input_type_image')

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

window.onload = () => {
  initialCards.forEach((el) => {
    const template = document.querySelector('#temp').content;
    const element = template.querySelector('.element').cloneNode(true);

    element.querySelector('.element__image').src = el.link;
    element.querySelector('.element__title').textContent = el.name;
    document.querySelector('.elements').append(element);
  })
}

function closeModal(evt) {
  if (evt.target.classList.value === 'modal__close-btn' || evt.target.classList.value === 'modal__form' || evt.target.classList.value === 'modal__overlay') {
    modal.classList.remove('modal_active');
  } else if (evt.target.classList.value === 'new-mesto__close-btn' || evt.target.classList.value === 'new-mesto__form' || evt.target.classList.value === 'new-mesto__overlay') {
    mesto.classList.remove('new-mesto_active');
  }
}

function openModal(evt) {
  if (evt.target.name === 'edit') {
    modal.classList.add('modal_active');
    modalName.value = profName.textContent;
    modalDesc.value = profJob.textContent;
  } else {
    mesto.classList.add('new-mesto_active');
    titleInput.value = '';
    linkInput.value = '';
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closeModal(evt);
}

function addElement (evt) {
  evt.preventDefault();

  if (linkInput.value === '' || titleInput.value === '') {
    closeModal(evt);
  } else {
    const template = document.querySelector('#temp').content;
    const element = template.querySelector('.element').cloneNode(true);

    element.querySelector('.element__image').src = linkInput.value;
    element.querySelector('.element__title').textContent = titleInput.value;
    document.querySelector('.elements').prepend(element);

    element.querySelector('.element__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__heart_active');
    })

    closeModal(evt);
  }
}

function like (evt) {
  if (evt.target.name === 'heart') {
    evt.target.classList.toggle('element__heart_active');
  }
}

editBtn.addEventListener('click', openModal);
addBtn.addEventListener('click', openModal);

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

mestoCloseBtn.addEventListener('click', closeModal);
mestoOverlay.addEventListener('click', closeModal);

modalFormElement.addEventListener('submit', formSubmitHandler);
mestoFormElement.addEventListener('submit', addElement);

// const hearts = Array.from(document.querySelectorAll('.element__heart'));
// console.log(hearts);

// hearts.forEach((el) => {
//   el.addEventListener('click', () => {
//     el.classList.toggle('element__heart_active');
//   });
// });
