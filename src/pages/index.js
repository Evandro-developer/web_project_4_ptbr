import "../styles/index.css";
import {
  nameInputProfile,
  jobInputProfile,
  imgLinkInputAvatar,
  placeInputCardAdd,
  imgLinkInputCardAdd,
} from "../utils/constants.js";
import { addEventToDOM, apiInstance } from "../utils/helpers";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import UserInfoAvatar from "../components/UserInfoAvatar";
import PopupWithForm from "../components/PopupWithForm.js";

let currentUserId;

apiInstance()
  .getUserInfo()
  .then((user) => {
    currentUserId = user._id;
    return apiInstance().getInitialCards();
  })
  .then((allCards) => {
    const cardsSection = new Section(
      {
        items: allCards,
        renderer: (card) => {
          const newCardInstance = new Card(card, "#cards-template");
          const userHasLiked = card.likes.some(
            (user) => user._id === currentUserId
          );
          const cardItem = newCardInstance.generateCardInstance(
            userHasLiked,
            currentUserId
          );
          cardsSection.addItem(cardItem);
        },
      },
      ".cards"
    );
    cardsSection.renderItems();
  });

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  jobSelector: jobInputProfile,
});

const userInfoAvatar = new UserInfoAvatar({
  linkSelector: imgLinkInputAvatar,
});

const popupWithForm = new PopupWithForm({
  nameSelector: placeInputCardAdd,
  linkSelector: imgLinkInputCardAdd,
});

const getInstancesForDOMContentToLoad = () => {
  userInfo.setEventListeners();
  userInfoAvatar.setEventListeners();
  popupWithForm.setEventListeners();
};

addEventToDOM("DOMContentLoaded", getInstancesForDOMContentToLoad, document);
