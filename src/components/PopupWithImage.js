import Popup from "./Popup.js";

import { addEventToDOM } from "../utils/helpers.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".img-popup-card");
    this.setEventListeners();
  }

  handlePopupImageOpen(cardImage, popupCardImg, popupCardName, data) {
    const handleMousedown = () => {
      this.open();
      popupCardImg.src = data.link;
      popupCardName.textContent = data.name;
    };

    addEventToDOM("mousedown", handleMousedown, cardImage);
  }
}
