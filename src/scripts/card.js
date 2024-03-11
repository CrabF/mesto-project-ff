import { deleteCardFromServer } from './api.js'

export class Card {
  constructor (templateSelector, cardObj, myId, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = cardObj.name;
    this._link = cardObj.link;
    this._handleCardClick = handleCardClick;
    this._view = document.querySelector(this._templateSelector).content.cloneNode(true).children[0];
    this._likeButton = this._view.querySelector('.photo-gallery__likeCounter-button');
    this._buttonsDeleteCards = this._view.querySelector('.photo-gallery__remove-button');
    this.ownerId = cardObj.owner._id;
    this.itemId = cardObj._id;
    this.myId = myId;
  }

  render() {
    const imageCard = this._view.querySelector('.photo-gallery__image');
    const titleCard = this._view.querySelector('.photo-gallery__description');
    if(this.ownerId != this.myId ) {
      this._buttonsDeleteCards.classList.add('photo-gallery__remove-button_hide')
    }
    this._insertContent(imageCard, titleCard);
    this._setEventListeners(imageCard);
    return this._view;
  }

  _insertContent(imageCard, titleCard) {
    imageCard.src = this._link;
    imageCard.alt = this._name;
    titleCard.textContent = this._name;
  }

  _setEventListeners(imageCard) {
    this._likeButton.addEventListener('click',()=> this._likeCard());
    this._buttonsDeleteCards.addEventListener('click',()=> this._deleteCard());
    imageCard.addEventListener('click', ()=>{
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
      });
  }

   _deleteCard(){
    this._view.remove();
    this._view = null;
    deleteCardFromServer(this.itemId);
  }

   _likeCard() {
    this._likeButton.classList.toggle('photo-gallery__likeCounter-button_active');
  }
}