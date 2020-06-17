'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;

  window.setAddress = function (addressInput, mainPin) {
    addressInput.value = Math.round(MAIN_PIN_WIDTH / 2 + mainPin.offsetLeft) + ' ' + (MAIN_PIN_HEIGHT + mainPin.offsetTop);
  };
})();
