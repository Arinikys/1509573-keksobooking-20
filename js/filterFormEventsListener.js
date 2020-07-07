'use strict';
(function () {
  window.filterFormEventsListener = function (map, offers, pinWrap) {
    var housingFeatures = document.querySelectorAll('#housing-features input');

    var priceSelectFilter = document.querySelector('#housing-price');
    var typeSelectFilter = document.querySelector('#housing-type');
    var roomsSelectFilter = document.querySelector('#housing-rooms');
    var guestsSelectFilter = document.querySelector('#housing-guests');
    var filtredOffers = offers;

    priceSelectFilter.addEventListener('change', function () {
      filtredOffers = offers;
      addFiltredOffers();
    });

    typeSelectFilter.addEventListener('change', function () {
      filtredOffers = offers;
      addFiltredOffers();
    });

    roomsSelectFilter.addEventListener('change', function () {
      filtredOffers = offers;
      addFiltredOffers();
    });

    guestsSelectFilter.addEventListener('change', function () {
      filtredOffers = offers;
      addFiltredOffers();
    });

    var featuresFilterChangeHandler = function (filter) {
      filter.addEventListener('change', function () {
        filtredOffers = offers;
        addFiltredOffers();
      });
    };

    for (var j = 0; j < housingFeatures.length; j++) {
      var housingFeature = housingFeatures[j];
      featuresFilterChangeHandler(housingFeature);
    }

    var addFiltredOffers = function () {
      pinWrap.innerHTML = '';
      filtredOffers = window.filterHousingByPrice(priceSelectFilter.value, filtredOffers);
      filtredOffers = window.filterHousingByOption(typeSelectFilter.dataset.option, typeSelectFilter.value, filtredOffers);
      filtredOffers = window.filterHousingByOption(roomsSelectFilter.dataset.option, roomsSelectFilter.value, filtredOffers);
      filtredOffers = window.filterHousingByOption(guestsSelectFilter.dataset.option, guestsSelectFilter.value, filtredOffers);

      for (var housingFeaturesIndex = 0; housingFeaturesIndex < housingFeatures.length; housingFeaturesIndex++) {
        var checkboxFilter = housingFeatures[housingFeaturesIndex];
        if (checkboxFilter.checked) {
          filtredOffers = window.filterHousingByFeatures(checkboxFilter.value, filtredOffers);
        }
      }
      pinWrap.append(window.createPins(filtredOffers));
      window.addPinClickHandler(map, filtredOffers);
    };

    var mapFiltersForm = document.querySelector('.map__filters');

    mapFiltersForm.addEventListener('change', function () {
      window.hideOfferCard();
    });
  };
})();
