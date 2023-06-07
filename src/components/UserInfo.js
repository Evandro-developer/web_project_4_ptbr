import Popup from "./Popup.js";

import ApiConfig from "./ApiConfig.js";

import Api from "./Api.js";

import FormValidator from "./FormValidator.js";

import { popupProfileForm, btnSubmitProfile } from "../utils/constants.js";

import {
  addEvtButtonsForFunctions,
  addEventToDOM,
  getValidation,
} from "../utils/helpers.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }) {
    super(".popup");
    this._name = nameSelector;
    this._job = jobSelector;
    this._btnSubmit = btnSubmitProfile;
    this._open = this.open();
    this._close = this.close();
    this._setEventListeners = this.setEventListeners();

    this._apiConfig = new ApiConfig();
    this._setApi = new Api({
      baseUrl: this._apiConfig.baseUrl,
      headers: this._apiConfig.headers,
    });

    this._validationConfig = getValidation(
      popupProfileForm,
      ".popup__input",
      ".popup__button"
    );

    this._formValidatorUserInfo = new FormValidator(
      this._validationConfig,
      popupProfileForm
    );

    this._formValidatorUserInfo.enableValidation();
  }

  _getUserInfo = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    try {
      await this._setApi.getUserInfo();
      this._name.placeholder = "Insira o Nome do Usuário";
      this._job.placeholder = "Insira a sua Profissão";
      this._open();
      popupProfileForm.reset();
      this._formValidatorUserInfo.enableValidation();
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  _setUserInfo = async (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvando...";
    const { value: nameInput } = this._name;
    const { value: jobInput } = this._job;
    if (nameInput && jobInput) {
      try {
        await this._setApi.addNewUserInfo(nameInput, jobInput);
        this._btnSubmit.textContent = "Salvo";
        this._formValidatorUserInfo.enableValidation();
        popupProfileForm.reset();
        this._close();
      } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
      }
    }
  };

  _getButtonsForFunctionsUserInfo = () => ({
    "button-edit": this._getUserInfo,
    popup__button: this._setUserInfo,
  });

  _handleButtonsForFunctionsUserInfo = (evt) =>
    addEvtButtonsForFunctions(this._getButtonsForFunctionsUserInfo(), evt);

  setEventListenersUserInfo = () => {
    addEventToDOM(
      "mousedown",
      this._handleButtonsForFunctionsUserInfo,
      document
    );
  };
}
