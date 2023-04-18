//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopup = "popup__opened";
const popup = document.querySelector("#popup");
const popupForm = document.querySelector(".popup__container");
const popupBtnProfileFormEdit = document.querySelector(".button-edit");
const popupBtnClosed = document.querySelector("#popup__close-btn");
const popupBtnProfileFormSubmit = document.querySelector("#popup__submit-btn");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
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

const toggle = (className, element) => element.classList.toggle(className);

const togglePopup = (className, element) => toggle(className, element);

const callIfFunction = (func) => typeof func === "function" && func();

const toggleDisplay = (displayValue, openedFunc, element) => {
  callIfFunction(openedFunc);
  const style = element.style;
  return (style.display = displayValue);
};

const contains = (className, element) => element.classList.contains(className);

const togglePopupDisplay = (className, element, openedFunc) => {
  const isOpen = contains(className, element);
  toggleDisplay(isOpen ? "hidden" : "block", openedFunc, element);
};

//------------------------------------------------------------------------------------------------------------

const popupOpened = () => togglePopup(openPopup, popup);

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

console.log("newProfiles:", newProfiles);
console.log("allProfiles:", allProfiles);

//------------------------------------------------------------------------------------------------------------

const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  const { textContent: outputName } = nameOutput;
  const { textContent: outputJob } = jobOutput;
  nameInput.placeholder = outputName;
  jobInput.placeholder = outputJob;
  handlePopupToggle();
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
    nameInput.value = "";
    jobInput.value = "";

    console.log(`Perfil adicionado: ${name} ${job}`);
    console.log("newProfiles:", newProfiles);
    console.log("allProfiles:", allProfiles);
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openPopupCardAdd = "popup__opened_card_add";
const popupCardAdd = document.querySelector("#popup_card_add");
const popupFormCardAdd = document.querySelector(".popup__container_card_add");
const popupBtnCardAdd = document.querySelector("#button-add");
const popupBtnCardAddClosed = document.querySelector(
  "#popup__close-btn_card_add"
);
const popupBtnCardAddSubmit = document.querySelector(
  "#popup__submit-btn_card_add"
);
const placeInputCardAdd = document.querySelector(".popup__text_type_place");
const imgLinkInputCardAdd = document.querySelector(
  ".popup__text_type_img-link"
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

const popupOpenedCardAdd = () => togglePopup(openPopupCardAdd, popupCardAdd);

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

console.log("newCards:", newCards);
console.log("allCards:", allCards);

//------------------------------------------------------------------------------------------------------------

const handleCardFormAdd = (evt) => {
  evt.preventDefault();
  placeInputCardAdd.placeholder = "Title";
  imgLinkInputCardAdd.placeholder = "Image url";
  handlePopupCardAddToggle();
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

    console.log(`Card adicionado: ${name} ${link}`);
    console.log("newCards:", newCards);
    console.log("allCards:", allCards);
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const popupCardImgOpenned = "popup-card-img__opened";
const popupCardOpenImg = document.querySelector("#popup-card-img");
const popupCardItem = document.querySelector(".popup-card-img__container");
const popupCardImg = document.querySelector(".popup-card-img__image");
const popupCardName = document.querySelector(".popup-card-img__title");
const popupBtnCardImgClosed = document.querySelector(
  "#popup-card-img__closed-btn"
);

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardImg = () =>
  togglePopup(popupCardImgOpenned, popupCardOpenImg);

const handlePopupCardImgToggle = () =>
  togglePopupDisplay(popupCardImgOpenned, popupCardOpenImg, popupOpenedCardImg);

//------------------------------------------------------------------------------------------------------------

const renderCard = (card) => {
  const cardTemplate = document.querySelector("#cards-template").content;

  const cardsContainer = cardTemplate.querySelector(".cards");

  const cardElement = cardsContainer.querySelector(".card").cloneNode(true);

  const imgLinkOutputCardAdd = cardElement.querySelector(".card__image");
  imgLinkOutputCardAdd.src = card.link;
  imgLinkOutputCardAdd.setAttribute("alt", `imagem de ${card.name}`);
  imgLinkOutputCardAdd.addEventListener("click", () => {
    handlePopupCardImgToggle();
    popupCardImg.src = card.link;
    popupCardName.textContent = card.name;
  });

  const trashIcon = cardElement.querySelector(".button-trash-icon");

  const cardBriefing = cardElement.querySelector(".card__briefing");

  const placeOutputCardAdd = cardBriefing.querySelector(".card__title");
  placeOutputCardAdd.textContent = card.name;

  const heartIcon = cardBriefing.querySelector(".button-heart-icon");

  cardsContainer.prepend(cardElement);

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
//------------------------------------------------------------------------------------------------------------

const closePopupFunction = (element, closeClass) => () => {
  element.classList.remove(closeClass);
};

const handleKeyPressFunction = (closeClass) => (evt) => {
  evt.key === "Escape" ? closeClass() : null;
};

const handleOutsideClickFunction = (element, closeClass, btnClosed) => (evt) =>
  element.contains(evt.target) && evt.target !== btnClosed
    ? closeClass()
    : null;

//------------------------------------------------------------------------------------------------------------

const closePopup = closePopupFunction(popup, openPopup);

const handleKeyPress = handleKeyPressFunction(closePopup);

const handleOutsideClick = handleOutsideClickFunction(
  popup,
  closePopup,
  popupBtnClosed
);

//------------------------------------------------------------------------------------------------------------

const closePopupCardAdd = closePopupFunction(popupCardAdd, openPopupCardAdd);

const handleKeyPressCardAdd = handleKeyPressFunction(closePopupCardAdd);

const handleOutsideClickCardAdd = handleOutsideClickFunction(
  popupCardAdd,
  closePopupCardAdd,
  popupBtnCardAddClosed
);

//------------------------------------------------------------------------------------------------------------

const closePopupCardImg = closePopupFunction(
  popupCardOpenImg,
  popupCardImgOpenned
);

const handleKeyPressCardImg = handleKeyPressFunction(closePopupCardImg);

const handleOutsideClickCardImg = handleOutsideClickFunction(
  popupCardOpenImg,
  closePopupCardImg,
  popupBtnCardImgClosed
);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const addEventToDOM = (evt, handler, element) => {
  element.addEventListener(evt, handler);
};

const addCardsAndEventsToDOM = () => {
  const cardsContainer = document.querySelector(".cards");
  const cardsToDOM = renderCards(allCards);
  cardsContainer.prepend(...cardsToDOM);
  addEventToDOM("click", handleCardLike, cardsContainer);
  addEventToDOM("click", handleCardDelete, cardsContainer);
  addEventToDOM("keydown", handleKeyPress, document);
  addEventToDOM("mousedown", handleOutsideClick, document);
  addEventToDOM("keydown", handleKeyPressCardAdd, document);
  addEventToDOM("mousedown", handleOutsideClickCardAdd, document);
  addEventToDOM("keydown", handleKeyPressCardImg, document);
  addEventToDOM("mousedown", handleOutsideClickCardImg, document);
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const buttonFunctions = {
  "popup__close-btn": handlePopupToggle,
  "button-edit": handleProfileFormEdit,
  "popup__submit-btn": handleProfileFormSubmit,
  "popup__close-btn_card_add": handlePopupCardAddToggle,
  "button-add": handleCardFormAdd,
  "popup__submit-btn_card_add": handleCardFormSubmit,
  "popup-card-img__closed-btn": handlePopupCardImgToggle,
};

const handleButtonClick = (evt) => {
  const buttonFunctionId = buttonFunctions[evt.target.id];
  buttonFunctionId ? buttonFunctionId(evt) : null;
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

document.addEventListener("click", handleButtonClick);

document.addEventListener("DOMContentLoaded", addCardsAndEventsToDOM);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
