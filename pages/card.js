//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import {
  getElement,
  setAttributes,
  animateOpacity,
  handlePopupCardImgToggle,
  popupCardImg,
  popupCardName,
} from "./utils.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const cardAddPopupElements = {
  openPopupCardAdd: "popup__opened_card_add",
  popupCardAdd: getElement("#popup_card_add"),
  popupCardAddForm: getElement("#popup__form_card_add"),
  popupCardAddButtonSubmit: getElement("#popup__button_card_add"),
  placeInputCardAdd: getElement(".popup__input_type_place"),
  imgLinkInputCardAdd: getElement(".popup__input_type_img-link"),
};

export const {
  openPopupCardAdd,
  popupCardAdd,
  popupCardAddForm,
  popupCardAddButtonSubmit,
  placeInputCardAdd,
  imgLinkInputCardAdd,
} = cardAddPopupElements;

//------------------------------------------------------------------------------------------------------------

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    alt: "Imagem do vale de Yosemite com um rio, árvores, montanhas ao fundo e muita natureza",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    alt: "Imagem do Lago Louise com montanhas ao fundo e natureza exuberante",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    alt: "Imagem das Montanhas Carecas, vegetação com árvores e ao fundo o pör do sol",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    alt: "Imagem do vale de Latemar, montanhas ao fundo e céu estrelado",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    alt: "Imagem do Parque Nacional Vanoise com Lago, montanhas ao fundo e natureza belissima",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    alt: "Imagem do Lago di Braies com um deck, barcos ancorados, montanhas ao fundo e natureza preservada",
  },
];

export let newCards = [];

const getAllCards = () => {
  return [
    ...newCards.map((card) => ({ ...card })),
    ...initialCards.map((card) => ({ ...card })),
  ];
};

export let allCards = getAllCards();

//------------------------------------------------------------------------------------------------------------

const createNewCard = (name, link) =>
  name && link
    ? {
        name,
        link,
        alt: `Imagem de ${name}`,
      }
    : null;

export const addNewCard = (name, link) => {
  const newCard = createNewCard(name, link);
  if (newCard) {
    newCards = [newCard, ...newCards];
    allCards = getAllCards();
  }
  return { allCards, newCards };
};

export const addNewCardToDOM = () => {
  const cardsSection = getElement(".cards");
  const newCardToDOM = renderCards(allCards)[0];
  cardsSection.insertBefore(newCardToDOM, cardsSection.firstChild);
  animateOpacity(newCardToDOM, 0, 1, 400);
};

//------------------------------------------------------------------------------------------------------------

class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._cardElement = this.#_getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this.#_setEventListeners();
  }

  #_getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  #_setEventListeners() {
    this._cardImage.addEventListener("mousedown", () => {
      handlePopupCardImgToggle();
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

export const renderCards = (cards) => {
  const templateSelector = "#cards-template";
  return cards.map((card) => {
    const newCardInstance = new Card(card, templateSelector);
    return newCardInstance.generateInstanceCard();
  });
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
