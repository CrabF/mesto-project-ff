export class Popup{
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
    
  _handleEscClose() {
      this.close();
  }
 
  rem() {
    this.close()
  }

  setEventListeners() {
    this.buttonClosePopup = this.popup.querySelector('.close-button');
    this.buttonClosePopup.addEventListener('click', this.rem.bind(this))
    this.popup.addEventListener('click', (evt)=>{
      if (evt.target.classList.contains('popup_opened')){
        this.close();
      }
    })
  }
}