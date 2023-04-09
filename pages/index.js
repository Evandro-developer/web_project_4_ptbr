//-------------------------------------------------------------------------------

const openPopup = "popup__opened";
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__container");
const popupBtnProfileFormEdit = document.querySelector(".button-edit");
const popupBtnClosed = document.querySelector(".popup__close-btn");
const popupBtnProfileFormSubmit = document.querySelector(".popup__submit-btn");
const nameInput = document.querySelector(".popup__text_type_name");
const jobInput = document.querySelector(".popup__text_type_job");
const nameOutput = document.querySelector(".header__title");
const jobOutput = document.querySelector(".header__subtitle");

//-------------------------------------------------------------------------------

const initialProfile = [
  {
    name: nameOutput.textContent,
    job: jobOutput.textContent,
  },
];

let newProfiles = [];

let allProfiles = [...initialProfile];

//-------------------------------------------------------------------------------

const toggle = (className, element) => element.classList.toggle(className);

const popupOpened = () => toggle(openPopup, popup);

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

//-------------------------------------------------------------------------------

const createNewProfile = (name, job) => {
  if (!name || !job) {
    return null;
  }
  const isProfileExist = allProfiles.some((profile) => profile.name === name);
  if (!isProfileExist) {
    let createdNewProfile = {
      name: name,
      job: job,
    };
    return createdNewProfile;
  }
};

const addNewProfile = (name, job) => {
  const addedNewProfile = createNewProfile(name, job);
  if (addedNewProfile) {
    newProfiles = [addedNewProfile, ...newProfiles];
    allProfiles = [...newProfiles, ...initialProfile];
  }
};

console.log("newProfiles:", newProfiles);
console.log("allProfiles:", allProfiles);

//-------------------------------------------------------------------------------

const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  nameInput.placeholder = nameOutput.textContent;
  jobInput.placeholder = jobOutput.textContent;
  handlePopupToggle();
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  const isValid = name !== "" && job !== "";
  if (isValid) {
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    addNewProfile(name, job);
    handlePopupToggle();
    nameInput.value = "";
    jobInput.value = "";
  }

  console.log("newProfiles:", newProfiles);
  console.log("allProfiles:", allProfiles);
};

//-------------------------------------------------------------------------------

const openPopupCardAdd = "popup__opened_card_add";
const popupCardAdd = document.querySelector(".popup_card_add");
const popupFormCardAdd = document.querySelector(".popup__container_card_add");
const popupBtnCardAdd = document.querySelector(".button-add");
const popupBtnCardAddClosed = document.querySelector(
  ".popup__close-btn_card_add"
);
const popupBtnCardAddSubmit = document.querySelector(
  ".popup__submit-btn_card_add"
);
const placeInputCardAdd = document.querySelector(".popup__text_type_place");
const imgLinkInputCardAdd = document.querySelector(
  ".popup__text_type_img-link"
);

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

let newCards = [];

let allCards = [];

//-------------------------------------------------------------------------------

const popupOpenedCardAdd = () => toggle(openPopupCardAdd, popupCardAdd);

const handlePopupCardAddToggle = () =>
  popupCardAdd.classList.contains(openPopupCardAdd)
    ? toggleDisplay("hidden", popupOpenedCardAdd, popupCardAdd)
    : toggleDisplay("block", popupOpenedCardAdd, popupCardAdd);

//-------------------------------------------------------------------------------

const addNewCard = (name, link) => {
  const addedNewCard = createNewCard(name, link);
  newCards = [addedNewCard, ...newCards];
};

const createNewCard = (name, link) => {
  const createdNewCard = {
    name,
    link,
    alt: `Imagem de ${name}`,
  };
  return createdNewCard;
};

const getAllCards = () =>
  newCards.length > 0 ? [...newCards, ...initialCards] : initialCards;

//-------------------------------------------------------------------------------

allCards = getAllCards();

//-------------------------------------------------------------------------------

const addNewCardToDOM = () => {
  const cards = document.querySelector(".cards");
  const newCardElement = renderCards()[0];
  cards.insertBefore(newCardElement, cards.firstChild);
};

console.log("newCards:", newCards);
console.log("allCards:", allCards);

//-------------------------------------------------------------------------------

const handleCardFormAdd = (evt) => {
  evt.preventDefault();
  placeInputCardAdd.placeholder = "Title";
  imgLinkInputCardAdd.placeholder = "Image url";
  handlePopupCardAddToggle();
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = placeInputCardAdd.value;
  const link = imgLinkInputCardAdd.value;

  if (name && link) {
    addNewCard(name, link);
    handlePopupCardAddToggle();
    placeInputCardAdd.value = "";
    imgLinkInputCardAdd.value = "";
    allCards = getAllCards();
    addNewCardToDOM();
    console.log("newCards:", newCards);
    console.log("allCards:", allCards);
  }
};

//-------------------------------------------------------------------------------

const handleCardLike = (evt) => {
  const heartIcon = evt.target.closest(".button-heart-icon");
  const isActive = heartIcon.getAttribute("data-active") === "true";
  heartIcon.setAttribute("data-active", !isActive);
  heartIcon.src = isActive
    ? "./images/heart_icon_disabled.png"
    : "./images/heart_icon_enabled.png";
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

const openPopupCardImg = "popup-card-img__opened";
const popupCard = document.querySelector(".popup-card-img");
const popupCardItem = document.querySelector(".popup-card-img__container");
const popupCardImg = document.querySelector(".popup-card-img__image");
const popupCardName = document.querySelector(".popup-card-img__title");
const popupCardImgClosed = document.querySelector(
  ".popup-card-img__closed-btn"
);

//-------------------------------------------------------------------------

const popupOpenedCardImg = () => toggle(openPopupCardImg, popupCard);

const handlePopupCardImgToggle = () =>
  popupCard.classList.contains(openPopupCardImg)
    ? toggleDisplay("hidden", popupOpenedCardImg, popupCard)
    : toggleDisplay("block", popupOpenedCardImg, popupCard);

//-------------------------------------------------------------------------

const renderCards = () => {
  return allCards.map((card) => {
    const cardTemplate = document.querySelector("#cards-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    const imgLinkOutputCardAdd = cardElement.querySelector(".card__image");
    imgLinkOutputCardAdd.src = card.link;
    imgLinkOutputCardAdd.setAttribute("alt", `Imagem de ${card.name}`);

    const trashIcon = cardElement.querySelector(".button-trash-icon");

    const cardBriefing = cardElement.querySelector(".card__briefing");

    const placeOutputCardAdd = cardBriefing.querySelector(".card__title");
    placeOutputCardAdd.textContent = card.name;

    const heartIcon = cardBriefing.querySelector(".button-heart-icon");

    heartIcon.addEventListener("click", handleCardLike);
    trashIcon.addEventListener("click", handleCardDelete);

    imgLinkOutputCardAdd.addEventListener("click", () => {
      handlePopupCardImgToggle();
      popupCardImg.src = card.link;
      popupCardName.textContent = card.name;
    });

    return cardElement;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const cards = renderCards();
  document.querySelector(".cards").prepend(...cards);
});

//-------------------------------------------------------------------------------

const handleButtonClick = (evt) => {
  switch (evt.target) {
    case popupBtnClosed:
      handlePopupToggle(evt);
      break;
    case popupBtnProfileFormEdit:
      handleProfileFormEdit(evt);
      break;
    case popupBtnProfileFormSubmit:
      handleProfileFormSubmit(evt);
      break;
    case popupBtnCardAddClosed:
      handlePopupCardAddToggle(evt);
      break;
    case popupBtnCardAdd:
      handleCardFormAdd(evt);
      break;
    case popupBtnCardAddSubmit:
      handleCardFormSubmit(evt);
      break;
    case popupCardImgClosed:
      handlePopupCardImgToggle(evt);
      break;
  }
};

document.addEventListener("click", handleButtonClick);
