'use strict';
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');

var unlockPage = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.unlockFieldsets(fieldsets);
    window.setAddress(form.querySelector('#address'), mainPin);
  }

  mainPin.removeEventListener('mousedown', unlockPage);
  mainPin.removeEventListener('keydown', unlockPage);
};

window.load('https://javascript.pages.academy/keksobooking/data', function (data) {
  map.append(window.createPins(data));
  window.addPinClickHandler(map, data);
});
window.lockFieldsets(fieldsets);
window.setAddress(form.querySelector('#address'), mainPin);
window.validateForm(form);
mainPin.addEventListener('mousedown', unlockPage);
mainPin.addEventListener('keydown', unlockPage);
