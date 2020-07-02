'use strict';
(function () {
  window.fillterOffers = function (map, offers, pinWrap) {
    var housingType = document.querySelector('#housing-type');

    housingType.addEventListener('change', function () {
      pinWrap.innerHTML = '';
      var filterOffersVal = window.filterHousingType(housingType.value, offers);
      pinWrap.append(window.createPins(filterOffersVal));
      window.addPinClickHandler(map, filterOffersVal);
    });

    var mapFiltersForm = document.querySelector('.map__filters');

    mapFiltersForm.addEventListener('change', function () {
      window.hideOfferCard();
    });
  };
})();
