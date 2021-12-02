const editBtn = document.querySelector(".profile__edit-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close-btn");
const modalOverlay = document.querySelector(".modal__overlay");
let profName = document.querySelector(".profile__title");
let profJob = document.querySelector(".profile__subtitle");
let modalName = document.querySelector(".modal__input_type_name");
let modalDesc = document.querySelector(".modal__input_type_job");

let formElement = document.querySelector(".modal__form");
let nameInput = document.querySelector(".modal__input_type_name");
let jobInput = document.querySelector(".modal__input_type_job");

function closeModal() {
  modal.classList.remove("modal_active");
}

function openModal() {
  modal.classList.add("modal_active");
  modalName.value = profName.textContent;
  modalDesc.value = profJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profName.textContent = nameInput.value;
  profJob.textContent = jobInput.value;

  closeModal();
}

editBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

formElement.addEventListener("submit", formSubmitHandler);
