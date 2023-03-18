const popup = document.querySelector(".popup");
const popupButtonEdit = document.querySelector(".button-edit");
const popupButtonClose = document.querySelector(".popup__close-btn");
const popupButtonSubmit = document.querySelector(".popup__submit-btn");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
const nameOutput = document.querySelector(".header__title");
const jobOutput = document.querySelector(".header__subtitle");

function handleProfileFormEdit(evt) {
  evt.preventDefault();

  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;

  popup.classList.add("popup_opened");
}

popupButtonEdit.addEventListener("click", handleProfileFormEdit);

function handleProfileFormClose(evt) {
  evt.preventDefault();

  popup.classList.remove("popup_opened");
}

popupButtonClose.addEventListener("click", handleProfileFormClose);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;

  popup.classList.remove("popup_opened");

  nameInput.value = "";
  jobInput.value = "";
}

popupButtonSubmit.addEventListener("click", handleProfileFormSubmit);

document.addEventListener("keydown", function (evt) {
  if (
    evt.key === "Enter" &&
    popup.classList.contains("popup_opened") &&
    (evt.target === nameInput || evt.target === jobInput)
  ) {
    handleProfileFormSubmit(evt);
  }
});
