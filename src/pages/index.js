import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { editBtn,
  addBtn,
  profilePopupElement,
  addCardPopupElement,
  imgPopupElement,
  delCardPopupElement,
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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: token,
    'Content-Type': 'application/json; charset=UTF-8'
  },
  renderCardsCallback: (items) => {
    cardsContainer.renderItems(items)
  },
  setUserInfoCallback: (res) => {
    userInformation.setUserInfo({
      name: res.name,
      job: res.about
    })
  },
  addNewCardCallback: (res) => {
    const newCard = createNewCard(res);
    cardsContainer.addItem(newCard, 'start');
  }
})

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
    handleImgClick: () => {
      openedImg.open(item);
    },
    handleDelClick: () => {
      delCardPopup.setSubmitAction((evt) => {
        evt.preventDefault();
        api.delCard(item._id);
        card.delCard();
        delCardPopup.close();
      })
      delCardPopup.open();
    },
    handleLike: () => {
      api.likeCard({
        cardId: item._id,
        changeLikeBtnView: (res) => {
          card.changeBtnView(res);
        }
      })
    },
    handleDislike: () => {
      api.dislikeCard({
        cardId: item._id,
        changeLikeBtnView: (res) => {
          card.changeBtnView(res);
        }
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

    api.setUserinfo({
      name: nameInput.value,
      about: jobInput.value
    })

    profilePopup.close();
  }
});

const addCardPopup = new PopupWithForm({
  popup: addCardPopupElement,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    const newCardData = addCardPopup.getInputValues();
    api.addCard({
      name: newCardData.name,
      link: newCardData.link
    });
    addFormValidator.disableButton(
      addSubmitBtn,
      selectorsConfig.inactiveButtonClass);
    addCardPopup.close();
  }
});

const delCardPopup = new PopupWithConfirmation({
  popup: delCardPopupElement
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

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
delCardPopup.setEventListeners();

window.onload = api.getInitialCards();
window.onload = api.getUserInfo();

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

