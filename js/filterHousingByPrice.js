'use strict';

(function () {
  window.filterHousingByPrice = function (value, offers) {
    if (value === 'any') {
      return offers;
    }
    return offers.filter(function (adv) {
      var optionValInt = parseInt(adv.offer['price'], 10);
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
  };
})();
