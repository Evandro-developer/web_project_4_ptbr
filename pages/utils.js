//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

import { formValidatorProfile, formValidatorCardAdd } from "./formValidator.js";

formValidatorProfile.enableValidation();
formValidatorCardAdd.enableValidation();

//------------------------------------------------------------------------------------------------------------

import {
  openPopupCardAdd,
  popupCardAdd,
  popupCardAddForm,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  addNewCard,
  addNewCardToDOM,
} from "./card.js";

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const callIfFunction = (callback) =>
  typeof callback === "function" && callback();

const styleDisplayValue = (displayValue, targetElement, callback) => {
  callIfFunction(callback);
  const style = targetElement.style;
  return (style.display = displayValue);
};

export const contains = (targetClassName, targetElement) =>
  targetElement.classList.contains(targetClassName);

const togglePopupDisplay = (targetClassName, targetElement, callback) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "hidden" : "block", targetElement, callback);
};

const toggle = (targetClassName, targetElement) =>
  targetElement.classList.toggle(targetClassName);

const remove = (targetClassName, targetElement) =>
  targetElement.classList.remove(targetClassName);

export const animateOpacity = (
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

export const setAttributes = (targetElement, attributes) => {
  for (let attribute in attributes) {
    targetElement.setAttribute(attribute, attributes[attribute]);
  }
};

const evtTargetClosestElement = (targetClassName, targetElement) => {
  return targetElement.closest("." + targetClassName);
};

const isTargetElementClicked = (targetClassName, targetElement) =>
  contains(targetClassName, targetElement) &&
  evtTargetClosestElement(`${targetClassName}`, targetElement);

const handleKeyPressFunction = (removePopupFunc) => (evt) => {
  evt.key === "Escape" ? callIfFunction(removePopupFunc) : null;
};

const handleOutsideClickFunction =
  (targetClassName, removePopupFunc) => (evt) =>
    isTargetElementClicked(targetClassName, evt.target)
      ? callIfFunction(removePopupFunc)
      : null;

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

export const handleCardLike = (evt) => {
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

export const handleCardDelete = (evt) => {
  if (isTargetElementClicked("button-trash-icon", evt.target)) {
    const cardDelete = evtTargetClosestElement("card", evt.target);
    animateOpacity(cardDelete, 1, 0, 400, true);
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const profilePopupElements = {
  openPopupProfile: "popup__opened",
  popupProfile: document.querySelector("#popup"),
  popupProfileForm: document.querySelector(".popup__form"),
  nameInputProfile: document.querySelector(".popup__input_type_name"),
  jobInputProfile: document.querySelector(".popup__input_type_job"),
  nameOutputProfile: document.querySelector(".header__title"),
  jobOutputProfile: document.querySelector(".header__subtitle"),
};

const {
  openPopupProfile,
  popupProfile,
  popupProfileForm,
  nameInputProfile,
  jobInputProfile,
  nameOutputProfile,
  jobOutputProfile,
} = profilePopupElements;

export { popupProfile };

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

const popupProfileOpened = () => toggle(openPopupProfile, popupProfile);

export const handlePopupProfileToggle = () =>
  togglePopupDisplay(openPopupProfile, popupProfile, popupProfileOpened);

//------------------------------------------------------------------------------------------------------------

export const handleProfileFormEdit = (evt) => {
  evt.preventDefault();
  const { textContent: nameOutput } = nameOutputProfile;
  const { textContent: jobOutput } = jobOutputProfile;
  nameInputProfile.placeholder = nameOutput;
  jobInputProfile.placeholder = jobOutput;
  handlePopupProfileToggle();
  popupProfileForm.reset();
  formValidatorProfile.enableValidation();
};

export const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: nameInput } = nameInputProfile;
  const { value: jobInput } = jobInputProfile;

  if (nameInput && jobInput) {
    addNewProfile(nameInput, jobInput);
    handlePopupProfileToggle();
    nameOutputProfile.textContent = nameInput;
    jobOutputProfile.textContent = jobInput;
    popupProfileForm.reset();
    formValidatorProfile.enableValidation();
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const popupOpenedCardAdd = () => toggle(openPopupCardAdd, popupCardAdd);

export const handlePopupCardAddToggle = () =>
  togglePopupDisplay(openPopupCardAdd, popupCardAdd, popupOpenedCardAdd);

//------------------------------------------------------------------------------------------------------------

export const handleCardAddFormEdit = (evt) => {
  evt.preventDefault();
  placeInputCardAdd.placeholder = "Título";
  imgLinkInputCardAdd.placeholder = "URL da Imagem ";
  handlePopupCardAddToggle();
  popupCardAddForm.reset();
  formValidatorCardAdd.enableValidation();
};

export const handleCardAddFormSubmit = (evt) => {
  evt.preventDefault();
  const { value: name } = placeInputCardAdd;
  const { value: link } = imgLinkInputCardAdd;

  if (name && link) {
    addNewCard(name, link);
    addNewCardToDOM();
    handlePopupCardAddToggle();
    popupCardAddForm.reset();
    formValidatorCardAdd.enableValidation();
  }
};

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const openCardImgPopupElements = {
  openPopupCardImg: "img-popup-card__opened",
  popupCardImgOpen: document.querySelector("#img-popup-card"),
  popupCardImg: document.querySelector(".img-popup-card__image"),
  popupCardName: document.querySelector(".img-popup-card__title"),
};

const { openPopupCardImg, popupCardImgOpen, popupCardImg, popupCardName } =
  openCardImgPopupElements;

export { popupCardImgOpen, popupCardImg, popupCardName };

//------------------------------------------------------------------------------------------------------------

const popupOpenedCardImg = () => toggle(openPopupCardImg, popupCardImgOpen);

export const handlePopupCardImgToggle = () =>
  togglePopupDisplay(openPopupCardImg, popupCardImgOpen, popupOpenedCardImg);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------

const closePopupProfile = () => remove(openPopupProfile, popupProfile);
export const handleKeyPressProfile = handleKeyPressFunction(closePopupProfile);
export const handleOutsideClickProfile = handleOutsideClickFunction(
  "popup",
  closePopupProfile
);

const closePopupCardAdd = () => remove(openPopupCardAdd, popupCardAdd);
export const handleKeyPressCardAdd = handleKeyPressFunction(closePopupCardAdd);
export const handleOutsideClickCardAdd = handleOutsideClickFunction(
  "popup_card_add",
  closePopupCardAdd
);

const closePopupCardImg = () => remove(openPopupCardImg, popupCardImgOpen);
export const handleKeyPressCardImg = handleKeyPressFunction(closePopupCardImg);
export const handleOutsideClickCardImg = handleOutsideClickFunction(
  "img-popup-card",
  closePopupCardImg
);

//------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------
