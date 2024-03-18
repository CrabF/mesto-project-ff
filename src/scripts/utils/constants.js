export {
  formSelectors, editButton, profileInput, descriptionInput,
  forms, buttonAddCard, avatar, profileName, profileDescription
}

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit');
const profileInput = document.querySelector('#editPopup #name');
const descriptionInput = document.querySelector('#editPopup #job');
const forms = document.querySelectorAll('.popup__form');
const buttonAddCard = document.querySelector('.profile__add-button');

const avatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');