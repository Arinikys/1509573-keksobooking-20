'use strict';

(function () {

  window.filterHousingByFeatures = function (value, offers) {
    return offers.filter(function (adv) {
      return adv.offer['features'].indexOf(value) !== -1;
    });
  };
})();
