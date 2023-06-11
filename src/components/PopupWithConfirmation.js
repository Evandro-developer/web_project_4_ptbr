import Popup from "./Popup.js";

import {
  addEventToDOM,
  closestElement,
  createApiInstance,
  handleDeleteFunction,
} from "../utils/helpers.js";

import {
  popupFormWithConfirmation,
  popupBtnWithConfirmation,
} from "../utils/constants.js";

export default class PopupWithConfirmation extends Popup {
  constructor() {
    super(".popup_with-confirmation");
    this._popupWithConfirmationForm = popupFormWithConfirmation;
    this._btnSubmit = popupBtnWithConfirmation;
    this.setEventListeners();
    this._setApi = createApiInstance();
    this.deletePromise = null;
  }

  handleFormOpen = async (evt) => {
    evt.preventDefault();
    this._deleteBtn = closestElement(evt, ".card");
    this._selectedElement = closestElement(evt, ".button-trash-icon");
    if (this._deleteBtn) {
      this._popupWithConfirmationForm;
      this.open();
    }
  };

  handleFormSubmit = async (evt, cardId) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Sim";
    if (this._deleteBtn && !this.deletePromise) {
      this.deletePromise = new Promise((resolve) => {
        addEventToDOM(
          "submit",
          (evt) => {
            evt.preventDefault();
            this._btnSubmit.textContent = "Excluindo...";
            resolve(); // Resolve a promessa do evento submit do Formulário
          },
          this._popupWithConfirmationForm
        );
      })
        .then(async () => {
          await this._setApi.deleteCard(cardId); // Usando a função deleteCard da API
        })
        .then(() => {
          handleDeleteFunction(evt, "button-trash-icon", "card"); // Usando a função handleDeleteFunction para remoção no DOM
          this._btnSubmit.textContent = "Excluido";
        })
        .finally(() => {
          this.close(); // Usando a função this.close() após tudo concluido para fechamento do popup
          this.deletePromise = null; // redefine a promessa para permitir exclusões subsequentes
        });
    }
  };
}
