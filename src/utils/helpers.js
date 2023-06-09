import ApiConfig from "../components/ApiConfig";
import Api from "../components/Api";
import FormValidator from "../components/FormValidator";

export const apiInstance = () => {
  const apiConfig = new ApiConfig();
  return new Api({
    baseUrl: apiConfig.baseUrl,
    headers: apiConfig.headers,
  });
};

const getValidation = (formSelector, inputSelector, buttonSelector) => {
  return {
    formSelector,
    inputSelector,
    buttonSelector,
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
};

export const initializeFormValidator = (formSelector) => {
  const inputSelector = ".popup__input";
  const buttonSelector = ".popup__button";
  const validationConfig = getValidation(
    formSelector,
    inputSelector,
    buttonSelector
  );
  return new FormValidator(validationConfig, formSelector);
};

export const getAllArrs = (newArr, initialArr) => {
  return [
    ...newArr.map((item) => ({ ...item })),
    ...initialArr.map((item) => ({ ...item })),
  ];
};

export const getElement = (selector, method = "querySelector") =>
  document[method](selector);

export const closestElement = (evt, selector) => evt.target.closest(selector);

export const callIfFunction = (callback) =>
  typeof callback === "function" && callback();

export const styleDisplayValue = (displayValue, targetElement, callback) => {
  callIfFunction(callback);
  const style = targetElement.style;
  return (style.display = displayValue);
};

export const contains = (targetClassName, targetElement) =>
  targetElement.classList.contains(targetClassName);

export const togglePopupDisplay = (
  targetClassName,
  targetElement,
  callback
) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "hidden" : "block", targetElement, callback);
};

export const toggle = (targetClassName, targetElement) =>
  targetElement.classList.toggle(targetClassName);

export const remove = (targetClassName, targetElement) =>
  targetElement.classList.remove(targetClassName);

export const setAttributes = (targetElement, attributes) => {
  for (let attribute in attributes) {
    targetElement.setAttribute(attribute, attributes[attribute]);
  }
};

export const setElementAttributes = (element, attributes) => {
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
};

export const getStartsWithDot = (string) => string.startsWith(".");

export const removeStartingDot = (string) => () =>
  getStartsWithDot(string) ? string.slice(1) : string;

export const addStartingDot = (string) => () =>
  getStartsWithDot(string) ? string : "." + string;

export const evtTargetClosestElement = (targetClassName, targetElement) =>
  targetElement.closest(addStartingDot(`${targetClassName}`)());

export const isTargetElementClicked = (targetClassName, targetElement) =>
  contains(targetClassName, targetElement) &&
  evtTargetClosestElement(
    removeStartingDot(`${targetClassName}`)(),
    targetElement
  );

export const handleKeyPressFunction = (removePopupFunc) => (evt) =>
  evt.key === "Escape" ? callIfFunction(removePopupFunc) : null;

export const handleOutsideClickFunction =
  (targetClassName, removePopupFunc) => (evt) =>
    isTargetElementClicked(targetClassName, evt.target)
      ? callIfFunction(removePopupFunc)
      : null;

export const addEventToDOM = (evt, handler, targetElement) =>
  targetElement.addEventListener(evt, handler);

export const removeEventFromDOM = (evt, handler, targetElement) =>
  targetElement.removeEventListener(evt, handler);

export const setButtonFunctionId = (buttonFunctions, evt) => {
  const buttonFunctionId = buttonFunctions[evt.target.id];
  buttonFunctionId ? buttonFunctionId(evt) : null;
};

export const animateOpacity = (
  targetElement,
  startOpacity,
  endOpacity,
  duration,
  removeOnFinish = false
) => {
  targetElement.animate([{ opacity: startOpacity }, { opacity: endOpacity }], {
    duration: duration,
    easing: "ease-in-out",
  }).onfinish = () => {
    if (removeOnFinish) {
      targetElement.remove();
    }
  };
};

export const handleLikeFunction = (
  evt,
  targetSelector,
  iconEnabledSrc,
  iconDisabledSrc,
  iconEnabledAlt,
  iconDisabledAlt
) => {
  if (isTargetElementClicked(targetSelector, evt.target)) {
    const targetElement = evtTargetClosestElement(targetSelector, evt.target);
    const isActive = targetElement.getAttribute("data-active") === "true";
    targetElement.setAttribute("data-active", !isActive);
    setAttributes(
      targetElement,
      isActive
        ? {
            src: iconDisabledSrc,
            alt: iconDisabledAlt,
          }
        : {
            src: iconEnabledSrc,
            alt: iconEnabledAlt,
          }
    );
    animateOpacity(targetElement, 0, 1, 300);
  }
};

export const handleLikeFunctionAsync = async (
  instanceThis,
  evt,
  heartIcon,
  iconDisabledAlt,
  iconEnabledAlt,
  heartIconDisabled,
  heartIconEnabled,
  updateLikesFn,
  apiInstance,
  addLikeFn,
  removeLikeFn,
  dataId
) => {
  const targetHeartIcon = evtTargetClosestElement(heartIcon, evt.target);
  if (isTargetElementClicked(heartIcon, evt.target)) {
    const isLiked = targetHeartIcon.getAttribute("data-liked") === "true";
    const updatedCard = await (isLiked
      ? removeLikeFn.call(apiInstance, dataId)
      : addLikeFn.call(apiInstance, dataId));

    instanceThis._data.likes = updatedCard.likes;
    callIfFunction(updateLikesFn);

    setAttributes(targetHeartIcon, {
      src: isLiked ? heartIconDisabled : heartIconEnabled,
      alt: isLiked ? iconDisabledAlt : iconEnabledAlt,
    });

    targetHeartIcon.setAttribute("data-liked", isLiked ? "false" : "true");

    animateOpacity(targetHeartIcon, 0, 1, 300);
  }
};

export const handleDeleteFunction = (
  evt,
  deleteBtnSelector,
  targetSelector
) => {
  if (isTargetElementClicked(deleteBtnSelector, evt.target)) {
    const btnDelete = evtTargetClosestElement(targetSelector, evt.target);
    animateOpacity(btnDelete, 1, 0, 300, true);
  }
};
