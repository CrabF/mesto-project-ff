export function render(templateSelector, cardObj, myId, handleCardClick, likeCard, deleteCard) {
  const view = document.querySelector(templateSelector).content.cloneNode(true).children[0];
  const imageCard = view.querySelector('.photo-gallery__image');
  const titleCard = view.querySelector('.photo-gallery__description');
  const buttonDeleteCards = view.querySelector('.photo-gallery__remove-button');
  const arrayLikes = cardObj.likes;
  const likeButton = view.querySelector('.photo-gallery__like-counter-button');
  const counterLikes = view.querySelector('.photo-gallery__like-counter-button_count');
  const cardName = cardObj.name;
  const cardLink = cardObj.link;
  const ownerId = cardObj.owner._id;

  likeButton.addEventListener('click',()=> likeCard(cardObj, myId, likeButton, counterLikes));
  buttonDeleteCards.addEventListener('click',()=> deleteCard(cardObj, view));

  imageCard.addEventListener('click', ()=>{
    handleCardClick({
      name: cardName,
      link: cardLink
    })
  })
    
  if(ownerId != myId ) {
    buttonDeleteCards.classList.add('photo-gallery__remove-button_hide')
  }

  if(arrayLikes.length > 0) {
    counterLikes.textContent = arrayLikes.length
  }

  const includeMyIndex = _getMyIndex(arrayLikes, myId);

  if(includeMyIndex >= 0){
    likeButton.classList.add('photo-gallery__like-counter-button_active')
  }

  _insertContent(imageCard, titleCard, cardObj);
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