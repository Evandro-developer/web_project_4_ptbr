import Popup from "./Popup.js";

import Card from "./Card.js";

import { cardsSection } from "../pages/index.js";

import { popupCardAddForm, btnSubmitCardAdd } from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  addNewCardAsync,
  apiInstance,
  initializeFormValidator,
} from "../utils/helpers.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._cardsSection = cardsSection;
    this._btnSubmit = btnSubmitCardAdd;
    this._popupCardAddForm = popupCardAddForm;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupCardAddForm);
  }

  _getInputValues = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._name.placeholder = "Insira o Nome do Local";
    this._link.placeholder = "Insira o URL da Imagem";
    this.toggle();
    this._popupCardAddForm.reset();
    this._formValidator.enableValidation();
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
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
      this.toggle();
      this._popupCardAddForm.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonsForFunctions = () => ({
    "button-add": this._getInputValues,
    "popup__button_card-add": this._setInputValues,
  });

  _handleButtonsForFunctions = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctions(), evt);

  setEventListeners = () => {
    addEventToDOM("mousedown", this._handleButtonsForFunctions, document);
  };
}
