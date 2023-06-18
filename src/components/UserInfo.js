import Popup from "./Popup.js";
import {
  nameOutputProfile,
  jobOutputProfile,
  btnSubmitProfile,
  popupProfileForm,
} from "../utils/constants.js";
import {
  apiInstance,
  initializeFormValidator,
  setButtonFunctionId,
  addEventToDOM,
} from "../utils/helpers.js";

export default class UserInfo extends Popup {
  constructor({ nameSelector, jobSelector }) {
    super(".popup");
    this._nameInput = nameSelector;
    this._jobInput = jobSelector;
    this._nameOutput = nameOutputProfile;
    this._jobOutput = jobOutputProfile;
    this._btnSubmit = btnSubmitProfile;
    this._popupForm = popupProfileForm;
    this.setEventListenersPopup();
    this._setApi = apiInstance();
    this._formValidator = initializeFormValidator(this._popupForm);
  }

  _setUpdate = async () => {
    this._userInfo = await this._setApi.getUserInfo();
    this._nameOutput.textContent = this._userInfo.name;
    this._jobOutput.textContent = this._userInfo.about;
  };

  _getUserInfo = (evt) => {
    evt.preventDefault();
    this._btnSubmit.textContent = "Salvar";
    this._nameInput.placeholder = "Insira o Nome do Usuário";
    this._jobInput.placeholder = "Insira a sua Profissão";
    this.toggle();
    this._popupForm.reset();
    this._formValidator.enableValidation();
  };

  _setUserInfo = async (evt) => {
    evt.preventDefault();
    if (!this._formValidator.isFormValid()) {
      return;
    }
    this._btnSubmit.textContent = "Salvando...";
    const { value: name } = this._nameInput;
    const { value: job } = this._jobInput;
    if (name && job) {
      await this._setApi.addNewUserInfo(name, job);
      this._nameOutput.textContent = name;
      this._jobOutput.textContent = job;
      this._btnSubmit.textContent = "Salvo";
      this.toggle();
      this._popupForm.reset();
      this._formValidator.enableValidation();
    }
  };

  _getButtonForFunctions = () => ({
    "button-edit": this._getUserInfo,
    popup__button: this._setUserInfo,
  });

  _setButtonForFunctions = (evt) =>
    setButtonFunctionId(this._getButtonForFunctions(), evt);

  setEventListeners = () => {
    this._setUpdate();
    addEventToDOM("mousedown", this._setButtonForFunctions, document);
  };
}
