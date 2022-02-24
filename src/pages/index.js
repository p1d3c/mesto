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

export let ownerId = null;

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
          .then((res) => {
            return api.getResponseData(res);
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
          return api.getResponseData(res);
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
          return api.getResponseData(res);
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
        return api.getResponseData(res);
      })
      .then((res) => {
        console.log(res);
        userInformation.setUserInfo({
          name: res.name,
          job: res.about,
          avatarLink: res.avatar
        })
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingText(editSubmitBtn, 'Сохранить', 'Сохранение...', false);
    })
    profilePopup.close();
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
        return api.getResponseData(res);
      })
      .then((res) => {
        const newCard = createNewCard(res);
        cardsContainer.addItem(newCard, 'start');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingText(addSubmitBtn, 'Создать', 'Сохранение...', false);
    })
    addCardPopup.close();
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
        return api.getResponseData(res);
      })
      .then((res) => {
        console.log(res)
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

api.getInitialCards()
  .then((res) => {
    return api.getResponseData(res);
  })
  .then((res) => {
    cardsContainer.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
})

api.getUserInfo()
  .then((res) => {
    return api.getResponseData(res);
  })
  .then ((res) => {
    ownerId = res._id;
    console.log(ownerId)
    userInformation.setUserInfo({
      name: res.name,
      job: res.about,
      avatarLink: res.avatar
    })
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
