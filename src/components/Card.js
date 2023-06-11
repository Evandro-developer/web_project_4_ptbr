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
  evtTargetClosestElement,
  isTargetElementClicked,
  animateOpacity,
  createApiInstance,
  setElementAttributes,
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

    this._handleCardLike = this._handleCardLike.bind(this);
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  async _handleCardLike(evt) {
    const targetHeartIcon = evtTargetClosestElement(
      "button-heart-icon",
      evt.target
    );
    if (isTargetElementClicked("button-heart-icon", evt.target)) {
      const isLiked = targetHeartIcon.getAttribute("data-liked") === "true";
      const updatedCard = await (isLiked
        ? this._setApi.removeLike(this._data._id)
        : this._setApi.addLike(this._data._id));

      this._data.likes = updatedCard.likes;
      this._updateLikes();

      targetHeartIcon.setAttribute("data-liked", !isLiked);
      const heartIcon = isLiked ? heartIconDisabled : heartIconEnabled;
      const altText = isLiked
        ? "Icon de coração desativado apenas com bordas"
        : "Icon de coração ativado com preenchimento";

      setAttributes(targetHeartIcon, {
        src: heartIcon,
        alt: altText,
      });

      animateOpacity(targetHeartIcon, 0, 1, 400);
    }
  }

  _getOwnersId() {
    return this._data.owner._id;
  }

  _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    this._userHasLiked = this._data.likes.some(
      (user) => user._id === this._currentUserId
    );
  }

  _handleCardDelete(evt) {
    this._popupWithConfirmation.handleFormOpen(evt);
    this._popupWithConfirmation.handleFormSubmit(evt, this._data._id);
  }

  async generateInstanceCard() {
    setAttributes(this._cardImage, {
      src: this._data.link,
      alt: `Imagem de ${this._data.name}`,
    });
    this._cardTitle.textContent = this._data.name;

    const getCurrentUser = await this._setApi.getUserInfo();
    this._currentUserId = getCurrentUser._id;

    const isOwnerId = (await this._getOwnersId()) === this._currentUserId;

    this._btnTrashIcon.style.display = isOwnerId ? "block" : "none";

    this._updateLikes();

    addEventToDOM(
      "mousedown",
      (evt) => this._handleCardDelete(evt),
      this._btnTrashIcon
    );

    setElementAttributes(this._btnLikeIcon, {
      src: this._userHasLiked ? heartIconEnabled : heartIconDisabled,
      alt: this._userHasLiked
        ? "Icon de coração ativado com preenchimento"
        : "Icon de coração desativado apenas com bordas",
    });

    this._btnLikeIcon.setAttribute(
      "data-liked",
      this._userHasLiked ? "true" : "false"
    );

    addEventToDOM(
      "mousedown",
      this._handleCardLike.bind(this),
      this._btnLikeIcon
    );

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
