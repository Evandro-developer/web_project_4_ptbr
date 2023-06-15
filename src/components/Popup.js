import {
  getElement,
  removeStartingDot,
  remove,
  toggle,
  togglePopupDisplay,
  handleKeyPressFunction,
  handleOutsideClickFunction,
  addEventToDOM,
} from "../utils/helpers.js";

export default class Popup {
  constructor(targetElement) {
    this._popupElement = getElement(targetElement);
    this._popupElementWithoutDot = removeStartingDot(targetElement)();
    this._openedClassName = `${this._popupElementWithoutDot}__opened`;
    this._closeButtons = Array.from(
      getElement('[id$="__closed-btn"]', "querySelectorAll")
    );
  }

  _toggleDisplayCallback = () =>
    toggle(this._openedClassName, this._popupElement);

  _removeDisplayCallback = () =>
    remove(this._openedClassName, this._popupElement);

  _handleEscClose = () =>
    addEventToDOM(
      "keydown",
      handleKeyPressFunction(this._removeDisplayCallback),
      document
    );

  _handleOutsideClickClose = () =>
    addEventToDOM(
      "mousedown",
      handleOutsideClickFunction(
        this._popupElementWithoutDot,
        this._removeDisplayCallback
      ),
      this._popupElement
    );

  _getCloseButtonsAndAddEventListener() {
    this._closeButtons.forEach((button) => {
      addEventToDOM(
        "mousedown",
        () => {
          this._removeDisplayCallback();
        },
        button
      );
    });
  }

  toggle = () =>
    togglePopupDisplay(
      this._openedClassName,
      this._popupElement,
      this._toggleDisplayCallback
    );

  setEventListenersPopup = () => {
    this._handleEscClose();
    this._handleOutsideClickClose();
    this._getCloseButtonsAndAddEventListener();
  };
}
