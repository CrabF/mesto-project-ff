import { deleteCardFromServer, likeCardForServer, removeLike } from './api.js';

export function render(templateSelector, cardObj, myId, handleCardClick) {
  const view = document.querySelector(templateSelector).content.cloneNode(true).children[0];
  const imageCard = view.querySelector('.photo-gallery__image');
  const titleCard = view.querySelector('.photo-gallery__description');
  const buttonsDeleteCards = view.querySelector('.photo-gallery__remove-button');
  const arrayLikes = cardObj.likes;
  const likeButton = view.querySelector('.photo-gallery__like-counter-button');
  const counterLikes = view.querySelector('.photo-gallery__like-counter-button_count');
  const cardName = cardObj.name;
  const cardLink = cardObj.link;
  const ownerId = cardObj.owner._id;

  imageCard.addEventListener('click', ()=>{
    handleCardClick({
      name: cardName,
      link: cardLink
    })
  })
    
  if(ownerId != myId ) {
    buttonsDeleteCards.classList.add('photo-gallery__remove-button_hide')
  }

  if (arrayLikes.length > 0) {
    counterLikes.textContent = arrayLikes.length
  }

  let includeMyIndex = _getMyIndex(arrayLikes, myId);

  if (includeMyIndex >= 0){
    likeButton.classList.add('photo-gallery__like-counter-button_active')
  }

  _insertContent(imageCard, titleCard, cardObj);
  _setEventListeners(likeButton, buttonsDeleteCards, cardObj, myId, view, counterLikes);
  return view
}

function _getMyIndex(arrayLikes, myId) {
  return arrayLikes.findIndex((element)=>{
    return element._id === myId
  })
}

function _insertContent(imageCard, titleCard, cardObj) {
  imageCard.src = cardObj.link;
  imageCard.alt = cardObj.name;
  titleCard.textContent = cardObj.name;
}
  
function _setEventListeners(likeButton, buttonsDeleteCards, cardObj, myId, view, counterLikes) {
  likeButton.addEventListener('click',()=> _likeCard(cardObj, myId, view, likeButton, counterLikes));
  buttonsDeleteCards.addEventListener('click',()=> _deleteCard(cardObj, view));
}

function _likeCard(cardObj, myId, view, likeButton, counterLikes) {
  let includeMyIndex = _getMyIndex(cardObj.likes, myId);
  
  if (includeMyIndex === -1){
    likeCardForServer(cardObj._id)
      .then((res)=>{
        cardObj.likes = res.likes
        counterLikes.textContent = cardObj.likes.length
        likeButton.classList.add('photo-gallery__like-counter-button_active');
      })
      .catch((err)=>{
        console.log(err)
      })
  } else {
    removeLike(cardObj._id)
    .then((res)=>{
      cardObj.likes = res.likes
  
      if (cardObj.likes.length === 0) {
        counterLikes.textContent = ''
      } else {
        counterLikes.textContent = cardObj.likes.length
      }
  
      likeButton.classList.remove('photo-gallery__like-counter-button_active');
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
  
function _deleteCard(cardObj, view){
  deleteCardFromServer(cardObj._id)
    .then(()=>{
      view.remove();
      view = null;
    })
    .catch((err)=>{
      console.log(err)
  })
}