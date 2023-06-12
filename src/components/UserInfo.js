import Popup from "./Popup.js";

import FormValidator from "./FormValidator.js";

import {
  popupProfileForm,
  btnSubmitProfile,
  nameOutputProfile,
  jobOutputProfile,
} from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
  createApiInstance,
} from "../utils/helpers.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }) {
    super(".popup");
    this._nameInput = nameSelector;
    this._jobInput = jobSelector;
    this._nameOutput = nameOutputProfile;
    this._jobOutput = jobOutputProfile;
    this._btnSubmit = btnSubmitProfile;
    this._popupProfileForm = popupProfileForm;

    this.setEventListeners();

    this._setApi = createApiInstance();

    this._validationConfig = getValidation(
      this._popupProfileForm,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorUserInfo = new FormValidator(
      this._validationConfig,
      this._popupProfileForm
    );

    this._formValidatorUserInfo.enableValidation();
  }

  _setUpdateUserInfo = async () => {
    const response = await this._setApi.getUserInfo();
    this._nameOutput.textContent = response.name;
    this._jobOutput.textContent = response.about;
  };

  _getUserInfo = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._setApi.getUserInfo();
    this._nameInput.placeholder = "Insira o Nome do Usuário";
    this._jobInput.placeholder = "Insira a sua Profissão";
    this.open();
    this._popupProfileForm.reset();
    this._formValidatorUserInfo.enableValidation();
  };

  _setUserInfo = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvando...";
    const { value: nameInput } = this._nameInput;
    const { value: jobInput } = this._jobInput;
    if (nameInput && jobInput) {
      this._setApi.addNewUserInfo(nameInput, jobInput);
      this._nameOutput.textContent = nameInput;
      this._jobOutput.textContent = jobInput;
      this._btnSubmit.textContent = "Salvo";
      this.close();
      this._popupProfileForm.reset();
      this._formValidatorUserInfo.enableValidation();
    }
  };

  _getButtonsForFunctionsUserInfo = () => ({
    "button-edit": this._getUserInfo,
    popup__button: this._setUserInfo,
  });

  _handleButtonsForFunctionsUserInfo = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctionsUserInfo(), evt);

  setEventListenersUserInfo = () => {
    this._setUpdateUserInfo();
    addEventToDOM(
      "mousedown",
      this._handleButtonsForFunctionsUserInfo,
      document
    );
  };
}
