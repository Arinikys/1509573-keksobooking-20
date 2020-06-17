'use strict';
var map = document.querySelector('.map');
var adsMap = window.generateOfferMap();
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

map.append(window.createPins(adsMap));

window.addPinClickHandler(map, adsMap);

window.lockFieldsets(fieldsets);
window.setAddress(form.querySelector('#address'), mainPin);
window.validateForm(form);

mainPin.addEventListener('mousedown', unlockPage);
mainPin.addEventListener('keydown', unlockPage);
