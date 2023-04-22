//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const form = document.querySelector(".popup__form");
export const formInput = form.querySelector(".popup__input");
export const formError = form.querySelector(`.${formInput.id}-error`);

export const PT_BR_ERROR_MESSAGES = {
  valueMissing: "Este campo é obrigatório.",
  typeMismatch: {
    email: "Por favor, informe um endereço de e-mail válido.",
    url: "Por favor, informe uma URL válida.",
  },
  tooShort: "Por favor, informe pelo menos {minLength} caracteres.",
  tooLong: "Por favor, informe no máximo {maxLength} caracteres.",
  patternMismatch: "Por favor, preencha este campo corretamente.",
};

export const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_active");

  const errorType = inputElement.validationMessage;
  const ptBrErrorMessage = PT_BR_ERROR_MESSAGES[errorType] || errorMessage;

  errorElement.textContent = ptBrErrorMessage;
};

export const hideInputError = (formElement, inputElement) => {
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

export const resetForm = (form) => {
  const popupInputs = Array.from(form.querySelectorAll(".popup__input"));
  popupInputs.forEach((input) => (input.value = ""));
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
