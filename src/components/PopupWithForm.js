import Popup from "./Popup.js";

import FormValidator from "./FormValidator.js";

import Card from "./Card.js";

import { cardsSection } from "../pages/index.js";

import { popupCardAddForm, btnSubmitCardAdd } from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
  apiInstance,
  addNewCardAsync,
} from "../utils/helpers.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._cardsSection = cardsSection;
    this._btnSubmit = btnSubmitCardAdd;
    this._popupCardAddForm = popupCardAddForm;

    this.setEventListeners();

    this._setApi = apiInstance();

    this._validationConfig = getValidation(
      this._popupCardAddForm,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorPopupWithForm = new FormValidator(
      this._validationConfig,
      this._popupCardAddForm
    );

    this._formValidatorPopupWithForm.enableValidation();
  }

  _getInputValues = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._setApi.getInitialCards();
    this._name.placeholder = "Insira o Nome do Local";
    this._link.placeholder = "Insira o URL da Imagem";
    this.open();
    this._popupCardAddForm.reset();
    this._formValidatorPopupWithForm.enableValidation();
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    if (!this._formValidatorPopupWithForm.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = "Salvando...";
    const { value: name } = this._name;
    const { value: link } = this._link;
    if (name && link) {
      addNewCardAsync(
        Card,
        this._cardsSection,
        this._setApi,
        name,
        link,
        "#cards-template"
      );
      this._btnSubmit.textContent = "Salvo";
      this.close();
      this._popupCardAddForm.reset();
      this._formValidatorPopupWithForm.enableValidation();
    }
  };

  _getButtonsForFunctionsPopupWithForm = () => ({
    "button-add": this._getInputValues,
    "popup__button_card-add": this._setInputValues,
  });

  _handleButtonsForFunctionsPopupWithForm = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctionsPopupWithForm(), evt);

  setEventListenersPopupWithForm = () => {
    addEventToDOM(
      "mousedown",
      this._handleButtonsForFunctionsPopupWithForm,
      document
    );
  };
}
