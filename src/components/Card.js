import PopupWithImage from "./PopupWithImage.js";

import PopupWithConfirmation from "./PopupWithConfirmation.js";

import {
  popupCardImg,
  popupCardName,
  heartIconEnabled,
  heartIconDisabled,
} from "../utils/constants.js";

import {
  getElement,
  addEventToDOM,
  setAttributes,
  createApiInstance,
  handleLikeFunctionAsync,
} from "../utils/helpers.js";

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._btnTrashIcon = this._cardElement.querySelector(".button-trash-icon");
    this._btnLikeIcon = this._cardElement.querySelector(".button-heart-icon");
    this._likesCounter = this._cardElement.querySelector(".card__likes");

    this._popupWithImage = new PopupWithImage();
    this.setEventListenerFromPopupWithImage();

    this._setApi = createApiInstance();

    this._popupWithConfirmation = new PopupWithConfirmation();
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  handleCardLike = (evt) => {
    handleLikeFunctionAsync(
      this,
      evt,
      "button-heart-icon",
      "Icon de coração desativado apenas com bordas",
      "Icon de coração ativado com preenchimento",
      heartIconDisabled,
      heartIconEnabled,
      () => this._updateLikes(),
      this._setApi,
      this._setApi.addLike,
      this._setApi.removeLike,
      this._data._id
    );
  };

  _handleCardDelete(evt) {
    this._popupWithConfirmation.handleFormOpen(evt);
    this._popupWithConfirmation.handleFormSubmit(evt, this._data._id);
  }

  _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    this._userHasLiked = this._data.likes.some(
      (user) => user._id === this._currentUserId
    );
  }

  async _setOwnerInfo() {
    this._currentUser = await this._setApi.getUserInfo();
    this._currentUserId = this._currentUser._id;
    this._isOwner = this._data.owner._id === this._currentUserId;
  }

  async generateInstanceCard() {
    setAttributes(this._cardImage, {
      src: this._data.link,
      alt: `Imagem de ${this._data.name}`,
    });
    this._cardTitle.textContent = this._data.name;

    await this._setOwnerInfo();
    this._btnTrashIcon.style.display = this._isOwner ? "block" : "none";

    this._updateLikes();

    addEventToDOM(
      "mousedown",
      (evt) => this._handleCardDelete(evt),
      this._btnTrashIcon
    );

    setAttributes(this._btnLikeIcon, {
      src: this._userHasLiked ? heartIconEnabled : heartIconDisabled,
      alt: this._userHasLiked
        ? "Icon de coração ativado com preenchimento"
        : "Icon de coração desativado apenas com bordas",
    });

    this._btnLikeIcon.setAttribute(
      "data-liked",
      this._userHasLiked ? "true" : "false"
    );

    addEventToDOM("mousedown", this.handleCardLike, this._btnLikeIcon);

    return this._cardElement;
  }

  setEventListenerFromPopupWithImage() {
    this._cardImage.addEventListener("mousedown", () => {
      this._popupWithImage.open();
      popupCardImg.src = this._data.link;
      popupCardName.textContent = this._data.name;
    });
  }
}
