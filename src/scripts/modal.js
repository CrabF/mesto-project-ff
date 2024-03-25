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

  const clickOverlayCloseHandler = (evt)=>{
    if (evt.target.classList.contains('popup_opened')){
      _closeOnClickOverlay(popup)
    }
  }
  popup.addEventListener('click', clickOverlayCloseHandler);
  popup.clickOverlayCloseHandler = clickOverlayCloseHandler;
}

function close(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popup.escCloseHandler);
  popup.removeEventListener('click', popup.clickOverlayCloseHandler);
}

function _handleEscClose(evt, popup) {
  if(evt.key === 'Escape') {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', popup.escCloseHandler);
    popup.removeEventListener('click', popup.clickOverlayCloseHandler);
  }
}

function _closeOnClickOverlay(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popup.escCloseHandler);
  popup.removeEventListener('click', popup.clickOverlayCloseHandler);
}