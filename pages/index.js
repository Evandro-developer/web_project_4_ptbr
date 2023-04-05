//-------------------------------------------------------------------------------

const openPopup = "popup__opened";
const openPopupCardAdd = "popup__opened_card_add";
const openPopupCardImg = "popup-card-img__opened";

//-------------------------------------------------------------------------------

const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__container");
const popupBtnEdit = document.querySelector(".button-edit");
const popupBtnClose = document.querySelector(".popup__close-btn");
const popupBtnSubmit = document.querySelector(".popup__submit-btn");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
const nameOutput = document.querySelector(".header__title");
const jobOutput = document.querySelector(".header__subtitle");

//-------------------------------------------------------------------------------

const popupCardAdd = document.querySelector(".popup_card_add");
const popupFormCardAdd = document.querySelector(".popup__container_card_add");
const popupBtnCardAdd = document.querySelector(".button-add");
const popupBtnCloseCardAdd = document.querySelector(
  ".popup__close-btn_card_add"
);
const popupBtnSubmitCardAdd = document.querySelector(
  ".popup__submit-btn_card_add"
);
const placeInputCardAdd = document.querySelector(".popup__text_type_place");
const imgLinkInputCardAdd = document.querySelector(
  ".popup__text_type_img-link"
);

//-------------------------------------------------------------------------------

const popupCard = document.querySelector(".popup-card-img");
const popupCardItem = document.querySelector(".popup-card-img__container");
const popupCardImg = document.querySelector(".popup-card-img__image");
const popupCardName = document.querySelector(".popup-card-img__title");
const popupCardBtnClosed = document.querySelector(
  ".popup-card-img__closed-btn"
);

//-------------------------------------------------------------------------------

const cards = document.querySelector(".cards");
const cardElements = document.querySelectorAll(".card");

//-------------------------------------------------------------------------------

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
    alt: "Imagem do Lago di Braies com um deck, barcos ancorados e montanhas ao fundo e natureza preservada",
  },
];

//-------------------------------------------------------------------------------

const toggle = (className, element) => element.classList.toggle(className);

const popupOpened = () => toggle(openPopup, popup);

const popupOpenedCardAdd = () => toggle(openPopupCardAdd, popupCardAdd);

const popupOpenedCardImg = () => toggle(openPopupCardImg, popupCard);

//-------------------------------------------------------------------------------

const toggleDisplay = (displayValue, openedFunc, element) => {
  typeof openedFunc === "function" && openedFunc();
  const style = element.style;
  return (style.display = displayValue);
};

const handlePopupToggle = () =>
  popup.classList.contains(openPopup)
    ? toggleDisplay("hidden", popupOpened, popup)
    : toggleDisplay("block", popupOpened, popup);

const handlePopupCardAddToggle = () =>
  popupCardAdd.classList.contains(openPopupCardAdd)
    ? toggleDisplay("hidden", popupOpenedCardAdd, popupCardAdd)
    : toggleDisplay("block", popupOpenedCardAdd, popupCardAdd);

const handlePopupCardImgToggle = () =>
  popupCard.classList.contains(openPopupCardImg)
    ? toggleDisplay("hidden", popupOpenedCardImg, popupCard)
    : toggleDisplay("block", popupOpenedCardImg, popupCard);

//-------------------------------------------------------------------------------

const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  nameInput.placeholder = nameOutput.textContent;
  jobInput.placeholder = jobOutput.textContent;
  handlePopupToggle();
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;
  handlePopupToggle();
  nameInput.value = "";
  jobInput.value = "";
};

//-------------------------------------------------------------------------------

let allCards = [];

const handleCardFormAdd = (evt) => {
  evt.preventDefault();
  handlePopupCardAddToggle();
};

allCards = initialCards;

const handleCardFormSubmit = (name, link) => {
  const newCard = {
    name: name,
    link: link,
  };

  allCards = [newCard, ...allCards];

  const newCardElements = renderCards(allCards);
  newCardElements.forEach((cardElement) => {
    cards.prepend(cardElement);
  });

  handlePopupCardAddToggle();

  placeInputCardAdd.value = "";
  imgLinkInputCardAdd.value = "";
};

const handleCardSubmitClick = (evt) => {
  evt.preventDefault();

  allCards = [];

  const name = placeInputCardAdd.value;
  const link = imgLinkInputCardAdd.value;

  handleCardFormSubmit(name, link);
};

//--------------------------------------------------------------------------------

const handleCardLike = (evt) => {
  const heartIcon = evt.target;
  const isActive = heartIcon.getAttribute("data-active") === "true";
  heartIcon.setAttribute("data-active", isActive ? "false" : "true");
  heartIcon.src = isActive
    ? "./images/heart_icon_disabled.png"
    : "./images/heart_icon_enabled.png";
};

const handleCardsClick = (evt) => {
  const heartIcon = evt.target.closest(".button-heart-icon");
  heartIcon && handleCardLike(heartIcon);
};

//-------------------------------------------------------------------------------

const handleCardDelete = (evt) => {
  const item = evt.target.closest(".card");
  item.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 400,
    easing: "ease-in-out",
  }).onfinish = () => item.remove();
};

//-------------------------------------------------------------------------

const renderCards = () => {
  return allCards.map((card) => {
    const cardTemplate = document.querySelector("#cards-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    cardImage.src = card.link;
    cardImage.setAttribute("alt", card.name + card.alt);

    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = card.name;

    const cardBriefing = cardElement.querySelector(".card__briefing");

    const heartIcon = cardBriefing.querySelector(".button-heart-icon");

    const trashIcon = cardElement.querySelector(".button-trash-icon");

    heartIcon.addEventListener("click", handleCardLike);
    trashIcon.addEventListener("click", handleCardDelete);

    cardImage.addEventListener("click", () => {
      handlePopupCardImgToggle();
      popupCardImg.src = card.link;
      popupCardName.textContent = card.name;
    });

    return cardElement;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = renderCards(allCards);
  document.querySelector(".cards").prepend(...cards);
});

//-------------------------------------------------------------------------------

const handleButtonClick = (evt) => {
  switch (evt.target) {
    case popupBtnClose:
      handlePopupToggle(evt);
      break;
    case popupBtnEdit:
      handleProfileFormEdit(evt);
      break;
    case popupBtnSubmit:
      handleProfileFormSubmit(evt);
      break;
    case popupBtnCardAdd:
      handleCardFormAdd(evt);
      break;
    case popupBtnCloseCardAdd:
      handlePopupCardAddToggle(evt);
      break;
    case popupCardBtnClosed:
      handlePopupCardImgToggle(evt);
      break;
    case popupBtnSubmitCardAdd:
      handleCardSubmitClick(evt);
      break;
  }
};

document.addEventListener("click", handleButtonClick);
