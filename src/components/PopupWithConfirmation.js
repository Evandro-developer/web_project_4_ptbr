import Popup from "./Popup.js";
import {
  addEventToDOM,
  closestElement,
  apiInstance,
  handleDeleteFunction,
} from "../utils/helpers.js";
import {
  popupFormWithConfirmation,
  popupBtnWithConfirmation,
} from "../utils/constants.js";

export default class PopupWithConfirmation extends Popup {
  constructor() {
    super(".popup_with-confirmation");
    this._popupForm = popupFormWithConfirmation;
    this._btnSubmit = popupBtnWithConfirmation;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
  }

  handleFormOpen = async (evt) => {
    evt.preventDefault();
    this._selectedElement = closestElement(evt, ".card");
    this._deleteBtn = closestElement(evt, ".button-trash-icon");
    if (this._selectedElement) {
      this._popupForm;
      this.toggle();
    }
  };

  handleFormSubmit = async (evt, cardId) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Sim";
    if (this._btnSubmit && !this.deletePromise) {
      this.deletePromise = new Promise((resolve) => {
        addEventToDOM(
          "submit",
          (evt) => {
            evt.preventDefault();
            this._btnSubmit.textContent = "Excluindo...";
            resolve();
          },
          this._popupForm
        );
      })
        .then(async () => {
          await this._setApi.deleteCard(cardId);
        })
        .then(() => {
          handleDeleteFunction(evt, "button-trash-icon", "card");
          this._btnSubmit.textContent = "Excluido";
        })
        .finally(() => {
          this.toggle();
        });
    }
  };
}
