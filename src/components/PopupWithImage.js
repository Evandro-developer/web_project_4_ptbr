import Popup from "../components/Popup.js";

import Card from "./Card.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".img-popup-card");
    this._setEventListeners = this.setEventListeners();
    this._setEventListenerCard =
      Card.prototype.setEventListenerFromPopupWithImage;
    this.open = this.open();
  }

  setEventListenersPopupWithImageToDOM = () => {
    this._setEventListeners;
  };
}
