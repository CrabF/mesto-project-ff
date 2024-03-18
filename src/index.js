import {
  formSelectors, editButton, profileInput, descriptionInput, buttonAddCard, avatar, profileName, profileDescription
} from './scripts/utils/constants.js';
import './pages/index.css';
import { Card } from './scripts/card.js'
import { UserInfo } from './scripts/userInfo.js';
import { Section } from './scripts/section.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import { PopupWithForm } from './scripts/popupWithForm.js';
import { patchProfile, getCards, getProfileInfo, postNewCard, updateAvatar } from './scripts/api.js';
import { enableValidation } from './scripts/validation.js'

let myId;
let cardsSection;

Promise.all([getProfileInfo(), getCards()])
  .then((results)=>{
    myId = results[0]._id;
    avatar.style.backgroundImage = `url("${results[0].avatar}")`;
    profileName.textContent = results[0].name;
    profileDescription.textContent = results[0].about;
    
    cardsSection = new Section({
      items: results[1],
      renderer: item => createCard(item, myId).render()
    }, '.photo-gallery');
    cardsSection.renderItems();
  })
  .catch((err)=>{
    console.log(err)
  })

//Включение валдиации

enableValidation(formSelectors);

//Попап редактирования профиля

const userInfo = new UserInfo({selectorName: '.profile__name', selectorDescription: '.profile__description'});
editButton.addEventListener('click', ()=>{
  popupEditOpened.open();
  const {name, description} = userInfo.getUserInfo();
  profileInput.value = name;
  descriptionInput.value = description;
});

const popupEditOpened = new PopupWithForm('#editPopup', (formData)=> {
  const submitButton = document.querySelector('#edit-save-button')
  submitButton.textContent = 'Сохранение...'
   patchProfile(formData)
    .then((result)=>{
      submitButton.textContent = 'Сохранить'
      userInfo.setUserInfo({name: result.name, description: result.about});
    })
    .catch((err)=>{
      console.log(err);
    });

  popupEditOpened.close();
}, formSelectors);

//Открытие и закрытие попапа добавления карточки
//

const popupAddCardOpened = new PopupWithForm('#popupAddCard', (formData)=>{

//Загрузка на сервер новой картинки
  const submitButton = document.querySelector('#add-save-button')
  submitButton.textContent = 'Сохранение...'
  postNewCard(formData.cardTitle, formData.cardLink)
    .then((result)=>{
      submitButton.textContent = 'Создать'
      const newCard = createCard(result, myId);
      cardsSection.addItem(newCard.render());
      popupAddCardOpened.close();
    })
    .catch((err)=>{
      console.log(err)
    })
  
}, formSelectors) 

buttonAddCard.addEventListener('click', ()=>{
  popupAddCardOpened.open();
})

//Открытие и закрытие попапа просмотра карточки
//
const openPopupWithImage = new PopupWithImage('#previewPopup');

function handleCardClick(item) {
  openPopupWithImage.open(item.name, item.link);
}

function createCard(cardObj, myId){
  return new Card('#cards', cardObj, myId, handleCardClick)
}

//Открытие  попапа редактирования профиля

const popupUpdateAvatarOpened = new PopupWithForm('#popupUpdateAvatar', (formData)=>{
  const submitButton = document.querySelector('#update-save-button')
  submitButton.textContent = 'Сохранение...'
  updateAvatar(document.querySelector('#avatarRef').value)
    .then((result)=>{
      submitButton.textContent = 'Сохранить'
      avatar.style.backgroundImage = `url("${result.avatar}")`;
    })
    .catch((err)=>{
      console.log(err);
    });
}, formSelectors);

avatar.addEventListener('click', ()=>{
  popupUpdateAvatarOpened.open();
})