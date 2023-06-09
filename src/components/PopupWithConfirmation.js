import Popup from "./Popup.js";

import { addEventToDOM, getElement } from "../utils/helpers.js";

export default class PopupWithConfirmation extends Popup {
  constructor() {
    super(".popup_with-confirmation");
    this._btnElement = getElement(".popup__button_with-confirmation");
    this.getBtnElement = this.getBtnElement.bind(this);

    this._formElement = getElement(".popup__form_with-confirmation");
    this.getFormElement = this.getFormElement.bind(this);

    this.setEventListeners();
  }

  getBtnElement() {
    this.open();
    return this._btnElement;
  }

  getFormElement() {
    return this._formElement;
  }

  handleFormOpen = async (evt) => {
    evt.preventDefault();
    this.getBtnElement();
    this.open();
  };

  handleFormSubmit = async (evt) => {
    evt.preventDefault();
    this.getFormElement();
    this.close();
  };

  setEventListenersPopupWithConfirmation = () => {
    addEventToDOM("mousedown", this.handleFormOpen, this._btnElement);
    addEventToDOM("submit", this.handleFormSubmit, this._formElement);
  };
}
