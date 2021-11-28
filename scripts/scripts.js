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
*/

const heart = Array.from(document.querySelectorAll(".element__heart"));

heart.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("element__heart_active");
  });
});
