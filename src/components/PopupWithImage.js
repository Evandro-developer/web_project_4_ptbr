import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super(".img-popup-card");
    this.setEventListeners();
  }

  handlePopupImageOpen(popupCardImg, popupCardName, data) {
    this.open();
    popupCardImg.src = data.link;
    popupCardName.textContent = data.name;
  }
}
