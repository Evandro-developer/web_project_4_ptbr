import Popup from "../components/Popup.js";

import FormValidator from "./FormValidator.js";

import Card from "../components/Card.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
} from "../utils/helpers.js";

import {
  addNewCard,
  popupCardAddForm,
  placeInputCardAdd,
  imgLinkInputCardAdd,
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._open = this.open();
    this._close = this.close();
    this._setEventListeners = this.setEventListeners();

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

  _getInputValues = (evt) => {
    evt.preventDefault();
    placeInputCardAdd.placeholder = "Insira o Nome do Local";
    imgLinkInputCardAdd.placeholder = "Insira o URL da Imagem";
    this._open();
    popupCardAddForm.reset();
    this._formValidatorPopupWithForm.enableValidation();
  };

  _setInputValues = (evt) => {
    evt.preventDefault();
    const { value: name } = placeInputCardAdd;
    const { value: link } = imgLinkInputCardAdd;
    if (name && link) {
      addNewCard(name, link);
      Card.addNewCardToDOM();
      this._close();
      popupCardAddForm.reset();
      this._formValidatorPopupWithForm.enableValidation();
    }
  };

  _getButtonsForFunctionsPopupWithForm = () => ({
    "button-add": this._getInputValues,
    "popup__button_card-add": this._setInputValues,
  });

  _handleButtonsForFunctionsPopupWithForm = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctionsPopupWithForm(), evt);

  setEventListenersPopupWithFormToDOM = () => {
    this._open();
    this._close();
    this._setEventListeners;
    addEventToDOM(
      "click",
      this._handleButtonsForFunctionsPopupWithForm,
      document
    );
  };
}
