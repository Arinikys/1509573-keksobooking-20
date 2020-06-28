'use strict';
(function () {

  window.setMainPinEventsListener = function (map, form, fieldsets) {
    var mainPin = document.querySelector('.map__pin--main');
    var minXLimit = 0;
    var maxXLimit = map.clientWidth - window.MAIN_PIN_WIDTH;
    var minYLimit = 0;
    var maxYLimit = map.clientHeight - window.MAIN_PIN_HEIGHT;

    var unlockPage = function (evt) {
      if (evt.button === 0 || evt.key === 'Enter') {
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
