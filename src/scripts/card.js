import { deleteCardFromServer, likeCard, removeLike } from './api.js'

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
    this.cardId = cardObj._id;
    this.myId = myId;
    this.arrayLikes = cardObj.likes;
    this.counterLikes =  this._view.querySelector('.photo-gallery__likeCounter-button_count');
   
    // console.log(this.arrayLikes)
  }

  render() {
    const imageCard = this._view.querySelector('.photo-gallery__image');
    const titleCard = this._view.querySelector('.photo-gallery__description');
    if(this.ownerId != this.myId ) {
      this._buttonsDeleteCards.classList.add('photo-gallery__remove-button_hide')
    };
    if (this.arrayLikes.length > 0) {
      this.counterLikes.textContent = this.arrayLikes.length
    }


    let includeMyIndex = this.arrayLikes.findIndex((element)=>{
      return element._id === this.myId
    })

    if (includeMyIndex >= 0){
      this._likeButton.classList.add('photo-gallery__likeCounter-button_active')
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
    deleteCardFromServer(this.cardId)
      // .catch((err)=>{
      //   console.log(err)
      // });
  }

   _likeCard() {
   


    let includeMyIndex = this.arrayLikes.findIndex((element)=>{
      return element._id === this.myId
    })

    if (includeMyIndex === -1){
      likeCard(this.cardId)
        .then((res)=>{
          this.arrayLikes = res.likes
          this.counterLikes.textContent = this.arrayLikes.length
          this._likeButton.classList.add('photo-gallery__likeCounter-button_active');
        })


    } else {
      removeLike(this.cardId)
      .then((res)=>{
        this.arrayLikes = res.likes
        if (this.arrayLikes.length === 0) {
          this.counterLikes.textContent = null
        } else {
          this.counterLikes.textContent = this.arrayLikes.length
        }
        this._likeButton.classList.remove('photo-gallery__likeCounter-button_active');
      })    
    }

  
      

      // console.log(this.cardId)
      // console.log(this.arrayLikes)
      // .catch((err)=>{
      //   console.log(err)
      // })
    // this._likeButton.classList.add('photo-gallery__likeCounter-button_active');
 
    //   removeLike(this.cardId);
    //   this._likeButton.classList.remove('photo-gallery__likeCounter-button_active');
    
  }
}
//Попробовать через findindex