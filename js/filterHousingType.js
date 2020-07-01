'use strict';

(function () {
  window.filterHousingType = function (type, advs) {
    if (type === 'any') {
      return advs;
    }
    return advs.filter(function () {
      return advs.offer.type === type;
    });
  };
})();
