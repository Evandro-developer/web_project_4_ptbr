import PopupWithImage from "./PopupWithImage.js";
import {
  popupCardImg,
  popupCardName,
  heartIconEnabled,
  heartIconDisabled,
  allCards,
} from "../utils/constants.js";
import {
  getElement,
  addEventToDOM,
  animateOpacity,
  setAttributes,
  handleLikeFunction,
  handleDeleteFunction,
} from "../utils/helpers.js";

class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._popupWithImage = new PopupWithImage();
    this.setEventListenerFromPopupWithImage();
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  setEventListenerFromPopupWithImage() {
    this._cardImage.addEventListener("mousedown", () => {
      this._popupWithImage.open();
      popupCardImg.src = this._data.link;
      popupCardName.textContent = this._data.name;
    });
  }

  generateInstanceCard() {
    setAttributes(this._cardImage, {
      src: this._data.link,
      alt: `Imagem de ${this._data.name}`,
    });
    this._cardTitle.textContent = this._data.name;
    return this._cardElement;
  }

  static renderCards(cards) {
    this._templateSelector = "#cards-template";
    return cards.map((card) => {
      this._newCardInstance = new Card(card, this._templateSelector);
      return this._newCardInstance.generateInstanceCard();
    });
  }

  static addNewCardToDOM() {
    this._cardsSection = getElement(".cards");
    this._newCardToDOM = this.renderCards(allCards)[0];
    this._cardsSection.insertBefore(
      this._newCardToDOM,
      this._cardsSection.firstChild
    );
    animateOpacity(this._newCardToDOM, 0, 1, 400);
  }
}

const handleHeartCardLike = (evt) =>
  handleLikeFunction(
    evt,
    "button-heart-icon",
    heartIconEnabled,
    heartIconDisabled,
    "Icon de coração ativado com preenchimento",
    "Icon de coração desativado apenas com bordas"
  );

const handleCardDelete = (evt) =>
  handleDeleteFunction(evt, "button-trash-icon", "card");

const addEventsCardsToDOM = () => {
  const cardsSection = getElement(".cards");
  addEventToDOM("mousedown", handleHeartCardLike, cardsSection);
  addEventToDOM("mousedown", handleCardDelete, cardsSection);
};

export { Card, addEventsCardsToDOM };
