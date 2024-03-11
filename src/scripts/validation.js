// export class FormValidator {
//   constructor(options, formElement) {
//     this._options = options;
//     this._formElement = formElement;
//     this._submitButton = formElement.querySelector(options.submitButtonSelector);
//   }

//   enableValidation() {
//     this._disableButton();
//     this._setEventListener();
//   }

//   _setEventListener() {
//     const inputs = this._formElement.querySelectorAll(this._options.inputSelector);
//     this._formElement.addEventListener('submit', (evt)=>{
//       evt.preventDefault();
//       this._disableButton();
//     })
//     inputs.forEach((input)=>{
//       input.addEventListener('input', ()=>{
//       this._validateInput(input);
//       })
//     })
//   }

//    _validateInput(input){
//     if(input.validity.patternMismatch) {
//       input.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
//     } else {
//       input.setCustomValidity('');
//     }

//     const isInputValid = input.validity.valid;
//     const textError = this._formElement.querySelector(`#${input.name}-error`);
    
//     if (!isInputValid) {
//       this._showError(input, textError);
//     } else {
//       this._hideError(input, textError);
//     }
//     if (!this._formElement.checkValidity()) {
//       this._disableButton()
//     } else {
//       this._enableButton()
//     }
//   }

//   _disableButton() {
//     this._submitButton.classList.add(this._options.inactiveButtonClass);
//     this._submitButton.setAttribute('disabled', true)
//   }

//   _enableButton() {
//     this._submitButton.classList.remove(this._options.inactiveButtonClass);
//     this._submitButton.removeAttribute('disabled')
//   }

//   _showError(input, textError) {
//     input.classList.add(this._options.inputErrorClass);
//     textError.classList.add(this._options.errorClass);
//     textError.textContent = input.validationMessage;
//   }

//   _hideError(input, textError) {
//     input.classList.remove(this._options.inputErrorClass);
//     textError.classList.remove(this._options.errorClass);
//   }
// }
// import { formSelectors } from '.utils/constants.js'

export function enableValidation(options) {
  // 1. вызвать clearValidation
  // 2. evt.preventDefault
  // 3. вызвать валидацию инпутов 
  
  const forms = document.querySelectorAll(options.formSelector);
  
  forms.forEach((form)=>{
    form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
    })
    const submitButton = form.querySelector(options.submitButtonSelector);
    _disableButton(submitButton, options)
    const inputs = form.querySelectorAll(options.inputSelector);
      inputs.forEach((input)=>{
        input.addEventListener('input', ()=>{
          _validateInput(form, input, options, submitButton)
        })
    })
  })
}

function _validateInput(form, input, options, submitButton) {
  
  if(input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  const isInputValid = input.validity.valid;
  const textError = form.querySelector(`#${input.name}-error`);
  
  if (!isInputValid) {
    _showError(input, textError, options);
  } else {
    _hideError(input, textError, options);
  }
  if (!form.checkValidity()) {
    _disableButton(submitButton, options)
  } else {
    _enableButton(submitButton, options)
  }
}

function _showError(input, textError, options) {
  input.classList.add(options.inputErrorClass);
  textError.classList.add(options.errorClass);
  textError.textContent = input.validationMessage;
}

function _hideError(input, textError, options) {
  input.classList.remove(options.inputErrorClass);
  textError.classList.remove(options.errorClass);
}

function _disableButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.setAttribute('disabled', true)
}

function _enableButton(submitButton, options) {
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.removeAttribute('disabled')
}

// очистка ошибок валидации вызовом clearValidation

export function clearValidation(form, configSelectors) {
  form.reset();
  const submitButton = form.querySelector(configSelectors.submitButtonSelector);
  const inputs = form.querySelectorAll(configSelectors.inputSelector);

  inputs.forEach((input)=>{
    const textError = form.querySelector(`#${input.name}-error`);
    _hideError(input, textError, configSelectors)
  })  
  _disableButton(submitButton, configSelectors);
}