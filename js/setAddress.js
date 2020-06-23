'use strict';
(function () {
  window.setAddress = function (MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT) {
    var mainPin = document.querySelector('.map__pin--main');
    var addressInput = document.querySelector('#address');
    addressInput.value = Math.round(MAIN_PIN_WIDTH / 2 + mainPin.offsetLeft) + ' ' + (MAIN_PIN_HEIGHT + mainPin.offsetTop);
  };
})();
