'use strict';
window.MAIN_PIN_WIDTH = 65;
window.MAIN_PIN_HEIGHT = 80;
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

var pinWrap = document.createElement('div');

window.request('https://javascript.pages.academy/keksobooking/data', function (data) {
  var offers = data;
  pinWrap.append(window.createPins(offers));
  map.append(pinWrap);
  window.addPinClickHandler(map, offers);
  window.filterFormEventsListener(map, offers, pinWrap);
});

window.lockFieldsets(fieldsets);
window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
window.validateForm(form);

window.setMainPinEventsListener(map, form, fieldsets);

var resetBtn = document.querySelector('.ad-form__reset');
resetBtn.addEventListener('click', function () {
  window.clearForm(form);
});

window.showPrevImage(document.querySelector('.ad-form-header__input'), document.querySelector('.ad-form-header__preview img'));
window.showPrevImage(document.querySelector('.ad-form__input'), document.querySelector('.ad-form__photo img'));

window.sendForm('https://javascript.pages.academy/keksobooking', form, map, fieldsets);
