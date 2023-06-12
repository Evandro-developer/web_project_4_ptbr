import Popup from "./Popup.js";

import FormValidator from "./FormValidator.js";

import {
  popupFormAvatar,
  popupAvatarButtonSubmit,
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
} from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  getValidation,
  addEventToDOM,
  apiInstance,
} from "../utils/helpers.js";

export default class UserInfoAvatar extends Popup {
  constructor(linkSelector) {
    super(".popup_avatar-edit");
    this._link = linkSelector;
    this._linkInput = imgLinkInputAvatar;
    this._linkOutput = imgLinkOutputAvatar;
    this._btnSubmit = popupAvatarButtonSubmit;
    this._popupFormAvatar = popupFormAvatar;

    this.setEventListeners();

    this._setApi = apiInstance();

    this._validationConfig = getValidation(
      this._popupFormAvatar,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorUserInfoAvatar = new FormValidator(
      this._validationConfig,
      this._popupFormAvatar
    );

    this._formValidatorUserInfoAvatar.enableValidation();
  }

  _setUpdateUserInfoAvatar = async () => {
    const response = await this._setApi.getUserInfo();
    this._linkOutput.src = response.avatar;
  };

  _getUserInfoAvatar = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._linkInput.placeholder = "Insira o URL do Avatar";
    this.open();
    this._popupFormAvatar.reset();
    this._formValidatorUserInfoAvatar.enableValidation();
  };

  _setUserInfoAvatar = async (evt) => {
    evt.preventDefault();
    if (!this._formValidatorUserInfoAvatar.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = "Salvando...";
    const { value: link } = this._linkInput;
    if (link) {
      const data = await this._setApi.addNewUserInfoAvatar(link);
      this._linkOutput.src = data.avatar;
      this._btnSubmit.textContent = "Salvo";
      this.close();
      this._popupFormAvatar.reset();
      this._formValidatorUserInfoAvatar.enableValidation();
    }
  };
  _getButtonsForFunctionsUserInfoAvatar = () => ({
    "button-avatar-edit": this._getUserInfoAvatar,
    "popup__button_avatar-edit": this._setUserInfoAvatar,
  });

  _handleButtonsForFunctionsUserInfoAvatar = (evt) =>
    addEvtButtonsForFunctions(
      this._getButtonsForFunctionsUserInfoAvatar(evt),
      evt
    );

  setEventListenersUserInfoAvatar = () => {
    this._setUpdateUserInfoAvatar();
    addEventToDOM(
      "mousedown",
      this._handleButtonsForFunctionsUserInfoAvatar,
      document
    );
  };
}
