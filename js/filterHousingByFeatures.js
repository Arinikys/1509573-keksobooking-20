'use strict';

(function () {

  window.filterHousingByFeatures = function (value, offers) {
    return offers.filter(function (offer) {
      return offer.offer['features'].indexOf(value) !== -1;
    });
  };
})();
