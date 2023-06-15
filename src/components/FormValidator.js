export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputSelector = validationConfig.inputSelector;
    this._buttonSelector = validationConfig.buttonSelector;
    this._PT_BR_ERROR_MESSAGES = {
      valueMissing: "Este campo é obrigatório.",
      typeMismatch: {
        email: "Por favor, informe um endereço de e-mail válido.",
        url: "Por favor, informe uma URL válida.",
      },
      tooShort: "Por favor, informe pelo menos {minLength} caracteres.",
      tooLong: "Por favor, informe no máximo {maxLength} caracteres.",
      patternMismatch: "Por favor, preencha este campo corretamente.",
    };
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);

    let ptBrErrorMessage = errorMessage;

    if (inputElement.validity.valueMissing) {
      ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.valueMissing;
    } else if (inputElement.validity.typeMismatch) {
      if (inputElement.type === "email") {
        ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.typeMismatch.email;
      } else if (inputElement.type === "url") {
        ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.typeMismatch.url;
      }
    } else if (inputElement.validity.tooShort) {
      ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.tooShort.replace(
        "{minLength}",
        inputElement.minLength
      );
    } else if (inputElement.validity.tooLong) {
      ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.tooLong.replace(
        "{maxLength}",
        inputElement.maxLength
      );
    } else if (inputElement.validity.patternMismatch) {
      ptBrErrorMessage = this._PT_BR_ERROR_MESSAGES.patternMismatch;
    }

    errorElement.textContent = ptBrErrorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (errorElement) {
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
      errorElement.classList.remove(this._validationConfig.errorClass);
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement, inputElement.validationMessage)
      : this._hideInputError(inputElement);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._buttonSelector);
    this._hasInvalidInput(inputList)
      ? buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
      : buttonElement.classList.remove(
          this._validationConfig.inactiveButtonClass
        );
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._validationConfig.buttonSelector
    );
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  isFormValid() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    return !this._hasInvalidInput(inputList);
  }

  enableValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(this._buttonSelector);
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this._setEventListeners(inputElement);
    });
  }
}
