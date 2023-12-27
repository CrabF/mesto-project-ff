import { Popup } from './popup.js';
import { FormValidator } from './formValidator.js';
import { formSelectors } from '../src/index.js';
export class PopupWithForm extends Popup{
  constructor(selector, submit) {
    super(selector);
    this.submit = submit;
    this.form = this.popup.querySelector('.popup__form');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.validate = new FormValidator(formSelectors, this.form);
    this.setEventListeners();
  }
  
  open() {
    super.open();
    this.validate.enableValidation()
  }

  _getInputValues() {
    return this.inputs.reduce((acc, current)=> {
      return {...acc, [current.name]: current.value}
    }, {})
  }

  setEventListeners() {
    super.setEventListeners()
    this.form.addEventListener('submit', (evt)=>{
      evt.preventDefault();
      this.submit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this.form.reset();
    super.close();
  }
}