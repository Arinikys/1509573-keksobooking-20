'use strict';
(function () {

  window.hideOfferCard = function () {
    var offerCard = document.querySelector('.map__card');
    if (offerCard && !offerCard.classList.contains('hidden')) {
      offerCard.classList.add('hidden');
    }
  };
})();
