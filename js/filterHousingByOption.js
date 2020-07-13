'use strict';

(function () {
  window.filterHousingByOption = function (option, value, offers) {
    if (value === 'any') {
      return offers;
    }

    return offers.filter(function (adv) {
      return (adv.offer[option]).toString() === value;
    });
  };
})();
