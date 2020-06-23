'use strict';
(function () {

  window.unlockPage = function (map, form) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
  };
})();
