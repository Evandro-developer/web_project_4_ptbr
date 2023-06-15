import Popup from "./Popup.js";

import {
  popupProfileForm,
  btnSubmitProfile,
  nameOutputProfile,
  jobOutputProfile,
} from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  apiInstance,
  initializeFormValidator,
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
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupProfileForm);
  }

  _setUpdate = async () => {
    const response = await this._setApi.getUserInfo();
    this._nameOutput.textContent = response.name;
    this._jobOutput.textContent = response.about;
  };

  _getUserInfo = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._nameInput.placeholder = "Insira o Nome do Usuário";
    this._jobInput.placeholder = "Insira a sua Profissão";
    this.toggle();
    this._popupProfileForm.reset();
    this._formValidator.enableValidation();
  };

  _setUserInfo = (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = "Salvando...";
    const { value: nameInput } = this._nameInput;
    const { value: jobInput } = this._jobInput;
    if (nameInput && jobInput) {
      this._setApi.addNewUserInfo(nameInput, jobInput);
      this._nameOutput.textContent = nameInput;
      this._jobOutput.textContent = jobInput;
      this._btnSubmit.textContent = "Salvo";
      this.toggle();
      this._popupProfileForm.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonsForFunctions = () => ({
    "button-edit": this._getUserInfo,
    popup__button: this._setUserInfo,
  });

  _handleButtonsForFunctions = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctions(), evt);

  setEventListeners = () => {
    this._setUpdate();
    addEventToDOM("mousedown", this._handleButtonsForFunctions, document);
  };
}
