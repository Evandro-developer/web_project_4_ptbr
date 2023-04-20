//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const form = document.querySelector(".popup__form");
export const formInput = form.querySelector(".popup__input");
export const formError = form.querySelector(`.${formInput.id}-error`);

export const showInputError = (formElement, inputElement, errorMessage) => {
  console.log("Executando showInputError");

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

export const hideInputError = (formElement, inputElement) => {
  console.log("Executando hideInputError");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement &&
    (inputElement.classList.remove("popup__input_type_error"),
    errorElement.classList.remove("popup__input-error_active"),
    (errorElement.textContent = ""));
};

export const checkInputValidity = (formElement, inputElement) => {
  !inputElement.validity.valid
    ? showInputError(formElement, inputElement, inputElement.validationMessage)
    : hideInputError(formElement, inputElement);
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

export const toggleButtonState = (inputList, buttonElement) => {
  hasInvalidInput(inputList)
    ? buttonElement.classList.add("popup__button_disabled")
    : buttonElement.classList.remove("popup__button_disabled");
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".popup__button");

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      setEventListeners(formElement, inputElement);
    });
  });
};

export const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: "popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export { enableValidation };

enableValidation();

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
