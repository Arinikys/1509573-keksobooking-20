'use strict';

(function () {
  window.filterHousingByOption = function (option, value, offers) {
    if (value === 'any') {
      return offers;
    }

    return offers.filter(function (offer) {
      return (offer.offer[option]).toString() === value;
    });
  };
})();
