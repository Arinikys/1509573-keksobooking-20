'use strict';

(function () {
  window.filterHousingType = function (type, offers) {

    if (type === 'any') {
      return offers;
    }
    return offers.filter(function (offer) {
      return offer.offer.type === type;
    });
  };
})();
