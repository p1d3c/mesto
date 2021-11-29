// Открытие/закрытие модального окна.

const editBtn = document.querySelector(".profile__edit-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".modal__close-btn");
const modalOverlay = document.querySelector(".modal__overlay");

function closeModal() {
  modal.classList.remove("modal_active");
}

function openModal() {
  modal.classList.add("modal_active");
}

editBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

/*
Ради интереса нашел в интернете код, реализовывающий нажатие лайка.
Из всего кода не понял зачем вот такие стрелочки (=>).
Можете подсказать где почитать про них?)
Заранее спасибо.

UPD: +- понял что эти стрелочки сокращают количество кода.
*/

const heart = Array.from(document.querySelectorAll(".element__heart"));

heart.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("element__heart_active");
  });
});

// Сохранение изменений

let formElement = document.querySelector(".modal__form");
let nameInput = document.querySelector(".modal__name");
let jobInput = document.querySelector(".modal__description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let newName = nameInput.value;
  let newJob = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profName = document.querySelector(".profile__title");
  let profJob = document.querySelector(".profile__subtitle");
  // Вставьте новые значения с помощью textContent
  profName.textContent = newName;
  profJob.textContent = newJob;

  closeModal();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
