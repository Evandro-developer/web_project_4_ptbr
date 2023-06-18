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
  apiInstance,
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
    this._setApi = apiInstance();
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _handleCardDelete = (evt) => {
    !this._popupWithConfirmation
      ? (this._popupWithConfirmation = new PopupWithConfirmation())
      : null;
    this._popupWithConfirmation.handleFormOpen(evt);
    this._popupWithConfirmation.handleFormSubmit(evt, this._data._id);
  };

  _handleImageCardOpen = () => {
    !this._popupWithImage
      ? (this._popupWithImage = new PopupWithImage())
      : null;
    this._popupWithImage.handlePopupImageOpen(
      popupCardImg,
      popupCardName,
      this._data
    );
  };

  _handleCardLike = (evt) => {
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

  async _fetchCurrentUserId() {
    if (this._currentUser) {
      return this._currentUser;
    }
    this._currentUser = await this._setApi.getUserInfo();
    this._currentUserId = this._currentUser._id;
    return this._currentUser;
  }

  _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    this._userHasLiked = this._data.likes.some(
      (user) => user._id === this._currentUserId
    );
    this._updateLikeButton(this._userHasLiked);
  }

  _updateLikeButton(userHasLiked) {
    const attributes = {
      src: userHasLiked ? heartIconEnabled : heartIconDisabled,
      alt: userHasLiked
        ? "Icon de coração ativado com preenchimento"
        : "Icon de coração desativado apenas com bordas",
    };

    setAttributes(this._btnLikeIcon, attributes);
    this._btnLikeIcon.setAttribute(
      "data-liked",
      userHasLiked ? "true" : "false"
    );
  }

  async _updateDeleteButton() {
    await this._fetchCurrentUserId();
    if (this._data.owner._id === this._currentUserId) {
      this._btnTrashIcon.style.display = "block";
    }
  }

  _setEventListeners() {
    addEventToDOM("mousedown", this._handleCardDelete, this._btnTrashIcon);
    addEventToDOM("mousedown", this._handleImageCardOpen, this._cardImage);
    addEventToDOM("mousedown", this._handleCardLike, this._btnLikeIcon);
  }

  generateCardInstance(userHasLiked, currentUserId) {
    setAttributes(this._cardImage, {
      src: this._data.link,
      alt: `Imagem de ${this._data.name}`,
    });
    this._cardTitle.textContent = this._data.name;
    this._likesCounter.textContent = this._data.likes.length;
    this._updateLikeButton(userHasLiked);
    if (this._data.owner._id === currentUserId) {
      this._btnTrashIcon.style.display = "block";
    }
    this._updateDeleteButton();
    this._setEventListeners();
    return this._cardElement;
  }
}
