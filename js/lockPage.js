'use strict';
(function () {

  window.lockPage = function (map, form) {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
  };
})();
