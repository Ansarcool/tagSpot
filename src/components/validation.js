const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    }
};

const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, config);
    } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const toggleButtonStatus = (inputList, buttonElement, config) => {
    let hasInvalidInput = false;

    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            hasInvalidInput = true;
        }
    });

    if (hasInvalidInput) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonStatus(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonStatus(inputList, buttonElement, config);
        });
    });
};

export const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

export const clearValidation = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    });

    toggleButtonStatus(inputList, buttonElement, config);
};