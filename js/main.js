'use strict';
var map = document.querySelector('.map');

var adsMap = window.generateOfferMap();

map.append(window.createPins(adsMap));

window.addPinClickHandler(map);

var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');

window.lockFieldsets(fieldsets);
window.setAddress(form.querySelector('#address'), mainPin);
window.validateForm(form);

var unlockPage = function (evt, ) {
  if (evt.button === 0 || evt.key === 'Enter') {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.unlockFieldsets(fieldsets);
    window.setAddress(form.querySelector('#address'), mainPin);
  }

  mainPin.removeEventListener('mousedown', unlockPage);
  mainPin.removeEventListener('keydown', unlockPage);
};

mainPin.addEventListener('mousedown', unlockPage);
mainPin.addEventListener('keydown', unlockPage);
