import PopupWithImage from "./PopupWithImage.js";

import ApiConfig from "./ApiConfig.js";

import Api from "./Api.js";

import PopupWithConfirmation from "./PopupWithConfirmation.js";

import {
  popupCardImg,
  popupCardName,
  heartIconEnabled,
  heartIconDisabled,
  popupBtnWithConfirmation,
} from "../utils/constants.js";

import {
  getElement,
  addEventToDOM,
  setAttributes,
  handleDeleteAsyncFunction,
  evtTargetClosestElement,
  isTargetElementClicked,
  animateOpacity,
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

    this._apiConfig = new ApiConfig();
    this._setApi = new Api({
      baseUrl: this._apiConfig.baseUrl,
      headers: this._apiConfig.headers,
    });

    this._popupWithConfirmation = new PopupWithConfirmation();
    this._btnSubmit = popupBtnWithConfirmation;

    this._handleCardLike = this._handleCardLike.bind(this);
  }

  _getTemplate() {
    const template = getElement(this._templateSelector);
    const cardElement = template.content.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  _handleCardDelete() {
    handleDeleteAsyncFunction(
      this._cardElement,
      this._setApi,
      this._data._id,
      this._popupWithConfirmation.handleFormOpen,
      this._popupWithConfirmation.getFormElement,
      this._setApi.deleteCard,
      this._btnSubmit,
      "button-trash-icon",
      "card"
    );
  }

  async _handleCardLike(evt) {
    const targetElement = evtTargetClosestElement(
      "button-heart-icon",
      evt.target
    );
    if (isTargetElementClicked("button-heart-icon", evt.target)) {
      const isActive = targetElement.getAttribute("data-active") === "true";
      return new Promise((resolve, reject) => {
        if (isActive) {
          this._setApi
            .removeLike(this._data._id)
            .then((updatedCard) => {
              this._data.likes = updatedCard.likes;
              this._updateLikes();
              targetElement.setAttribute("data-active", !isActive);
              setAttributes(targetElement, {
                src: heartIconDisabled,
                alt: "Icon de coração desativado apenas com bordas",
              });
              animateOpacity(targetElement, 0, 1, 400);
              resolve();
            })
            .catch((error) => {
              console.error("Erro ao remover curtida:", error);
              reject(error);
            });
        } else {
          this._setApi
            .addLike(this._data._id)
            .then((updatedCard) => {
              this._data.likes = updatedCard.likes;
              this._updateLikes();
              targetElement.setAttribute("data-active", !isActive);
              setAttributes(targetElement, {
                src: heartIconEnabled,
                alt: "Icon de coração ativado com preenchimento",
              });
              animateOpacity(targetElement, 0, 1, 400);
              resolve();
            })
            .catch((error) => {
              console.error("Erro ao adicionar curtida:", error);
              reject(error);
            });
        }
      });
    }
  }

  async _getOwnersId() {
    return this._data.owner._id;
  }

  async _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    this._userHasLiked = this._data.likes.some(
      (user) => user._id === this._currentUserId
    );
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

    this._handleCardDelete();

    this._updateLikes();

    setAttributes(
      this._btnLikeIcon,
      this._userHasLiked
        ? {
            src: heartIconEnabled,
            alt: "Icon de coração ativado com preenchimento",
          }
        : {
            src: heartIconDisabled,
            alt: "Icon de coração desativado apenas com bordas",
          }
    );

    this._btnLikeIcon.setAttribute(
      "data-active",
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
