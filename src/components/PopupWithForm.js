//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import Popup from "../components/Popup.js";
import { BaseFormValidator, getValidation } from "../pages/formValidator.js";
import { addEvtButtonsForFunctions, addEventToDOM } from "../utils/helpers.js";
import {
  popupCardAddForm,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  addNewCard,
  addNewCardToDOM,
} from "../utils/constants.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

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

    this._formValidatorPopupWithForm = new BaseFormValidator(
      validationConfig,
      popupCardAddForm
    );

    this._formValidatorPopupWithForm.enableValidation();
  }

  _getInputValues = (evt) => {
    evt.preventDefault();
    placeInputCardAdd.placeholder = "Título";
    imgLinkInputCardAdd.placeholder = "URL da Imagem";
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
      addNewCardToDOM();
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

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
