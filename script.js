const popup = document.querySelector(".popup");
const popupButtonEdit = document.querySelector(".header__edit-btn");
const popupButtonClose = document.querySelector(".popup__close-btn");
const popupButtonSubmit = document.querySelector(".popup__submit-btn");
const form = document.querySelector(".popup__form");

function handleProfileFormEdit(evt) {
  evt.preventDefault();

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

  let nameInput = document.querySelector(".popup__text_type_name").value;
  let jobInput = document.querySelector(".popup__text_type_job").value;

  let nameOutput = document.querySelector(".header__title");
  let jobOutput = document.querySelector(".header__subtitle");

  nameOutput.textContent = nameInput;
  jobOutput.textContent = jobInput;

  popup.classList.remove("popup_opened");

  form.reset();
}

popupButtonSubmit.addEventListener("click", handleProfileFormSubmit);

form.addEventListener("submit", handleProfileFormSubmit);
