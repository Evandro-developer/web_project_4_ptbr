//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

export default class Popup {
  constructor(targetElement) {
    this._popupElement = getElement(targetElement);
    this._popupElementWithoutDot = removeStartingDot(targetElement)();
    this._openedClassName = `${this._popupElementWithoutDot}__opened`;
    this._closeButtons = Array.from(
      getElement('[id$="__closed-btn"]', "querySelectorAll")
    );
  }

  //------------------------------------------------------------------------------------------------------------

  _createCallbackAddDisplay = () => () =>
    add(this._openedClassName, this._popupElement);

  _createCallbackRemoveDisplay = () => () => {
    remove(this._openedClassName, this._popupElement);
  };

  //------------------------------------------------------------------------------------------------------------

  _handleEscClose = () => {
    addEventToDOM(
      "keydown",
      handleKeyPressFunction(this._createCallbackRemoveDisplay()),
      document
    );
  };

  _handleOutsideClickClose = () => {
    addEventToDOM(
      "mousedown",
      handleOutsideClickFunction(
        this._popupElementWithoutDot,
        this._createCallbackRemoveDisplay()
      ),
      this._popupElement
    );
  };

  //------------------------------------------------------------------------------------------------------------

  _getCloseButtonsAndAddEventListener() {
    this._closeButtons.forEach((button) => {
      addEventToDOM(
        "mousedown",
        () => {
          this.close()();
        },
        button
      );
    });
  }

  //------------------------------------------------------------------------------------------------------------

  open = () => () => {
    addPopupDisplay(
      this._openedClassName,
      this._popupElement,
      this._createCallbackAddDisplay()
    );
  };

  close = () => () => {
    removePopupDisplay(
      this._openedClassName,
      this._popupElement,
      this._createCallbackRemoveDisplay()
    );
  };

  setEventListeners = () => {
    this._handleEscClose();
    this._handleOutsideClickClose();
    this._getCloseButtonsAndAddEventListener();
  };
}

//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------
