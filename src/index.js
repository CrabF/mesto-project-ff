import {
  formSelectors, initialCards, editButton, profileInput, descriptionInput,
  forms, buttonAddCard
} from './scripts/utils/constants.js';
import './pages/index.css';
import { Card } from './scripts/card.js'
import { UserInfo } from './scripts/userInfo.js';
import { Section } from './scripts/section.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import { PopupWithForm } from './scripts/popupWithForm.js';
import { FormValidator } from './scripts/formValidator';

//Открытие и закрытие попапа редактирования
//

const userInfo = new UserInfo({selectorName: '.profile__name', selectorDescription: '.profile__description'});
editButton.addEventListener('click', ()=>{  
  popupEditOpened.open();
  const {name, description} = userInfo.getUserInfo();
  profileInput.value = name;
  descriptionInput.value = description;
});

const popupEditOpened = new PopupWithForm('#editPopup', (formData)=> {
  userInfo.setUserInfo({name: formData.personalName, description: formData.qualification});
  popupEditOpened.close();
})

//Открытие и закрытие попапа добавления карточки
//

const popupAddCardOpened = new PopupWithForm('#popupAddCard', (formData)=>{
  const newCard = createCard(formData.cardTitle, formData.cardLink);
  cardsSection.addItem(newCard.render());
}) 

buttonAddCard.addEventListener('click', ()=>{
  popupAddCardOpened.open();
})

// Валидация форм
// 
const checkValidity = forms.forEach((item)=>{
  const validateForm = new FormValidator(formSelectors, item);
  validateForm.enableValidation();
})

//Открытие и закрытие попапа просмотра карточки
//
const openPopupWithImage = new PopupWithImage('#previewPopup');

function handleCardClick(item) {
  openPopupWithImage.open(item.name, item.link);
}

//Создание карточек
//

function createCard(name, link){
  return new Card('#cards', name, link, handleCardClick) 
}

const cardsSection = new Section({
  items: initialCards, 
  renderer: item => createCard(item.name, item.link).render()
  }, '.photo-gallery')

cardsSection.renderItems();