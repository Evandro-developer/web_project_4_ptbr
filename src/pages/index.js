import "../styles/index.css";

import {
  nameInputProfile,
  jobInputProfile,
  imgLinkInputAvatar,
  placeInputCardAdd,
  imgLinkInputCardAdd,
} from "../utils/constants.js";

import { addEventToDOM } from "../utils/helpers";

import UserInfo from "../components/UserInfo.js";

import UserInfoAvatar from "../components/UserInfoAvatar";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation";

import Section from "../components/Section.js";

import Card from "../components/Card.js";

import ApiConfig from "../components/ApiConfig.js";

import Api from "../components/Api.js";

const apiConfig = new ApiConfig();

const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: apiConfig.headers,
});

const allCards = api.getInitialCards();

export const cardsSection = new Section(
  {
    items: allCards,
    renderer: async (card) => {
      const newCardInstance = new Card(card, "#cards-template");
      const cardItem = await newCardInstance.generateInstanceCard();
      cardsSection.addItem(cardItem);
    },
  },
  ".cards"
);

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  jobSelector: jobInputProfile,
});

const userInfoAvatar = new UserInfoAvatar({
  linkSelector: imgLinkInputAvatar,
});

const popupWithForm = new PopupWithForm({
  nameSelector: placeInputCardAdd,
  linkSelector: imgLinkInputCardAdd,
});

const popupWithImage = new PopupWithImage();

const popupWithConfirmation = new PopupWithConfirmation();

const getInstancesForDOMContentToLoad = () => {
  apiConfig;
  api;
  allCards;
  api.setEventListenersApi();
  cardsSection.renderItems();
  popupWithForm.setEventListenersPopupWithForm();
  popupWithImage.setEventListenersPopupWithImage();
  popupWithConfirmation.setEventListenersPopupWithConfirmation();
  userInfo.setEventListenersUserInfo();
  userInfoAvatar.setEventListenersUserInfoAvatar();
};

addEventToDOM("DOMContentLoaded", getInstancesForDOMContentToLoad, document);
