function toggleButtonDisabledState(
  inputElements,
  buttonElement,
  validationConfig
) {
  const hasInvalidInput = Array.from(inputElements).some((inputElement) => {
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function showInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.setCustomValidity("");
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
}

function validateInput(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputElements = formElement.querySelectorAll(
    validationConfig.inputSelector
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateInput(formElement, inputElement, validationConfig);
      toggleButtonDisabledState(
        inputElements,
        submitButtonElement,
        validationConfig
      );
    });
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputElements = formElement.querySelectorAll(
    validationConfig.inputSelector
  );
  const submitButtonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  toggleButtonDisabledState(
    inputElements,
    submitButtonElement,
    validationConfig
  );
}

export function enableValidation(validationConfig) {
  const formElements = document.querySelectorAll(validationConfig.formSelector);

  formElements.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}
