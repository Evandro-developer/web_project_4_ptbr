import Popup from "./Popup.js";
import {
  popupFormAvatar,
  popupAvatarButtonSubmit,
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
} from "../utils/constants.js";
import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  apiInstance,
  initializeFormValidator,
} from "../utils/helpers.js";

export default class UserInfoAvatar extends Popup {
  constructor(linkSelector) {
    super(".popup_avatar-edit");
    this._link = linkSelector;
    this._linkInput = imgLinkInputAvatar;
    this._linkOutput = imgLinkOutputAvatar;
    this._btnSubmit = popupAvatarButtonSubmit;
    this._popupFormAvatar = popupFormAvatar;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupFormAvatar);
  }

  _setUpdate = async () => {
    const response = await this._setApi.getUserInfo();
    this._linkOutput.src = response.avatar;
  };

  _getUserInfoAvatar = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._linkInput.placeholder = "Insira o URL do Avatar";
    this.toggle();
    this._popupFormAvatar.reset();
    this._formValidator.enableValidation();
  };

  _setUserInfoAvatar = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = "Salvando...";
    const { value: link } = this._linkInput;
    if (link) {
      const data = await this._setApi.addNewUserInfoAvatar(link);
      this._linkOutput.src = data.avatar;
      this._btnSubmit.textContent = "Salvo";
      this.toggle();
      this._popupFormAvatar.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonsForFunctions = () => ({
    "button-avatar-edit": this._getUserInfoAvatar,
    "popup__button_avatar-edit": this._setUserInfoAvatar,
  });

  _handleButtonsForFunctions = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctions(), evt);

  setEventListeners = () => {
    this._setUpdate();
    addEventToDOM("mousedown", this._handleButtonsForFunctions, document);
  };
}
