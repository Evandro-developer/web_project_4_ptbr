//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import PopupWithImage from "../components/PopupWithImage.js";
import {
  popupCardImg,
  popupCardName,
  heartIconEnabled,
  heartIconDisabled,
} from "../utils/constants.js";
import {
  getElement,
  addEventToDOM,
  isTargetElementClicked,
  evtTargetClosestElement,
  animateOpacity,
  setAttributes,
} from "../utils/helpers.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this.setEventListenerFromPopupWithImage();
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  setEventListenerFromPopupWithImage() {
    this._cardImage.addEventListener("mousedown", () => {
      const popupWithImage = new PopupWithImage();
      popupWithImage.open();
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
}

const renderCards = (cards) => {
  const templateSelector = "#cards-template";
  return cards.map((card) => {
    const newCardInstance = new Card(card, templateSelector);
    return newCardInstance.generateInstanceCard();
  });
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const handleCardLike = (evt) => {
  if (isTargetElementClicked("button-heart-icon", evt.target)) {
    const heartIcon = evtTargetClosestElement("button-heart-icon", evt.target);
    const isActive = heartIcon.getAttribute("data-active") === "true";
    heartIcon.setAttribute("data-active", !isActive);

    setAttributes(
      heartIcon,
      isActive
        ? {
            src: heartIconDisabled,
            alt: "Icon de coração desativado apenas com bordas",
          }
        : {
            src: heartIconEnabled,
            alt: "Icon de coração ativado com preenchimento",
          }
    );
    animateOpacity(heartIcon, 0, 1, 400);
  }
};

//------------------------------------------------------------------------------------------------------------

const handleCardDelete = (evt) => {
  if (isTargetElementClicked("button-trash-icon", evt.target)) {
    const cardDelete = evtTargetClosestElement("card", evt.target);
    animateOpacity(cardDelete, 1, 0, 400, true);
  }
};

//------------------------------------------------------------------------------------------------------------

const addEventsCardsToDOM = () => {
  const cardsSection = getElement(".cards");
  addEventToDOM("mousedown", handleCardLike, cardsSection);
  addEventToDOM("mousedown", handleCardDelete, cardsSection);
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export { Card, renderCards, addEventsCardsToDOM };

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
