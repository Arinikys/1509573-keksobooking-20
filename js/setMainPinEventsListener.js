'use strict';
(function () {

  window.setMainPinEventsListener = function (map, form, fieldsets) {
    var OFFER_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
    var mainPin = document.querySelector('.map__pin--main');
    var minYLimit = 130 - window.MAIN_PIN_HEIGHT;
    var maxYLimit = 630 - window.MAIN_PIN_HEIGHT;
    var minXLimit = 0 - window.MAIN_PIN_HEIGHT / 2;
    var maxXLimit = map.clientWidth - window.MAIN_PIN_WIDTH / 2;

    var unlockPage = function (evt) {
      if (evt.button === 0 || evt.key === 'Enter') {
        window.upload(OFFER_DATA_URL, 'GET', function (data) {
          var offers = data;
          var pinWrap = document.createElement('div');

          pinWrap.classList.add('map__pins-wrap');
          pinWrap.append(window.createPins(offers));
          map.append(pinWrap);
          window.addPinClickHandler(map, offers);
          window.addFilterFormEventsListener(map, offers, pinWrap);
        });
        window.unlockPage(map, form);
        window.unlockFieldsets(fieldsets);
        window.setAddress(window.MAIN_PIN_WIDTH, window.MAIN_PIN_HEIGHT);
      }

      mainPin.removeEventListener('mousedown', unlockPage);
      mainPin.removeEventListener('keydown', unlockPage);
    };

    mainPin.addEventListener('mousedown', unlockPage);
    mainPin.addEventListener('keydown', unlockPage);

    mainPin.addEventListener('mousedown', function (evt) {
      window.dragPin(evt, mainPin, minXLimit, maxXLimit, minYLimit, maxYLimit);
    });
  };
})();
