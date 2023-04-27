//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const getValidation = (formSelector, inputSelector, submitButtonSelector) => {
  return {
    formSelector: formSelector,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
};

getValidation();

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

class BaseFormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
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

  _createFormValidator = (
    formSelector,
    inputSelector,
    submitButtonSelector
  ) => {
    const formElement = document.querySelector(formSelector);
    const validationConfig = getValidation(
      formSelector,
      inputSelector,
      submitButtonSelector
    );
    return new BaseFormValidator(validationConfig, formElement);
  };

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

//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------

class ProfileFormValidator extends BaseFormValidator {
  constructor(formElement) {
    const validationConfig = getValidation(
      ".popup__form",
      ".popup__input",
      ".popup__button"
    );
    super(validationConfig, formElement);
  }
}

class CardAddFormValidator extends BaseFormValidator {
  constructor(formElement) {
    const validationConfig = getValidation(
      ".popup__form_card_add",
      ".popup__input",
      ".popup__button"
    );
    super(validationConfig, formElement);
  }
}

// //------------------------------------------------------------------------------------------------------------

const formValidatorProfile = new ProfileFormValidator(
  document.querySelector("#popup__form")
);
const formValidatorCardAdd = new CardAddFormValidator(
  document.querySelector("#popup__form_card_add")
);

//------------------------------------------------------------------------------------------------------------

export { formValidatorProfile, formValidatorCardAdd };

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
