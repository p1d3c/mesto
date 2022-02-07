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
  showCaption } from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
// export { showImage, showCaption, openPopup, imgPopup };
const renderInitialCards = new Section({
  items: initialCards,
  renderer: (initialCard) => {
    const card = new Card(initialCard);
    const cardElement = card.createCard();
    renderInitialCards.addItem(cardElement, 'end');
    },
  },
  cardListSelector
);

const ProfilePopup = new Popup({
  popup: profilePopup,
  closeBtnSelector: editCloseBtn
});

const AddCardPopup = new PopupWithForm({
  popup: addCardPopup,
  closeBtnSelector: addCloseBtn,
  submitFormCallback: (newCardData, evt) => {
      evt.preventDefault();
      const renderNewCard = new Section({
        items: newCardData,
        renderer: (item) => {
          const card = new Card(item);
          const cardElement = card.createCard();
          renderNewCard.addItem(cardElement, 'start');
          addFormValidator.disableButton(
            addSubmitBtn,
            selectorsConfig.inactiveButtonClass);
          }
      },
      cardListSelector)
      AddCardPopup.close();
  }
});

const userInformation = new UserInfo({
  name: profName.textContent,
  description: profJob.textContent
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
});

editFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userInformation.setUserInfo();
  ProfilePopup.close();
});

addBtn.addEventListener('click', () => {
  addFormValidator.enableValidation();
  AddCardPopup.open();
  AddCardPopup.setEventListeners();
});


// addFormElement.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   AddCardPopup.close();
// });

