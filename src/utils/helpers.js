export const getAllArrs = (newArr, initialArr) => {
  return [
    ...newArr.map((item) => ({ ...item })),
    ...initialArr.map((item) => ({ ...item })),
  ];
};

export const getElement = (selector, method = "querySelector") =>
  document[method](selector);

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

export const removePopupDisplay = (
  targetClassName,
  targetElement,
  callback
) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "hidden" : "null", targetElement, callback);
};

export const addPopupDisplay = (targetClassName, targetElement, callback) => {
  const isOpen = contains(targetClassName, targetElement);
  styleDisplayValue(isOpen ? "null" : "block", targetElement, callback);
};

export const toggle = (targetClassName, targetElement) =>
  targetElement.classList.toggle(targetClassName);

export const remove = (targetClassName, targetElement) =>
  targetElement.classList.remove(targetClassName);

export const add = (targetClassName, targetElement) =>
  targetElement.classList.add(targetClassName);

export const setAttributes = (targetElement, attributes) => {
  for (let attribute in attributes) {
    targetElement.setAttribute(attribute, attributes[attribute]);
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

export const addEvtButtonsForFunctions = (buttonFunctions, evt) => {
  const buttonFunctionId = buttonFunctions[evt.target.id];
  buttonFunctionId ? buttonFunctionId(evt) : null;
};

export const getValidation = (
  formSelector,
  inputSelector,
  submitButtonSelector
) => {
  return {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };
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
    animateOpacity(targetElement, 0, 1, 400);
  }
};

export const handleDeleteFunction = (
  evt,
  deleteBtnSelector,
  targetSelector
) => {
  if (isTargetElementClicked(deleteBtnSelector, evt.target)) {
    const btnDelete = evtTargetClosestElement(targetSelector, evt.target);
    animateOpacity(btnDelete, 1, 0, 400, true);
  }
};

export const handleDeleteAsyncFunction = (
  targetElement,
  apiReturnFetch,
  elementId,
  handlerPopupOpen,
  getPopupFormElement,
  apiDeleteCardAsyncFunction,
  submitBtnSelector,
  deleteBtnSelector,
  targetSelector
) => {
  let deletePromise = null; // Utilizando uma let para armazenar a referência à promessa
  return new Promise((resolve, reject) => {
    addEventToDOM(
      "mousedown",
      async (evt) => {
        try {
          evt.preventDefault();
          const deleteBtn = evt.target.closest(
            addStartingDot(deleteBtnSelector)()
          );
          if (deleteBtn) {
            submitBtnSelector.textContent = "Sim";
            addEventToDOM("mousedown", handlerPopupOpen(evt), deleteBtn);
          }
          if (deleteBtn && !deletePromise) {
            deletePromise = new Promise(async (resolve, reject) => {
              try {
                addEventToDOM(
                  "submit",
                  () => {
                    submitBtnSelector.textContent = "Excluindo...";
                    resolve(); // Resolve a promessa interna do evento submit do Formulário
                  },
                  getPopupFormElement()
                );
              } catch (error) {
                reject(error);
              }
            })
              .then(() => {
                const deleteCardBoundFromApi =
                  apiDeleteCardAsyncFunction.bind(apiReturnFetch);
                return deleteCardBoundFromApi(elementId);
              })
              .then(() => {
                handleDeleteFunction(evt, deleteBtnSelector, targetSelector);
                submitBtnSelector.textContent = "Excluido";
              })
              .catch((error) => {
                console.error(`Erro ao excluir cartão: ${error}`);
              })
              .finally(() => {
                deletePromise = null; // redefine a promessa para permitir exclusões subsequentes
              });
            resolve(); // Resolve a promessa externa após a execução do código interno
          }
        } catch (error) {
          reject(error);
        }
      },
      targetElement
    );
  });
};
