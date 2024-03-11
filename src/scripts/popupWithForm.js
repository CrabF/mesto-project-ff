import { Popup } from './popup.js';
import { clearValidation } from './validation.js';
export class PopupWithForm extends Popup{
  constructor(selector, submit, configSelectors) {
    super(selector);
    this.submit = submit;
    this.form = this.popup.querySelector('.popup__form');
    this.inputs = Array.from(this.form.querySelectorAll('input'));
    this.configSelectors = configSelectors;
    this.setEventListeners();
  }

  open() {
    super.open();
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
    clearValidation(this.form, this.configSelectors);
    super.close();
  }
}