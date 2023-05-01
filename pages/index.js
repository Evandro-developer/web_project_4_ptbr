//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

import { renderCards, allCards, popupCardAdd } from "./card.js";

import {
  handlePopupProfileToggle,
  handlePopupCardAddToggle,
  handlePopupCardImgToggle,
  handleProfileFormEdit,
  handleCardAddFormEdit,
  handleProfileFormSubmit,
  handleCardAddFormSubmit,
  handleCardLike,
  handleCardDelete,
  handleOutsideClickProfile,
  handleOutsideClickCardAdd,
  handleOutsideClickCardImg,
  handleKeyPressProfile,
  handleKeyPressCardAdd,
  handleKeyPressCardImg,
  popupProfile,
  popupCardImgOpen,
  getElement,
} from "./utils.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const buttonFunctions = {
  "popup__closed-btn": handlePopupProfileToggle,
  "popup__closed-btn_card_add": handlePopupCardAddToggle,
  "img-popup-card__closed-btn": handlePopupCardImgToggle,
  "button-edit": handleProfileFormEdit,
  "button-add": handleCardAddFormEdit,
  popup__button: handleProfileFormSubmit,
  popup__button_card_add: handleCardAddFormSubmit,
};

const handleButtonClick = (evt) => {
  const buttonFunctionId = buttonFunctions[evt.target.id];
  buttonFunctionId ? buttonFunctionId(evt) : null;
};

//------------------------------------------------------------------------------------------------------------

const addCardsToDOM = () => {
  const cardsSection = getElement(".cards");
  const cardsToDOM = renderCards(allCards);
  cardsSection.replaceChildren(...cardsToDOM);
};

const addEventToDOM = (evt, handler, targetElement) => {
  targetElement.addEventListener(evt, handler);
};

const addEventsToDOM = () => {
  const cardsSection = getElement(".cards");
  addEventToDOM("mousedown", handleCardLike, cardsSection);
  addEventToDOM("mousedown", handleCardDelete, cardsSection);
  addEventToDOM("mousedown", handleOutsideClickProfile, popupProfile);
  addEventToDOM("mousedown", handleOutsideClickCardAdd, popupCardAdd);
  addEventToDOM("mousedown", handleOutsideClickCardImg, popupCardImgOpen);
  addEventToDOM("keydown", handleKeyPressProfile, document);
  addEventToDOM("keydown", handleKeyPressCardAdd, document);
  addEventToDOM("keydown", handleKeyPressCardImg, document);
  addEventToDOM("click", handleButtonClick, document);
};

const addCardsAndEventsToDOM = () => {
  addCardsToDOM();
  addEventsToDOM();
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", addCardsAndEventsToDOM);

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
