'use strict';
window.MAIN_PIN_WIDTH = 65;
window.MAIN_PIN_HEIGHT = 80;
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

window.request('https://javascript.pages.academy/keksobooking/data', function (data) {
  map.append(window.createPins(data));
  window.addPinClickHandler(map, data);
});
window.lockFieldsets(fieldsets);
window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
window.validateForm(form);

window.setMainPinEventsListener(map, form, fieldsets);

var resetBtn = document.querySelector('.ad-form__reset');
resetBtn.addEventListener('click', function () {
  window.clearForm(form);
});

window.sendForm('https://javascript.pages.academy/keksobooking', form, map, fieldsets);

