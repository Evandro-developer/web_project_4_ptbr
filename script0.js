const popup = document.querySelector(".popup");
const popupButtonEdit = document.querySelector(".button-edit");
const popupButtonClose = document.querySelector(".popup__close-btn");
const popupButtonSubmit = document.querySelector(".popup__submit-btn");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
const nameOutput = document.querySelector(".header__title");
const jobOutput = document.querySelector(".header__subtitle");

popupButtonEdit.addEventListener("click", function (evt) {
  evt.preventDefault();

  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;

  popup.style.display = "flex";
});

popupButtonClose.addEventListener("click", function (evt) {
  evt.preventDefault();

  popup.style.display = "none";
});

popupButtonSubmit.addEventListener("click", function (evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;

  popup.style.display = "none";
});

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Enter") {
    if (
      nameInput === document.activeElement ||
      jobInput === document.activeElement
    ) {
      evt.preventDefault();
      nameOutput.textContent = nameInput.value;
      jobOutput.textContent = jobInput.value;
      popup.style.display = "none";
    }
  }
});
