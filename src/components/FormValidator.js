export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._PT_BR_ERROR_MESSAGES = {
      // se alterar mais do que isso nao valida os campos,
      // está acompanhando o idioma do navegador,
      // o idioma principal é ptBr, se não, idioma do navegador,
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

  #_showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.classList.add(this._validationConfig.errorClass);
    const errorType = inputElement.validationMessage;
    const ptBrErrorMessage =
      this._PT_BR_ERROR_MESSAGES[errorType] || errorMessage;
    errorElement.textContent = ptBrErrorMessage;
  }

  #_hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement &&
      (inputElement.classList.remove(this._validationConfig.inputErrorClass),
      errorElement.classList.remove(this._validationConfig.errorClass),
      (errorElement.textContent = ""));
  }

  #_checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this.#_showInputError(inputElement, inputElement.validationMessage)
      : this.#_hideInputError(inputElement);
  }

  #_hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  #_toggleButtonState(inputList, buttonElement) {
    this.#_hasInvalidInput(inputList)
      ? buttonElement.classList.add(this._validationConfig.inactiveButtonClass)
      : buttonElement.classList.remove(
          this._validationConfig.inactiveButtonClass
        );
  }

  #_setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this.#_toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#_checkInputValidity(inputElement);
        this.#_toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    const buttonElement = this._formElement.querySelector(".popup__button");
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#_toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this.#_setEventListeners(inputElement);
    });
  }
}
