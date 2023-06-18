import Popup from "./Popup.js";
import {
  imgLinkInputAvatar,
  imgLinkOutputAvatar,
  popupAvatarButtonSubmit,
  popupFormAvatar,
} from "../utils/constants.js";
import {
  apiInstance,
  initializeFormValidator,
  setButtonFunctionId,
  addEventToDOM,
} from "../utils/helpers.js";

export default class UserInfoAvatar extends Popup {
  constructor(linkSelector) {
    super(".popup_avatar-edit");
    this._link = linkSelector;
    this._linkInput = imgLinkInputAvatar;
    this._linkOutput = imgLinkOutputAvatar;
    this._btnSubmit = popupAvatarButtonSubmit;
    this._popupForm = popupFormAvatar;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupForm);
  }

  _setUpdate = async () => {
    this._userInfoAvatar = await this._setApi.getUserInfo();
    this._linkOutput.src = this._userInfoAvatar.avatar;
  };

  _getUserInfoAvatar = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._linkInput.placeholder = "Insira o URL do Avatar";
    this.toggle();
    this._popupForm.reset();
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
      await this._setApi.addNewUserInfoAvatar(link);
      this._linkOutput.src = link;
      this._btnSubmit.textContent = "Salvo";
      this.toggle();
      this._popupForm.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-avatar-edit": this._getUserInfoAvatar,
    "popup__button_avatar-edit": this._setUserInfoAvatar,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionId(this._getButtonForFunctions(), evt);

  setEventListeners = () => {
    this._setUpdate();
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
