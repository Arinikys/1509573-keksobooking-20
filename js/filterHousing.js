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
        var isOfferPass = false;
        switch (value) {
          case 'low' :
            isOfferPass = optionValInt < 10000;
            break;
          case 'high' :
            isOfferPass = optionValInt > 50000;
            break;
          case 'middle' :
            isOfferPass = optionValInt > 10000 && optionValInt < 50000;
            break;
          default:
            return false;
        }
        return isOfferPass;
      });
    }

    return offers.filter(function (offer) {
      return (offer.offer[option]).toString() === value;
    });
  };
})();
