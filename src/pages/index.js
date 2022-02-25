import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { editBtn,
  addBtn,
  avatarBtn,
  profilePopupElement,
  addCardPopupElement,
  imgPopupElement,
  delCardPopupElement,
  avatarPopupElement,
  profNameSelector,
  profJobSelector,
  nameInput,
  jobInput,
  editFormElementSelector,
  editSubmitBtn,
  addFormElementSelector,
  addSubmitBtn,
  avatarFormElementSelector,
  cardListSelector,
  templateSelector,
  token,
  renderLoadingText,
  delConfirmSubmitBtn,
  avatarSubmitBtn,
  profAvatarSelector
} from '../utils/utils.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api';

let ownerId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: token,
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

const userInformation = new UserInfo({
  nameSelector: profNameSelector,
  jobSelector: profJobSelector,
  avatarSelector: profAvatarSelector
});

const openedImg = new PopupWithImage({
  popup: imgPopupElement
});

function createNewCard(item) {
  const card = new Card({
    data: item,
    ownerId,
    handleImgClick: () => {
      openedImg.open(item);
    },
    handleDelClick: () => {
      delCardPopup.setSubmitAction((evt) => {
        evt.preventDefault();
        renderLoadingText(delConfirmSubmitBtn, 'Да', 'Удаление...', true);
        api.delCard({
          cardId: item._id
        })
          .then(() => {
            card.delCard();
            delCardPopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoadingText(delConfirmSubmitBtn, 'Да', 'Удаление...', false);
        })
      })
      delCardPopup.open();
    },
    handleLike: () => {
      api.likeCard({
        cardId: item._id
      })
        .then((res) => {
          card.changeBtnView(res);
        })
        .catch((err) => {
          console.log(err);
      })
    },
    handleDislike: () => {
      api.dislikeCard({
        cardId: item._id
      })
        .then((res) => {
          card.changeBtnView(res);
        })
        .catch((err) => {
          console.log(err);
      })
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
    renderLoadingText(editSubmitBtn, 'Сохранить', 'Сохранение...', true);
    api.setUserInfo({
      name: nameInput.value,
      about: jobInput.value
    })
      .then((res) => {
        userInformation.setUserInfo({
          name: res.name,
          job: res.about,
          avatarLink: res.avatar
        })
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingText(editSubmitBtn, 'Сохранить', 'Сохранение...', false);
    })
  }
});

const addCardPopup = new PopupWithForm({
  popup: addCardPopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    renderLoadingText(addSubmitBtn, 'Создать', 'Сохранение...', true);
    const newCardData = addCardPopup.getInputValues();
    api.addCard({
      name: newCardData.name,
      link: newCardData.link,
    })
      .then((res) => {
        const newCard = createNewCard(res);
        cardsContainer.addItem(newCard, 'start');
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingText(addSubmitBtn, 'Создать', 'Сохранение...', false);
    })
    addFormValidator.disableButton(
      addSubmitBtn,
      selectorsConfig.inactiveButtonClass);
  }
});

const delCardPopup = new PopupWithConfirmation({
  popup: delCardPopupElement
})

const avatarPopup = new PopupWithForm({
  popup: avatarPopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    renderLoadingText(avatarSubmitBtn, 'Сохранить', 'Сохранение...', true);
    const avatarPopupInputValue = avatarPopup.getInputValues();
    api.changeAvatar({ avatarPopupInputValue })
      .then((res) => {
        userInformation.setUserAvatar(res.avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingText(avatarSubmitBtn, 'Сохранить', 'Сохранение...', false);
    })
  }
})

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

const avatarFormValidator = new FormValidator(
  selectorsConfig,
  avatarFormElementSelector
)
avatarFormValidator.enableValidation();

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
delCardPopup.setEventListeners();
avatarPopup.setEventListeners();

const getUserInfoPromise = api.getUserInfo();
const getInitialCardsPromise = api.getInitialCards();

Promise.all([getUserInfoPromise, getInitialCardsPromise])
  .then((res) => {
    ownerId = res[0]._id;
    userInformation.setUserInfo({
      name: res[0].name,
      job: res[0].about,
      avatarLink: res[0].avatar
    })

    cardsContainer.renderItems(res[1]);
  })
  .catch((err) => {
    console.log(err);
})

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

avatarBtn.addEventListener('click', () => {
  avatarFormValidator.hideErrorMessage();
  avatarFormValidator.disableButton();
  avatarPopup.open();
})
