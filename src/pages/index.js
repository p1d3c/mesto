// import './index.css';
import Card from '../components/Card.js';
import { selectorsConfig } from '../components/selectorsConfig.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards,
  editBtn,
  addBtn,
  editCloseBtn,
  addCloseBtn,
  profilePopup,
  addCardPopup,
  imgPopup,
  profName,
  profJob,
  profilePopupName,
  profilePopupJob,
  editFormElement,
  editSubmitBtn,
  nameInput,
  jobInput,
  addFormElement,
  addSubmitBtn,
  titleInput,
  linkInput,
  cardListSelector,
  showImage,
  showCaption } from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
// export { showImage, showCaption, openPopup, imgPopup };

function createNewCard(classInstance, cardData, place) {
      const card = new Card(cardData);
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
  '.popup__form_type_edit'
);

const addFormValidator = new FormValidator(
  selectorsConfig,
  '.popup__form_type_add'
);
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');

//   document.removeEventListener('click', closeViaBtnOrOverlay);

//   document.removeEventListener('keydown', closeViaEsc);
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');

//   document.addEventListener('click', closeViaBtnOrOverlay);

//   document.addEventListener('keydown', closeViaEsc);
// }

// function submitFormHandler(evt) {
//   evt.preventDefault();

//   profName.textContent = nameInput.value;
//   profJob.textContent = jobInput.value;

//   closePopup(profilePopup);
// }

// function fillProfilePopup() {
//   profilePopupName.value = profName.textContent;
//   profilePopupJob.value = profJob.textContent;
//   editFormValidator.enableValidation();
//   editFormValidator.activateButton(editSubmitBtn, selectorsConfig.inactiveButtonClass);
//   editFormValidator.hideErrorMessage();
//   openPopup(profilePopup);
// }

// function fillAddCardPopup() {
//   addFormValidator.enableValidation();
//   openPopup(addCardPopup);
// }

// function pasteCard(el, method) {
//   const elementCard = new Card(el).createCard();
//   if (method === 'end') {
//     cardList.prepend(elementCard);
//   } else {
//     cardList.append(elementCard);
//   }
// }

// function addNewCard(evt) {
//   evt.preventDefault();
//   const newCard = {
//     name: titleInput.value,
//     link: linkInput.value
//   };
//     pasteCard(newCard, 'end');
//     closePopup(addCardPopup);
//     addFormElement.reset();
//     addFormValidator.disableButton(
//       addSubmitBtn,
//       selectorsConfig.inactiveButtonClass);
// }

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

// editFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   userInformation.setUserInfo();
//   ProfilePopup.close();
// });

addBtn.addEventListener('click', () => {
  addFormValidator.enableValidation();
  AddCardPopup.open();
  AddCardPopup.setEventListeners();
});


// addFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   AddCardPopup.close();
// });

