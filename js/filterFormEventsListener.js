'use strict';
(function () {
  window.filterFormEventsListener = function (map, offers, pinWrap) {
    var housingFeatures = document.querySelectorAll('#housing-features input');

    var selectFilters = document.querySelectorAll('.map__filter');
    var filtredOffers = offers;

    var selectFilterChangeHandler = function (filter) {
      filter.addEventListener('change', function () {
        filtredOffers = offers;
        addFiltredOffers();
      });
    };

    for (var i = 0; i < selectFilters.length; i++) {
      selectFilterChangeHandler(selectFilters[i]);
    }

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
      for (var selectFiltersIndex = 0; selectFiltersIndex < selectFilters.length; selectFiltersIndex++) {
        var selectFilter = selectFilters[selectFiltersIndex];
        filtredOffers = window.filterHousing(selectFilter.dataset.option, selectFilter.value, filtredOffers);
      }

      for (var housingFeaturesIndex = 0; housingFeaturesIndex < housingFeatures.length; housingFeaturesIndex++) {
        var checkboxFilter = housingFeatures[housingFeaturesIndex];
        if (checkboxFilter.checked) {
          filtredOffers = window.filterHousing(checkboxFilter.dataset.option, checkboxFilter.value, filtredOffers);
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
