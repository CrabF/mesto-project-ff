export { open, close }

function open(popup) {
  popup.classList.add('popup_opened');
  const buttonClosePopup = popup.querySelector('.close-button');
  const escCloseHandler = (evt)=>{
    _handleEscClose(evt, popup);
  }
  popup.escCloseHandler = escCloseHandler;
  document.addEventListener('keydown', escCloseHandler);
  buttonClosePopup.addEventListener('click', ()=>{
    close(popup);
  })
  popup.addEventListener('click', (evt)=>{
    if (evt.target.classList.contains('popup_opened')){
      _closeOnClickOverlay(popup)
    }
  })
}

function close(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popup.escCloseHandler);
}

function _handleEscClose(evt, popup) {
  if(evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', popup.escCloseHandler);
  }
}

function _closeOnClickOverlay(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popup.escCloseHandler);
}