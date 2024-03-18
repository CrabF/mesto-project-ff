export function enableValidation(options) {  
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
  textError.textContent = '';
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