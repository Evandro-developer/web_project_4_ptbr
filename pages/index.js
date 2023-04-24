//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import { resetForm } from "./validate.js";

import { toggleButtonState } from "./validate.js";

import { validationOptions } from "./validate.js";

import { enableValidation } from "./validate.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopupProfile = "popup__opened";
const popupProfile = document.querySelector("#popup");
const popupProfileForm = document.querySelector(".popup__form");
const popupProfileButtonSubmit = document.querySelector("#popup__button");
const nameInputProfile = document.querySelector(".popup__input_type_name");
const jobInputProfile = document.querySelector(".popup__input_type_job");
const nameOutputProfile = document.querySelector(".header__title");
const jobOutputProfile = document.querySelector(".header__subtitle");

//------------------------------------------------------------------------------------------------------------

const initialProfile = [
  {
    name: nameOutputProfile.textContent,
    job: jobOutputProfile.textContent,
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

const callIfFunction = (callback) =>
  typeof callback === "function" && callback();

const styleDisplayValue = (displayValue, targetElement, callback) => {
  callIfFunction(callback);
  const style = targetElement.style;
  return (style.display = displayValue);
};

const contains = (targetClassName, targetElement) =>
  targetElement.classList.contains(targetClassName);

const togglePopupDisplay = (targetClassName, targetElement, callback) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "hidden" : "block", targetElement, callback);
};

const toggle = (targetClassName, targetElement) =>
  targetElement.classList.toggle(targetClassName);

//------------------------------------------------------------------------------------------------------------

const popupProfileOpened = () => toggle(openPopupProfile, popupProfile);

const handlePopupProfileToggle = () =>
  togglePopupDisplay(openPopupProfile, popupProfile, popupProfileOpened);

//------------------------------------------------------------------------------------------------------------

const createNewProfile = (nameInputProfile, jobInputProfile) => {
  return nameInputProfile &&
    jobInputProfile &&
    !allProfiles.some(
      (profile) => profile.nameInputProfile === nameInputProfile
    )
    ? { nameInputProfile, jobInputProfile }
    : null;
};

const addNewProfile = (nameInputProfile, jobInputProfile) => {
  const newProfile = createNewProfile(nameInputProfile, jobInputProfile);
  if (newProfile) {
    newProfiles = [newProfile, ...newProfiles];
    allProfiles = getAllProfiles();
  }
  return { allProfiles, newProfiles };
};

//------------------------------------------------------------------------------------------------------------

const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  const { textContent: nameOutput } = nameOutputProfile;
  const { textContent: jobOutput } = jobOutputProfile;
  nameInputProfile.placeholder = nameOutput;
  jobInputProfile.placeholder = jobOutput;
  handlePopupProfileToggle();
  resetForm(popupProfileForm);
  toggleButtonState(
    [nameInputProfile, jobInputProfile],
    popupProfileButtonSubmit
  );
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: nameInput } = nameInputProfile;
  const { value: jobInput } = jobInputProfile;

  if (nameInput && jobInput) {
    addNewProfile(nameInput, jobInput);
    handlePopupProfileToggle();
    nameOutputProfile.textContent = nameInput;
    jobOutputProfile.textContent = jobInput;
    resetForm(popupProfileForm);
    toggleButtonState(
      [nameInputProfile, jobInputProfile],
      popupProfileButtonSubmit
    );
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopupCardAdd = "popup__opened_card_add";
const popupCardAdd = document.querySelector("#popup_card_add");
const popupCardAddForm = document.querySelector("#popup__form_card_add");
const popupCardAddButtonSubmit = document.querySelector(
  "#popup__button_card_add"
);
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
  return name && link
    ? {
        name,
        link,
        alt: `Imagem de ${name}`,
      }
    : null;
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
  targetElement,
  startOpacity,
  endOpacity,
  duration,
  removeOnFinish = false
) => {
  targetElement.animate([{ opacity: startOpacity }, { opacity: endOpacity }], {
    duration: duration,
    easing: "ease-in-out",
  }).onfinish = () => {
    if (removeOnFinish) {
      targetElement.remove();
    }
  };
};

const addNewCardToDOM = () => {
  const cardsSection = document.querySelector(".cards");
  const newCardToDOM = renderCards(allCards)[0];
  cardsSection.insertBefore(newCardToDOM, cardsSection.firstChild);
  animateOpacity(newCardToDOM, 0, 1, 400);
};

//------------------------------------------------------------------------------------------------------------

const handleCardAddFormEdit = (evt) => {
  evt.preventDefault();
  placeInputCardAdd.placeholder = "Título";
  imgLinkInputCardAdd.placeholder = "URL da Imagem ";
  handlePopupCardAddToggle();
  resetForm(popupCardAddForm);
  toggleButtonState(
    [placeInputCardAdd, imgLinkInputCardAdd],
    popupCardAddButtonSubmit
  );
};

const handleCardAddFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: name } = placeInputCardAdd;
  const { value: link } = imgLinkInputCardAdd;

  if (name && link) {
    addNewCard(name, link);
    addNewCardToDOM();
    handlePopupCardAddToggle();
    resetForm(popupCardAddForm);
    toggleButtonState(
      [placeInputCardAdd, imgLinkInputCardAdd],
      popupCardAddButtonSubmit
    );
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

const setAttributes = (targetElement, attributes) => {
  for (let attribute in attributes) {
    targetElement.setAttribute(attribute, attributes[attribute]);
  }
};

const renderCard = (card) => {
  const cardTemplate = document.querySelector("#cards-template").content;

  const cardsSection = cardTemplate.querySelector(".cards");

  const cardElement = cardsSection.querySelector(".card").cloneNode(true);

  const imgLinkOutputCardAdd = cardElement.querySelector(".card__image");
  imgLinkOutputCardAdd.addEventListener("mousedown", () => {
    handlePopupCardImgToggle();
    popupCardImg.src = card.link;
    popupCardName.textContent = card.name;
  });
  setAttributes(imgLinkOutputCardAdd, {
    src: card.link,
    alt: `Imagem de ${card.name}`,
  });

  const cardBriefing = cardElement.querySelector(".card__briefing");

  const placeOutputCardAdd = cardBriefing.querySelector(".card__title");
  placeOutputCardAdd.textContent = card.name;

  cardsSection.prepend(cardElement);

  return cardElement;
};

const renderCards = (cards) => {
  return cards.map((card) => renderCard(card));
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const evtTargetClosestElement = (targetClassName, targetElement) => {
  return targetElement.closest("." + targetClassName);
};

const isTargetElementClicked = (targetClassName, targetElement) =>
  contains(targetClassName, targetElement) &&
  evtTargetClosestElement(`${targetClassName}`, targetElement);

const handleCardLike = (evt) => {
  if (isTargetElementClicked("button-heart-icon", evt.target)) {
    const heartIcon = evtTargetClosestElement("button-heart-icon", evt.target);
    const isActive = heartIcon.getAttribute("data-active") === "true";
    heartIcon.setAttribute("data-active", !isActive);
    setAttributes(
      heartIcon,
      isActive
        ? {
            src: "./images/heart_icon_disabled.png",
            alt: "Icon de coração desativado apenas com bordas",
          }
        : {
            src: "./images/heart_icon_enabled.png",
            alt: "Icon de coração ativado com preenchimento",
          }
    );
    animateOpacity(heartIcon, 0, 1, 400);
  }
};

const handleCardDelete = (evt) => {
  if (isTargetElementClicked("button-trash-icon", evt.target)) {
    const cardDelete = evtTargetClosestElement("card", evt.target);
    animateOpacity(cardDelete, 1, 0, 400, true);
  }
};

//------------------------------------------------------------------------------------------------------------

const remove = (targetClassName, targetElement) =>
  targetElement.classList.remove(targetClassName);

const handleKeyPressFunction = (removePopupFunc) => (evt) => {
  evt.key === "Escape" ? callIfFunction(removePopupFunc) : null;
};

const handleOutsideClickFunction =
  (targetClassName, removePopupFunc) => (evt) =>
    isTargetElementClicked(targetClassName, evt.target)
      ? callIfFunction(removePopupFunc)
      : null;

//------------------------------------------------------------------------------------------------------------

const closePopupProfile = () => remove(openPopupProfile, popupProfile);
const handleKeyPressProfile = handleKeyPressFunction(closePopupProfile);
const handleOutsideClickProfile = handleOutsideClickFunction(
  "popup",
  closePopupProfile
);

const closePopupCardAdd = () => remove(openPopupCardAdd, popupCardAdd);
const handleKeyPressCardAdd = handleKeyPressFunction(closePopupCardAdd);
const handleOutsideClickCardAdd = handleOutsideClickFunction(
  "popup_card_add",
  closePopupCardAdd
);

const closePopupCardImg = () => remove(openPopupCardImg, popupCardImgOpen);
const handleKeyPressCardImg = handleKeyPressFunction(closePopupCardImg);
const handleOutsideClickCardImg = handleOutsideClickFunction(
  "popup-card-img",
  closePopupCardImg
);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const buttonFunctions = {
  "popup__closed-btn": handlePopupProfileToggle,
  "popup__closed-btn_card_add": handlePopupCardAddToggle,
  "popup-card-img__closed-btn": handlePopupCardImgToggle,
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

//------------------------------------------------------------------------------------------------------------

const addCardsToDOM = () => {
  const cardsSection = document.querySelector(".cards");
  const cardsToDOM = renderCards(allCards);
  cardsSection.prepend(...cardsToDOM);
};

const addEventToDOM = (evt, handler, targetElement) => {
  targetElement.addEventListener(evt, handler);
};

const addEventsToDOM = () => {
  const cardsSection = document.querySelector(".cards");
  addEventToDOM("mousedown", handleCardLike, cardsSection);
  addEventToDOM("mousedown", handleCardDelete, cardsSection);
  addEventToDOM("mousedown", handleOutsideClickProfile, popupProfile);
  addEventToDOM("mousedown", handleOutsideClickCardAdd, popupCardAdd);
  addEventToDOM("mousedown", handleOutsideClickCardImg, popupCardImgOpen);
  addEventToDOM("keydown", handleKeyPressProfile, document);
  addEventToDOM("keydown", handleKeyPressCardAdd, document);
  addEventToDOM("keydown", handleKeyPressCardImg, document);
  addEventToDOM("click", handleButtonClick, document);
  enableValidation(validationOptions);
};

const addCardsAndEventsToDOM = () => {
  addCardsToDOM();
  addEventsToDOM();
};

//------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", addCardsAndEventsToDOM);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
