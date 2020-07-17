'use strict';
window.MAIN_PIN_WIDTH = 65;
window.MAIN_PIN_HEIGHT = 80;
var FORM_URL = 'https://javascript.pages.academy/keksobooking';
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

window.lockFieldsets(fieldsets);
window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
window.formValidation(form);

window.setMainPinEventsListener(map, form, fieldsets);

var resetBtn = document.querySelector('.ad-form__reset');
resetBtn.addEventListener('click', function () {
  window.clearForm(form);
});

window.showPrevImage(document.querySelector('.ad-form-header__input'), document.querySelector('.ad-form-header__preview img'));
window.showPrevImage(document.querySelector('.ad-form__input'), document.querySelector('.ad-form__photo img'));

window.initFormSending(FORM_URL, form, map, fieldsets);
