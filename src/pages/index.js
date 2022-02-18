import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { editBtn,
  addBtn,
  profilePopupElement,
  addCardPopupElement,
  imgPopupElement,
  profNameSelector,
  profJobSelector,
  nameInput,
  jobInput,
  editFormElementSelector,
  editSubmitBtn,
  addFormElementSelector,
  addSubmitBtn,
  cardListSelector,
  templateSelector,
  token
} from '../utils/utils.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

fetch('https://nomoreparties.co/v1/cohort36/users/me', {
  headers: {
    authorization: token,
    'Content-Type': 'application/json; charset=UTF-8'
  }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
})
  .then ((res) => {
    userInformation.setUserInfo({
      name: res.name,
      job: res.about })
});

const userInformation = new UserInfo({
  nameSelector: profNameSelector,
  jobSelector: profJobSelector,
});

const openedImg = new PopupWithImage({
  popup: imgPopupElement
});

function createNewCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      openedImg.open(item);
    },
    templateSelector
  });
  const cardElement = card.createCard();

  return cardElement;
}

function fillProfilePopupInputs() {
  const userInfo = userInformation.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
}

const cardsContainer = new Section({
  renderer: (item) => {
    const initialCard = createNewCard(item);
    cardsContainer.addItem(initialCard, 'end');
    },
  },
  cardListSelector
);

const profilePopup = new PopupWithForm({
  popup: profilePopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();

    fetch('https://mesto.nomoreparties.co/v1/cohort36/users/me', {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((res) => {
      userInformation.setUserInfo({
        name: res.name,
        job: res.about })
    })

    profilePopup.close();
  }
});

const addCardPopup = new PopupWithForm({
  popup: addCardPopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    const newCardData = addCardPopup.getInputValues();
    fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((res) => {
      const newCard = createNewCard(newCardData);
      cardsContainer.addItem(newCard, 'start');
    })
    addFormValidator.disableButton(
      addSubmitBtn,
      selectorsConfig.inactiveButtonClass);
    addCardPopup.close();
  }
});

const editFormValidator = new FormValidator(
  selectorsConfig,
  editFormElementSelector
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  selectorsConfig,
  addFormElementSelector
);
addFormValidator.enableValidation();

profilePopup.setEventListeners();
addCardPopup.setEventListeners();

// window.onload = cardsContainer.renderItems(initialCards);

editBtn.addEventListener('click', () => {
  editFormValidator.activateButton(
    editSubmitBtn,
    selectorsConfig.inactiveButtonClass);
  editFormValidator.hideErrorMessage();
  profilePopup.open();
  fillProfilePopupInputs();
});

addBtn.addEventListener('click', () => {
  addFormValidator.hideErrorMessage();
  addCardPopup.open();
});

function renderInitialCards() {
  fetch('https://nomoreparties.co/v1/cohort36/cards', {
    headers: {
      authorization: token,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    cardsContainer.renderItems(res);
  })
}

window.onload = renderInitialCards();
