import {
  formSelectors, initialCards, editButton, profileInput, descriptionInput,
  forms, buttonAddCard, avatar, profileName, profileDescription
} from './scripts/utils/constants.js';
import './pages/index.css';
import { Card } from './scripts/card.js'
import { UserInfo } from './scripts/userInfo.js';
import { Section } from './scripts/section.js';
import { PopupWithImage } from './scripts/popupWithImage.js';
import { PopupWithForm } from './scripts/popupWithForm.js';
import { patchProfile, getCards, getProfileInfo, postNewCard } from './scripts/api.js';
import { enableValidation } from './scripts/validation.js'

let myId;
let cardsSection;

Promise.all([getProfileInfo(), getCards()])
  .then((results)=>{

    myId = results[0]._id;
    avatar.src = results[0].avatar;
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
  
//Получение профиля с сервера

// getProfileInfo()
// avatar.src = result.avatar;
// profileName.textContent = result.name;
// profileDescription.textContent = result.about;
  // .catch((err)=>{
  //   console.log(err);
  // });

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


const popupEditOpened = new PopupWithForm('#editPopup', async (formData)=> {
  userInfo.setUserInfo({name: formData.personalName, description: formData.qualification});
  //активировать загрузку await
   patchProfile(formData)
    .catch((err)=>{
      console.log(err);
    });
  //выключить загрузку
  popupEditOpened.close();
}, formSelectors);

//Открытие и закрытие попапа добавления карточки
//

const popupAddCardOpened = new PopupWithForm('#popupAddCard', (formData)=>{
  //Загрузка на сервер новой картинки
  postNewCard(formData.cardTitle, formData.cardLink)
    .then((data)=>{
      const newCard = createCard(data, myId);
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


//Получение карточек с сервера



  // getCards()
  //   .then((cardsObj)=>{
  //     cardsSection = new Section({
  //         items: cardsObj,
  //         renderer: item => createCard(item.name, item.link, item.owner._id, item._id).render()
  //       }, '.photo-gallery');
  //     cardsSection.renderItems();
  //   })
  //   .catch((err)=>{
  //     console.log(err) ;
  // })


  function createCard(cardObj, myId){
    return new Card('#cards', cardObj, myId, handleCardClick)
  }

 




  // 1. при очистке валидации - остается отступ
  // 2. если запэтчить невалидные данные, они сохранятся , но не будут отправлены на сервер. Нужно, чтобы при ошибка от сервера - не сохранялись данные. Идентичная проблема с добавлением новой карточки
  // 3. добавить класс hide для remove button при getCards
  // 4. на все корзинки сделать листенер и колбек функцию делит
  // 5. если функции CreateCard передать два аргумента из трех, норм?
  // 6. После пост запроса ебашить гет, чтобы были id для лайкво и удаления
