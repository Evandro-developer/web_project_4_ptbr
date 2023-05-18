import Popup from "../components/Popup.js";
import BaseFormValidator from "./FormValidator.js";
import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
} from "../utils/helpers.js";
import {
  popupProfileForm,
  nameOutputProfile,
  jobOutputProfile,
  addNewProfile,
} from "../utils/constants.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }) {
    super(".popup");
    this._name = nameSelector;
    this._job = jobSelector;
    this._open = this.open();
    this._close = this.close();
    this._setEventListeners = this.setEventListeners();

    const validationConfig = getValidation(
      popupProfileForm,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorUserInfo = new BaseFormValidator(
      validationConfig,
      popupProfileForm
    );

    this._formValidatorUserInfo.enableValidation();
  }

  _getUserInfo = (evt) => {
    evt.preventDefault();
    this._name.placeholder = "Insira o Nome do Usuário";
    this._job.placeholder = "Insira a sua Profissão";
    this._open();
    popupProfileForm.reset();
    this._formValidatorUserInfo.enableValidation();
  };

  _setUserInfo = (evt) => {
    evt.preventDefault();
    const { value: nameInput } = this._name;
    const { value: jobInput } = this._job;
    if (nameInput && jobInput) {
      addNewProfile(nameInput, jobInput);
      this._close();
      nameOutputProfile.textContent = nameInput;
      jobOutputProfile.textContent = jobInput;
      popupProfileForm.reset();
      this._formValidatorUserInfo.enableValidation();
    }
  };

  _getButtonsForFunctionsUserInfo = () => ({
    "button-edit": this._getUserInfo,
    popup__button: this._setUserInfo,
  });

  _handleButtonsForFunctionsUserInfo = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctionsUserInfo(), evt);

  setEventListenersUserInfoToDOM = () => {
    this._open();
    this._close();
    this._setEventListeners;
    addEventToDOM("click", this._handleButtonsForFunctionsUserInfo, document);
  };
}
