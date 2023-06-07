import Popup from "./Popup.js";

import FormValidator from "./FormValidator.js";

import ApiConfig from "./ApiConfig.js";

import Api from "./Api.js";

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
} from "../utils/helpers.js";

export default class UserInfoAvatar extends Popup {
  constructor(linkSelector) {
    super(".popup_avatar-edit");
    this._link = linkSelector;
    this._linkInput = imgLinkInputAvatar;
    this._btnSubmit = popupAvatarButtonSubmit;
    this._open = this.open();
    this._close = this.close();
    this._setEventListeners = this.setEventListeners();

    this._apiConfig = new ApiConfig();
    this._setApi = new Api({
      baseUrl: this._apiConfig.baseUrl,
      headers: this._apiConfig.headers,
    });

    const validationConfig = getValidation(
      popupFormAvatar,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorUserInfoAvatar = new FormValidator(
      validationConfig,
      popupFormAvatar
    );

    this._formValidatorUserInfoAvatar.enableValidation();
  }

  _getUserInfoAvatar = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._linkInput.placeholder = "Insira o URL do Avatar";
    this._open();
    popupFormAvatar.reset();
    this._formValidatorUserInfoAvatar.enableValidation();
  };

  _setUserInfoAvatar = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvando...";
    const { value: link } = this._linkInput;
    if (link) {
      try {
        const data = await this._setApi.addNewUserInfoAvatar(link);
        this._btnSubmit.textContent = "Salvo";
        imgLinkOutputAvatar.src = data.avatar;
        this._close();
        popupFormAvatar.reset();
        this._formValidatorUserInfoAvatar.enableValidation();
      } catch (error) {
        console.error("Erro ao editar Avatar:", error);
      }
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
    addEventToDOM(
      "mousedown",
      this._handleButtonsForFunctionsUserInfoAvatar,
      document
    );
  };
}
