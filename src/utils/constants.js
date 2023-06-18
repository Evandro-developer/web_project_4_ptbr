import { getElement } from "./helpers.js";

export const heartIconEnabled = require("../images/heart_icon_enabled.png");

export const heartIconDisabled = require("../images/heart_icon_disabled.png");

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
  headerAvatar,
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
  headerAvatar: getElement(".header__avatar"),
};

export const {
  openPopupAvatar,
  popupAvatar,
  popupFormAvatar,
  popupAvatarButtonEdit,
  popupAvatarButtonSubmit,
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
} = {
  openPopupAvatar: "popup_avatar-edit__opened",
  popupAvatar: getElement(".popup_avatar-edit"),
  popupFormAvatar: getElement(".popup__form_avatar-edit"),
  popupAvatarButtonEdit: getElement("#button-avatar-edit"),
  popupAvatarButtonSubmit: getElement("#popup__button_avatar-edit"),
  imgLinkInputAvatar: getElement(".popup__input_type_avatar-img-link"),
  imgLinkOutputAvatar: getElement(".header__avatar"),
};

export const {
  openPopupCardAdd,
  popupCardAdd,
  popupCardAddForm,
  popupCardAddButtonSubmit,
  placeInputCardAdd,
  imgLinkInputCardAdd,
  placeOutputCardAdd,
  imgLinkOutputCardAdd,
  btnTrashIcon,
  btnSubmitCardAdd,
  sectionCards,
  elementCard,
} = {
  openPopupCardAdd: "popup_card-add__opened",
  popupCardAdd: getElement("#popup_card-add"),
  popupCardAddForm: getElement("#popup__form_card-add"),
  popupCardAddButtonSubmit: getElement("#popup__button_card-add"),
  placeInputCardAdd: getElement(".popup__input_type_place"),
  imgLinkInputCardAdd: getElement(".popup__input_type_img-link"),
  placeOutputCardAdd: getElement(".card__title"),
  imgLinkOutputCardAdd: getElement(".card__image"),
  btnTrashIcon: getElement(".button-trash-icon"),
  btnSubmitCardAdd: getElement(".popup__button_card-add"),
  sectionCards: getElement(".cards"),
  elementCard: getElement(".card"),
};

export const {
  openPopupCardImg,
  popupCardImgOpen,
  popupCardImg,
  popupCardName,
} = {
  openPopupCardImg: "img-popup-card__opened",
  popupCardImgOpen: getElement(".img-popup-card"),
  popupCardImg: getElement(".img-popup-card__image"),
  popupCardName: getElement(".img-popup-card__title"),
};

export const {
  openPopupWithConfirmation,
  popupWithConfirmation,
  popupFormWithConfirmation,
  popupBtnWithConfirmation,
} = {
  openPopupWithConfirmation: "popup_with-confirmation__opened",
  popupWithConfirmation: getElement(".popup_with-confirmation"),
  popupFormWithConfirmation: getElement(".popup__form_with-confirmation"),
  popupBtnWithConfirmation: getElement(".popup__button_with-confirmation"),
};
