//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import { enableValidation } from "./validate.js";

const validationOptions = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopup = "popup__opened";
const popup = document.querySelector("#popup");
const popupForm = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const nameOutput = document.querySelector(".header__title");
const jobOutput = document.querySelector(".header__subtitle");

//------------------------------------------------------------------------------------------------------------

const initialProfile = [
  {
    name: nameOutput.textContent,
    job: jobOutput.textContent,
  },
];

let newProfiles = [];

const getAllProfiles = () => {
  return [
    ...(newProfiles.length > 0
      ? newProfiles.map((profile) => ({ ...profile }))
      : []),
    ...initialProfile.map((profile) => ({ ...profile })),
  ];
};

let allProfiles = getAllProfiles();

//------------------------------------------------------------------------------------------------------------

const toggle = (popupClassOpenned, popupClass) =>
  popupClass.classList.toggle(popupClassOpenned);

const callIfFunction = (func) => typeof func === "function" && func();

const toggleDisplay = (displayValue, openedFunc, popupClass) => {
  callIfFunction(openedFunc);
  const style = popupClass.style;
  return (style.display = displayValue);
};

const contains = (className, element) => element.classList.contains(className);

const togglePopupDisplay = (popupClassOpenned, popupClass, openedFunc) => {
  const isOpen = contains(popupClassOpenned, popupClass);
  toggleDisplay(isOpen ? "hidden" : "block", openedFunc, popupClass);
};

//------------------------------------------------------------------------------------------------------------

const popupOpened = () => toggle(openPopup, popup);

const handlePopupToggle = () =>
  togglePopupDisplay(openPopup, popup, popupOpened);

//------------------------------------------------------------------------------------------------------------

const createNewProfile = (name, job) => {
  return name && job && !allProfiles.some((profile) => profile.name === name)
    ? { name, job }
    : null;
};

const addNewProfile = (name, job) => {
  const newProfile = createNewProfile(name, job);
  if (newProfile) {
    newProfiles = [newProfile, ...newProfiles];
    allProfiles = getAllProfiles();
  }
  return { allProfiles, newProfiles };
};

//------------------------------------------------------------------------------------------------------------

const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  const { textContent: outputName } = nameOutput;
  const { textContent: outputJob } = jobOutput;
  nameInput.placeholder = outputName;
  jobInput.placeholder = outputJob;
  handlePopupToggle();
  popupForm.reset();
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: name } = nameInput;
  const { value: job } = jobInput;

  if (name && job) {
    addNewProfile(name, job);
    handlePopupToggle();
    nameOutput.textContent = name;
    jobOutput.textContent = job;
    popupForm.reset();
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopupCardAdd = "popup__opened_card_add";
const popupCardAdd = document.querySelector("#popup_card_add");
const placeInputCardAdd = document.querySelector(".popup__input_type_place");
const imgLinkInputCardAdd = document.querySelector(
  ".popup__input_type_img-link"
);

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

let newCards = [];

const getAllCards = () => {
  return [
    ...(newCards.length > 0 ? newCards.map((card) => ({ ...card })) : []),
    ...initialCards.map((card) => ({ ...card })),
  ];
};

let allCards = getAllCards();

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardAdd = () => toggle(openPopupCardAdd, popupCardAdd);

const handlePopupCardAddToggle = () =>
  togglePopupDisplay(openPopupCardAdd, popupCardAdd, popupOpenedCardAdd);

//------------------------------------------------------------------------------------------------------------

const createNewCard = (name, link) => {
  return name && link ? { name, link, alt: `Imagem de ${name}` } : null;
};

const addNewCard = (name, link) => {
  const newCard = createNewCard(name, link);
  if (newCard) {
    newCards = [newCard, ...newCards];
    allCards = getAllCards();
  }
  return { allCards, newCards };
};

const animateOpacity = (
  element,
  startOpacity,
  endOpacity,
  duration,
  removeOnFinish = false
) => {
  element.animate([{ opacity: startOpacity }, { opacity: endOpacity }], {
    duration: duration,
    easing: "ease-in-out",
  }).onfinish = () => {
    if (removeOnFinish) {
      element.remove();
    }
  };
};

const addNewCardToDOM = () => {
  const cards = document.querySelector(".cards");
  const newCardToDOM = renderCards(allCards)[0];
  cards.insertBefore(newCardToDOM, cards.firstChild);
  animateOpacity(newCardToDOM, 0, 1, 400);
};

//------------------------------------------------------------------------------------------------------------

const handleCardFormAdd = (evt) => {
  evt.preventDefault();
  placeInputCardAdd.placeholder = "Title";
  imgLinkInputCardAdd.placeholder = "Image url";
  handlePopupCardAddToggle();
  placeInputCardAdd.value = "";
  imgLinkInputCardAdd.value = "";
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: name } = placeInputCardAdd;
  const { value: link } = imgLinkInputCardAdd;

  if (name && link) {
    addNewCard(name, link);
    addNewCardToDOM();
    handlePopupCardAddToggle();
    placeInputCardAdd.value = "";
    imgLinkInputCardAdd.value = "";
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopupCardImg = "popup-card-img__opened";
const popupCardImgOpen = document.querySelector("#popup-card-img");
const popupCardImg = document.querySelector(".popup-card-img__image");
const popupCardName = document.querySelector(".popup-card-img__title");

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardImg = () => toggle(openPopupCardImg, popupCardImgOpen);

const handlePopupCardImgToggle = () =>
  togglePopupDisplay(openPopupCardImg, popupCardImgOpen, popupOpenedCardImg);

//------------------------------------------------------------------------------------------------------------

const renderCard = (card) => {
  const cardTemplate = document.querySelector("#cards-template").content;

  const cards = cardTemplate.querySelector(".cards");

  const cardElement = cards.querySelector(".card").cloneNode(true);

  const imgLinkOutputCardAdd = cardElement.querySelector(".card__image");
  imgLinkOutputCardAdd.src = card.link;
  imgLinkOutputCardAdd.setAttribute("alt", `imagem de ${card.name}`);
  imgLinkOutputCardAdd.addEventListener("mousedown", () => {
    handlePopupCardImgToggle();
    popupCardImg.src = card.link;
    popupCardName.textContent = card.name;
  });

  const cardBriefing = cardElement.querySelector(".card__briefing");

  const placeOutputCardAdd = cardBriefing.querySelector(".card__title");
  placeOutputCardAdd.textContent = card.name;

  cards.prepend(cardElement);

  return cardElement;
};

const renderCards = (cards) => {
  return cards.map((card) => renderCard(card));
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const handleCardLike = (evt) => {
  if (contains("button-heart-icon", evt.target)) {
    const heartIcon = evt.target.closest(".button-heart-icon");
    const isActive = heartIcon.getAttribute("data-active") === "true";
    heartIcon.setAttribute("data-active", !isActive);
    heartIcon.src = isActive
      ? "./images/heart_icon_disabled.png"
      : "./images/heart_icon_enabled.png";
    animateOpacity(heartIcon, 0, 1, 400);
  }
};

const handleCardDelete = (evt) => {
  if (contains("button-trash-icon", evt.target)) {
    const cardDelete = evt.target.closest(".card");
    animateOpacity(cardDelete, 1, 0, 400, true);
  }
};

//------------------------------------------------------------------------------------------------------------

const removePopupHandler = (popupClass, popupClassOpenned) => () => {
  popupClass.classList.remove(popupClassOpenned);
};

const handleKeyPressFunction = (removePopupFunc) => (evt) => {
  evt.key === "Escape" ? removePopupFunc() : null;
};

const handleOutsideClickFunction = (popupClass, removePopupFunc) => (evt) =>
  contains(popupClass, evt.target)
    ? removePopupFunc(evt.target.closest(`.${popupClass}`))
    : null;

//------------------------------------------------------------------------------------------------------------

const closePopup = removePopupHandler(popup, openPopup);
const handleKeyPress = handleKeyPressFunction(closePopup);
const handleOutsideClick = handleOutsideClickFunction("popup", closePopup);

const closePopupCardAdd = removePopupHandler(popupCardAdd, openPopupCardAdd);
const handleKeyPressCardAdd = handleKeyPressFunction(closePopupCardAdd);
const handleOutsideClickCardAdd = handleOutsideClickFunction(
  "popup_card_add",
  closePopupCardAdd
);

const closePopupCardImg = removePopupHandler(
  popupCardImgOpen,
  openPopupCardImg
);
const handleKeyPressCardImg = handleKeyPressFunction(closePopupCardImg);
const handleOutsideClickCardImg = handleOutsideClickFunction(
  "popup-card-img",
  closePopupCardImg
);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const buttonFunctions = {
  "popup__closed-btn": handlePopupToggle,
  "popup__closed-btn_card_add": handlePopupCardAddToggle,
  "popup-card-img__closed-btn": handlePopupCardImgToggle,
  "button-edit": handleProfileFormEdit,
  "button-add": handleCardFormAdd,
  popup__button: handleProfileFormSubmit,
  popup__button_card_add: handleCardFormSubmit,
};

const handleButtonClick = (evt) => {
  const buttonFunctionId = buttonFunctions[evt.target.id];
  buttonFunctionId ? buttonFunctionId(evt) : null;
};

//------------------------------------------------------------------------------------------------------------

const addEventToDOM = (evt, handler, element) => {
  element.addEventListener(evt, handler);
};

//------------------------------------------------------------------------------------------------------------

const addCardsAndEventsToDOM = () => {
  const cards = document.querySelector(".cards");
  const cardsToDOM = renderCards(allCards);
  cards.prepend(...cardsToDOM);
  addEventToDOM("mousedown", handleCardLike, cards);
  addEventToDOM("mousedown", handleCardDelete, cards);
  addEventToDOM("mousedown", handleOutsideClick, popup);
  addEventToDOM("mousedown", handleOutsideClickCardAdd, popupCardAdd);
  addEventToDOM("mousedown", handleOutsideClickCardImg, popupCardImgOpen);
  addEventToDOM("keydown", handleKeyPress, document);
  addEventToDOM("keydown", handleKeyPressCardAdd, document);
  addEventToDOM("keydown", handleKeyPressCardImg, document);
  addEventToDOM("click", handleButtonClick, document);
  enableValidation(validationOptions);
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", addCardsAndEventsToDOM);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
