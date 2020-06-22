'use strict';
window.MAIN_PIN_WIDTH = 65;
window.MAIN_PIN_HEIGHT = 80;
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
  map.append(window.createPins(data));
  window.addPinClickHandler(map, data);
});
window.lockFieldsets(fieldsets);
window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
window.validateForm(form);

window.setMainPinEventsListener(map, form, fieldsets);
