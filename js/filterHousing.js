'use strict';

(function () {

  window.filterHousing = function (option, value, offers) {
    if (value === 'any') {
      return offers;
    }

    if (option === 'features') {
      return offers.filter(function (offer) {
        return offer.offer[option].indexOf(value) !== -1;
      });
    }

    if (option === 'price') {
      return offers.filter(function (offer) {
        var optionValInt = parseInt(offer.offer[option], 10);
        switch (value) {
          case 'low' :
            return optionValInt < 10000;
          case 'high' :
            return optionValInt > 50000;
          case 'middle' :
            return optionValInt > 10000 && optionValInt < 50000;
        }
      });
    }

    return offers.filter(function (offer) {
      return (offer.offer[option]).toString() === value;
    });
  };
})();
