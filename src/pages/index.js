import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards,
  editBtn,
  addBtn,
  profilePopup,
  addCardPopup,
  imgPopup,
  profName,
  profJob,
  editFormElement,
  editSubmitBtn,
  addFormElement,
  addSubmitBtn,
  cardListSelector
} from '../utils/utils.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

function createNewCard(classInstance, cardData, place) {
  const card = new Card({ data: cardData,
    handleCardClick: () => {
      const openedImg = new PopupWithImage({
        popup: imgPopup,
        data: cardData
      });
      openedImg.open(cardData);
    }
  });
  const cardElement = card.createCard();
  classInstance.addItem(cardElement, place);
}

const userInformation = new UserInfo({
  name: profName.textContent,
  description: profJob.textContent,
  popup: profilePopup
});

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (initialCard) => {
    createNewCard(renderInitialCards, initialCard, 'end');
    },
  },
  cardListSelector
);

const ProfilePopup = new PopupWithForm({
  popup: profilePopup,
  submitFormCallback: (evt) => {
    evt.preventDefault();
    userInformation.setUserInfo();
    ProfilePopup.close();
  }
});

const AddCardPopup = new PopupWithForm({
  popup: addCardPopup,
  submitFormCallback: (evt) => {
      evt.preventDefault();
      const newCardData = AddCardPopup._getInputValues();
      const renderNewCard = new Section({
        items: newCardData,
        renderer: (item) => {
          createNewCard(renderNewCard, item, 'start');
          }
      },
      cardListSelector)
      renderNewCard.renderItem('newCard');
      addFormValidator.disableButton(
        addSubmitBtn,
        selectorsConfig.inactiveButtonClass);
      AddCardPopup.close();
  }
});

const editFormValidator = new FormValidator(
  selectorsConfig,
  editFormElement
);

const addFormValidator = new FormValidator(
  selectorsConfig,
  addFormElement
);

window.onload = renderInitialCards.renderItem();

editBtn.addEventListener('click', () => {
  editFormValidator.enableValidation();
  editFormValidator.activateButton(
    editSubmitBtn,
    selectorsConfig.inactiveButtonClass);
  editFormValidator.hideErrorMessage();
  ProfilePopup.open();
  userInformation.getUserInfo();
  ProfilePopup.setEventListeners()
});

addBtn.addEventListener('click', () => {
  addFormValidator.enableValidation();
  AddCardPopup.open();
  AddCardPopup.setEventListeners();
});
