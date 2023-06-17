import Popup from "./Popup.js";
import Section from "./Section.js";
import Card from "./Card.js";
import {
  popupCardAddForm,
  btnSubmitCardAdd,
  currentUserId,
} from "../utils/constants.js";
import {
  apiInstance,
  initializeFormValidator,
  animateOpacity,
  addEvtButtonsForFunctions,
  addEventToDOM,
} from "../utils/helpers.js";

export default class PopupWithForm extends Popup {
  constructor({ nameSelector, linkSelector }) {
    super(".popup_card-add");
    this._name = nameSelector;
    this._link = linkSelector;
    this._btnSubmit = btnSubmitCardAdd;
    this._popupCardAddForm = popupCardAddForm;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupCardAddForm);
    this._cardsSection = new Section(
      { items: [], renderer: () => {} },
      ".cards"
    );
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
      const newCard = await this._setApi.addNewCard(name, link);
      const newCardInstance = new Card(newCard, "#cards-template");
      const userHasLiked = newCard.likes.some(
        (user) => user._id === currentUserId
      );
      const cardItem = newCardInstance.generateCardInstance(
        userHasLiked,
        currentUserId
      );
      this._cardsSection.prependItem(cardItem);
      this._btnSubmit.textContent = "Salvo";
      animateOpacity(cardItem, 0, 1, 400);
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
