import Popup from "./Popup.js";
import Card from "./Card.js";
import {
  btnSubmitCardAdd,
  popupCardAddForm,
  sectionCards,
} from "../utils/constants.js";
import {
  apiInstance,
  initializeFormValidator,
  animateOpacity,
  setButtonFunctionId,
  addEventToDOM,
} from "../utils/helpers.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._btnSubmit = btnSubmitCardAdd;
    this._popupForm = popupCardAddForm;
    this._sectionCards = sectionCards;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupForm);
  }

  _getInputValues = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._name.placeholder = "Insira o Nome do Local";
    this._link.placeholder = "Insira o URL da Imagem";
    this.toggle();
    this._popupForm.reset();
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
      this._newCard = await this._setApi.addNewCard(name, link);
      this._newCardInstance = new Card(this._newCard, "#cards-template");
      this._cardItem = this._newCardInstance.generateCardInstance();
      this._sectionCards.prepend(this._cardItem);
      this._btnSubmit.textContent = "Salvo";
      animateOpacity(this._cardItem, 0, 1, 300);
      this.toggle();
      this._popupForm.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-add": this._getInputValues,
    "popup__button_card-add": this._setInputValues,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionId(this._getButtonForFunctions(), evt);

  setEventListeners = () => {
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
