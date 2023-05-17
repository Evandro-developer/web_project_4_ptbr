//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import { getAllArrs, getElement, animateOpacity } from "./helpers.js";
import { renderCards } from "../pages/card.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const {
  openPopupProfile,
  popupProfile,
  popupProfileForm,
  nameInputProfile,
  jobInputProfile,
  nameOutputProfile,
  jobOutputProfile,
  btnSubmitProfile,
  btnCloseProfile,
  btnEditProfile,
} = {
  openPopupProfile: "popup__opened",
  popupProfile: getElement("#popup"),
  popupProfileForm: getElement(".popup__form"),
  nameInputProfile: getElement(".popup__input_type_name"),
  jobInputProfile: getElement(".popup__input_type_job"),
  nameOutputProfile: getElement(".header__title"),
  jobOutputProfile: getElement(".header__subtitle"),
  btnSubmitProfile: getElement(".popup__button"),
  btnCloseProfile: getElement(".popup__closed-btn"),
  btnEditProfile: getElement(".button-edit"),
};

export const initialProfile = [
  {
    name: nameOutputProfile.textContent,
    job: jobOutputProfile.textContent,
  },
];

export let newProfiles = [];

export let allProfiles = getAllArrs(newProfiles, initialProfile);

export const createNewProfile = (name, job) =>
  name && job && !allProfiles.some((profile) => profile.name === name)
    ? { name, job }
    : null;

export const addNewProfile = (name, job) => {
  const newProfile = createNewProfile(name, job);
  if (newProfile) {
    newProfiles = [newProfile, ...newProfiles];
    allProfiles = getAllArrs(newProfiles, initialProfile);
  }
  return { allProfiles, newProfiles };
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const {
  openPopupCardAdd,
  popupCardAdd,
  popupCardAddForm,
  popupCardAddButtonSubmit,
  placeInputCardAdd,
  imgLinkInputCardAdd,
} = {
  openPopupCardAdd: "popup_card-add__opened",
  popupCardAdd: getElement("#popup_card-add"),
  popupCardAddForm: getElement("#popup__form_card-add"),
  popupCardAddButtonSubmit: getElement("#popup__button_card-add"),
  placeInputCardAdd: getElement(".popup__input_type_place"),
  imgLinkInputCardAdd: getElement(".popup__input_type_img-link"),
};

export const initialCards = [
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

export let allCards = getAllArrs(newCards, initialCards);

export const createNewCard = (name, link) =>
  name && link ? { name, link, alt: `Imagem de ${name}` } : null;

export const addNewCard = (name, link) => {
  const newCard = createNewCard(name, link);
  if (newCard) {
    newCards = [newCard, ...newCards];
    allCards = getAllArrs(newCards, initialCards);
  }
  return { allCards, newCards };
};

export const addNewCardToDOM = () => {
  const cardsSection = getElement(".cards");
  const newCardToDOM = renderCards(allCards)[0];
  cardsSection.insertBefore(newCardToDOM, cardsSection.firstChild);
  animateOpacity(newCardToDOM, 0, 1, 400);
};

export const heartIconEnabled = require("../images/heart_icon_enabled.png");

export const heartIconDisabled = require("../images/heart_icon_disabled.png");

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const {
  openPopupCardImg,
  popupCardImgOpen,
  popupCardImg,
  popupCardName,
} = {
  openPopupCardImg: "img-popup-card__opened",
  popupCardImgOpen: getElement("#img-popup-card"),
  popupCardImg: getElement(".img-popup-card__image"),
  popupCardName: getElement(".img-popup-card__title"),
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
