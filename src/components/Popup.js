import {
  getElement,
  removeStartingDot,
  add,
  addPopupDisplay,
  remove,
  removePopupDisplay,
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

  _addDisplayCallback = () => add(this._openedClassName, this._popupElement);

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
      const closeFunction = this.close();
      addEventToDOM(
        "mousedown",
        () => {
          closeFunction();
        },
        button
      );
    });
  }

  open = () => {
    return () => {
      addPopupDisplay(
        this._openedClassName,
        this._popupElement,
        this._addDisplayCallback
      );
    };
  };

  close = () => {
    return () => {
      removePopupDisplay(
        this._openedClassName,
        this._popupElement,
        this._removeDisplayCallback
      );
    };
  };

  setEventListeners = () => {
    this._handleEscClose();
    this._handleOutsideClickClose();
    this._getCloseButtonsAndAddEventListener();
  };
}
