export {
  formSelectors, initialCards, editButton, profileInput, descriptionInput,
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

const flowerRoute = new URL('../../images/photo-gallery/tramTracks.jpg', import.meta.url);
const snowCover = new URL('../../images/photo-gallery/whiteTree.jpg', import.meta.url);
const Magnolia = new URL('../../images/photo-gallery/magnolia.jpg', import.meta.url);
const sky = new URL('../../images/photo-gallery/cloudyEvening.jpg', import.meta.url);
const breakfast = new URL('../../images/photo-gallery/horse.jpg', import.meta.url);
const plateau = new URL('../../images/photo-gallery/alone.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Цветущий маршрут',
    link: flowerRoute
  },
  {
    name: 'Снежное покрывало',
    link: snowCover
  },
  {
    name: 'Магнолия',
    link: Magnolia
  },
  {
    name: 'Небо города',
    link: sky
  },
  {
    name: 'Завтрак',
    link: breakfast
  },
  {
    name: 'Плато Лаго-Наки',
    link: plateau
  }
];

const editButton = document.querySelector('.profile__edit');
const profileInput = document.querySelector('#editPopup #name');
const descriptionInput = document.querySelector('#editPopup #job');
const forms = document.querySelectorAll('.popup__form');
const buttonAddCard = document.querySelector('.profile__add-button');

const avatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');