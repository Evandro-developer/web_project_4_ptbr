//------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------

const initialProfile = [
  {
    name: nameOutput.textContent,
    job: jobOutput.textContent,
  },
];

let newProfiles = [];

let allProfiles = [...initialProfile];

//------------------------------------------------------------------------------------------------------------

const toggle = (className, element) => element.classList.toggle(className);

const popupOpened = () => toggle(openPopup, popup);

//------------------------------------------------------------------------------------------------------------

const toggleDisplay = (displayValue, openedFunc, element) => {
  typeof openedFunc === "function" && openedFunc();
  const style = element.style;
  return (style.display = displayValue);
};

const handlePopupToggle = () =>
  popup.classList.contains(openPopup)
    ? toggleDisplay("hidden", popupOpened, popup)
    : toggleDisplay("block", popupOpened, popup);

//------------------------------------------------------------------------------------------------------------

const createNewProfile = (name, job) => {
  return name && job && !allProfiles.some((profile) => profile.name === name)
    ? { name, job }
    : null;
};

const addNewProfile = (name, job) => {
  const newProfile = createNewProfile(name, job);
  newProfile && (newProfiles = [newProfile, ...newProfiles]);
  allProfiles = [...newProfiles, ...initialProfile];
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
    nameInput.value = "";
    jobInput.value = "";
    nameOutput.textContent = name;
    jobOutput.textContent = job;

    console.log(`Perfil adicionado: ${name} ${job}`);
    console.log("newProfiles:", newProfiles);
    console.log("allProfiles:", allProfiles);
  }
};

//------------------------------------------------------------------------------------------------------------

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
    alt: "Imagem do Lago di Braies com um deck, barcos ancorados e montanhas ao fundo e natureza preservada",
  },
];

let newCards = [];

let allCards = [...initialCards];

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardAdd = () => toggle(openPopupCardAdd, popupCardAdd);

const handlePopupCardAddToggle = () =>
  popupCardAdd.classList.contains(openPopupCardAdd)
    ? toggleDisplay("hidden", popupOpenedCardAdd, popupCardAdd)
    : toggleDisplay("block", popupOpenedCardAdd, popupCardAdd);

//------------------------------------------------------------------------------------------------------------

const createNewCard = (name, link) => {
  return name && link ? { name, link, alt: `Imagem de ${name}` } : null;
};

const addNewCard = (name, link) => {
  const newCard = createNewCard(name, link);
  newCard && (newCards = [newCard, ...newCards]);
  allCards = [...newCards, ...initialCards];
};

const addNewCardToDOM = () => {
  const cards = document.querySelector(".cards");
  const newCardToDOM = renderCards()[0];
  cards.insertBefore(newCardToDOM, cards.firstChild);
  newCardToDOM.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 400,
    easing: "ease-in-out",
  });
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

const handleCardLike = (evt) => {
  const heartIcon = evt.target.closest(".button-heart-icon");
  console.log("heart", heartIcon);
  const isActive = heartIcon.getAttribute("data-active") === "true";
  console.log("Bolean", isActive);
  heartIcon.setAttribute("data-active", !isActive);
  console.log("Bolean", isActive);
  heartIcon.src = isActive
    ? "./images/heart_icon_disabled.png"
    : "./images/heart_icon_enabled.png";
  console.log("Bolean", isActive);
};

//------------------------------------------------------------------------------------------------------------

const handleCardDelete = (evt) => {
  const cardDelete = evt.target.closest(".card");
  cardDelete.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 400,
    easing: "ease-in-out",
  }).onfinish = () => cardDelete.remove();
};

//------------------------------------------------------------------------------------------------------------

const openPopupCardImg = "popup-card-img__opened";
const popupCard = document.querySelector(".popup-card-img");
const popupCardItem = document.querySelector(".popup-card-img__container");
const popupCardImg = document.querySelector(".popup-card-img__image");
const popupCardName = document.querySelector(".popup-card-img__title");
const popupCardImgClosed = document.querySelector(
  ".popup-card-img__closed-btn"
);

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardImg = () => toggle(openPopupCardImg, popupCard);

const handlePopupCardImgToggle = () =>
  popupCard.classList.contains(openPopupCardImg)
    ? toggleDisplay("hidden", popupOpenedCardImg, popupCard)
    : toggleDisplay("block", popupOpenedCardImg, popupCard);

//------------------------------------------------------------------------------------------------------------

const renderCards = () => {
  return allCards.map((card) => {
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
    trashIcon.addEventListener("click", handleCardDelete);

    const cardBriefing = cardElement.querySelector(".card__briefing");

    const placeOutputCardAdd = cardBriefing.querySelector(".card__title");
    placeOutputCardAdd.textContent = card.name;

    const heartIcon = cardBriefing.querySelector(".button-heart-icon");
    heartIcon.addEventListener("click", handleCardLike);

    cardsContainer.prepend(cardElement);

    return cardElement;
  });
};

//------------------------------------------------------------------------------------------------------------

const addCardsToDOM = () => {
  const cards = document.querySelector(".cards");
  const cardsToDOM = renderCards();
  cards.prepend(...cardsToDOM);
};

//------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------------

document.addEventListener("click", handleButtonClick);

document.addEventListener("DOMContentLoaded", addCardsToDOM);

//------------------------------------------------------------------------------------------------------------
