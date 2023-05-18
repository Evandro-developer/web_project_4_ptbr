import "./styles/index.css";
import {
  nameInputProfile,
  jobInputProfile,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  allCards,
} from "./utils/constants.js";
import { Card, addEventsCardsToDOM } from "./components/Card.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  jobSelector: jobInputProfile,
});

const popupWithForm = new PopupWithForm({
  nameSelector: placeInputCardAdd,
  jobSelector: imgLinkInputCardAdd,
});

const popupWithImage = new PopupWithImage();

const cardsSection = new Section(
  {
    items: allCards,
    renderer: (card) => {
      const newCardInstance = new Card(card, "#cards-template");
      const cardElement = newCardInstance.generateInstanceCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".cards"
);

const addCardsToDOM = () => {
  cardsSection.renderItems();
};

const addContentToDOM = () => {
  userInfo.setEventListenersUserInfoToDOM();
  popupWithForm.setEventListenersPopupWithFormToDOM();
  popupWithImage.setEventListenersPopupWithImageToDOM();
  addCardsToDOM();
  addEventsCardsToDOM();
};

document.addEventListener("DOMContentLoaded", addContentToDOM);
