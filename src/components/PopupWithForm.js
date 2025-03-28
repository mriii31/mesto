import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupElement, {handleSubmitForm}) {
        super(popupElement);
        this.handleSubmitForm = handleSubmitForm; //обработчик сабмита формы
        this._form = this.popupElement.querySelector('.form__popup');
        this._inputList = this.popupElement.querySelectorAll('.popup__input');
      }

      _setSubmitForm(evt) {
        evt.preventDefault();
        this.handleSubmitForm(this._getInputValues())
      }

      //собираем данные полей формы
      _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => { //перепрали инпуты и закинули в пустой объект
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
      }

      //закрытие попапа - всё сбрасываем
      close() {
        this._form.reset();
        super.close();
      }

      setEventListeners() {
        this._submit = this._setSubmitForm.bind(this);
        this.popupElement.addEventListener('submit', this._submit);
        super.setEventListeners();
      }     
}
