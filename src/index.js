//импорты

import './pages/index.css';
import { render } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { patchProfile, getCards, getProfileInfo, postNewCard, updateAvatar, likeCardForServer, removeLike, deleteCardFromServer } from './scripts/api.js';
import { open, close } from './scripts/modal.js'

//константы

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileInput = document.querySelector('#editPopup #name');
const descriptionInput = document.querySelector('#editPopup #job');

const editPopup = document.querySelector('#editPopup');
const addCardPopup = document.querySelector('#popupAddCard');
const previewPopup = document.querySelector('#previewPopup');
const editAvatarPopup = document.querySelector('#popupUpdateAvatar');

const gallerySection = document.querySelector('.photo-gallery')

const avatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//Загрузка профиля и карточек с сервера

let myId;

Promise.all([getProfileInfo(), getCards()])
  .then((results)=>{
    myId = results[0]._id;
    avatar.style.backgroundImage = `url("${results[0].avatar}")`;
    profileName.textContent = results[0].name;
    profileDescription.textContent = results[0].about;
    
    renderItems({
      items: results[1],
      renderer: item => createCard(item, myId)
    }, gallerySection)
  })
  .catch((err)=>{
    console.log(err)
})

function renderItems({items, renderer}, gallerySection) {
  items.forEach((item) => {
    const renderedItem = renderer(item);
    gallerySection.append(renderedItem)
  })
}

function createCard(cardObj, myId){
  return render('#cards', cardObj, myId, handleCardClick, likeCard, deleteCard)
}

//Лайк и удаление карточки

function likeCard(cardObj, myId, likeButton, counterLikes) {
  const includeMyIndex = getMyIndex(cardObj.likes, myId);
  const likeMethod = includeMyIndex === -1 ? likeCardForServer : removeLike;
  likeMethod(cardObj._id) 
    .then((res) => {
      cardObj.likes = res.likes 
        counterLikes.textContent = cardObj.likes.length || '';
        likeButton.classList.toggle('photo-gallery__like-counter-button_active');
    })
    .catch(err => console.log(err));
}

function deleteCard(cardObj, view){
  deleteCardFromServer(cardObj._id)
    .then(()=>{
      view.remove();
      view = null;
    })
    .catch((err)=>{
      console.log(err)
  })
}

function getMyIndex(arrayLikes, myId) {
  return arrayLikes.findIndex((element)=>{
    return element._id === myId
  })
}

//Включение валидации

enableValidation(formSelectors);

// Редактирование профиля

editButton.addEventListener('click', ()=>{
  const form = editPopup.querySelector('.popup__form');
  clearValidation(form, formSelectors);
  open(editPopup);
  const {name, description} = getUserInfo({profileName, profileDescription});
  profileInput.value = name;
  descriptionInput.value = description;
})

setEventListenersOnSubmitButton(editPopup, editProfile)

function setEventListenersOnSubmitButton(popup, submit) {
  popup.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    submit(getInputValues(popup), popup);
  })
}

function getUserInfo({profileName, profileDescription}) {
  return {name: profileName.textContent, description: profileDescription.textContent}
}
  
function editProfile(formData) {
  const submitButton = document.querySelector('#edit-save-button')
  submitButton.textContent = 'Сохранение...'
   patchProfile(formData)
    .then((result)=>{
      setUserInfo({name: result.name, description: result.about});
      close(editPopup)
    })
    .catch((err)=>{
      console.log(err);
  })
  .finally(()=>{
    submitButton.textContent = 'Сохранить'
  })
}

function setUserInfo({name, description}) {
  profileName.textContent = name; 
  profileDescription.textContent = description;
}

function getInputValues(popup) {
  const form = popup.querySelector('.popup__form');
  const inputs = Array.from(form.querySelectorAll('input'));
  return inputs.reduce((acc, current)=> {
    return {...acc, [current.name]: current.value}
  }, {})
}

//Добавление карточки

buttonAddCard.addEventListener('click', ()=>{
  open(addCardPopup);
  const form = addCardPopup.querySelector('.popup__form')
  clearValidation(form, formSelectors);
})

setEventListenersOnSubmitButton(addCardPopup, addNewCard)

function addNewCard(formData) {
  const submitButton = document.querySelector('#add-save-button')
  submitButton.textContent = 'Сохранение...'
  postNewCard(formData.cardTitle, formData.cardLink)
    .then((result)=>{
      const newCard = createCard(result, myId);
      gallerySection.prepend(newCard);
      close(addCardPopup)
    })
    .catch((err)=>{
      console.log(err)
  })
  .finally(()=>{
    submitButton.textContent = 'Создать'
  })
}

//Просмотр карточки

function handleCardClick(item) {
  open(previewPopup);
  const image = previewPopup.querySelector('.popup-card__image');
  const title = previewPopup.querySelector('.popup-card__title');
  image.src = item.link;
  title.textContent = item.name;
  title.alt = item.name;
}

//Редактирование аватара

avatar.addEventListener('click', ()=>{
  open(editAvatarPopup);
  const form = editAvatarPopup.querySelector('.popup__form')
  clearValidation(form, formSelectors);
})

setEventListenersOnSubmitButton(editAvatarPopup, editAvatar)

function editAvatar() {
  const submitButton = document.querySelector('#update-save-button')
  submitButton.textContent = 'Сохранение...'
  updateAvatar(document.querySelector('#avatarRef').value)
    .then((result)=>{
      avatar.style.backgroundImage = `url("${result.avatar}")`;
      close(editAvatarPopup)
    })
    .catch((err)=>{
      console.log(err);
  })
  .finally(()=>{
    submitButton.textContent = 'Сохранить'
  })
}