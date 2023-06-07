import Popup from "./Popup.js";

import FormValidator from "./FormValidator.js";

import Card from "./Card.js";

import ApiConfig from "./ApiConfig.js";

import Api from "./Api.js";

import { cardsSection } from "../pages/index.js";

import { popupCardAddForm, btnSubmitCardAdd } from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
  animateOpacity,
} from "../utils/helpers.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._open = this.open();
    this._close = this.close();
    this._setEventListeners = this.setEventListeners();
    this._cardsSection = cardsSection;
    this._btnSubmit = btnSubmitCardAdd;

    this._apiConfig = new ApiConfig();
    this._setApi = new Api({
      baseUrl: this._apiConfig.baseUrl,
      headers: this._apiConfig.headers,
    });

    const validationConfig = getValidation(
      popupCardAddForm,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorPopupWithForm = new FormValidator(
      validationConfig,
      popupCardAddForm
    );

    this._formValidatorPopupWithForm.enableValidation();
  }

  _getInputValues = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    try {
      await this._setApi.getInitialCards();
      this._name.placeholder = "Insira o Nome do Local";
      this._link.placeholder = "Insira o URL da Imagem";
      this._open();
      popupCardAddForm.reset();
      this._formValidatorPopupWithForm.enableValidation();
    } catch (error) {
      console.error("Erro ao carregar cards:", error);
    }
  };

  _setInputValues = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvando...";
    const { value: name } = this._name;
    const { value: link } = this._link;
    if (name && link) {
      try {
        const newCard = await this._setApi.addNewCard(name, link);
        this._btnSubmit.textContent = "Salvo";
        const newCardInstance = new Card(newCard, "#cards-template");
        const cardItem = await newCardInstance.generateInstanceCard();
        this._cardsSection.prependItem(cardItem);
        this._close();
        popupCardAddForm.reset();
        this._formValidatorPopupWithForm.enableValidation();
        animateOpacity(cardItem, 0, 1, 400);
      } catch (error) {
        console.error("Erro ao adicionar novo card:", error);
      }
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
