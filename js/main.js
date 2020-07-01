'use strict';
window.MAIN_PIN_WIDTH = 65;
window.MAIN_PIN_HEIGHT = 80;
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var offers;
var pinWrap = document.createElement('div');

window.request('https://javascript.pages.academy/keksobooking/data', function (data) {
  offers = data;
  pinWrap.append(window.createPins(offers));
  map.append(pinWrap);
  window.addPinClickHandler(map, offers);
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

var housingType = document.querySelector('#housing-type');

housingType.addEventListener('change', function () {
  pinWrap.innerHTML = '';
  var filterOffers = window.filterHousingType(housingType.value, offers);
  pinWrap.append(window.createPins(filterOffers));
  window.addPinClickHandler(map, filterOffers);
});

var mapFiltersForm = document.querySelector('.map__filters');

mapFiltersForm.addEventListener('change', function () {
  window.hideOfferCard();
});
