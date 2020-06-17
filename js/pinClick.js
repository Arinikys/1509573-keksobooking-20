'use strict';
(function () {
  window.addPinClickHandler = function(map) {
    var mapPins = document.querySelectorAll('.map__pin');

    var addMapPinsClickHandler = function (mapPin, adsMapItem) {
      mapPin.addEventListener('click', function () {
        map.append(window.addOfferCard(adsMapItem), document.querySelector('.map__filters-container'));
        map.addEventListener('click', closeMapCardByClick);
        document.addEventListener('keydown', closeMapCardByEscape);
      });
    };

    for (var i = 0; i < mapPins.length; i++) {
      var mapPin = mapPins[i];
      if (!mapPin.classList.contains('map__pin--main')) {
        addMapPinsClickHandler(mapPin, adsMap[mapPin.dataset.cardId]);
      }
    }

    var closeMapCardByClick = function (evt) {
      if (
        evt.target
        && evt.target.matches('.popup__close')
      ) {
        map.querySelector('.map__card').classList.add('hidden');
      }
    };

    var closeMapCardByEscape = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        map.querySelector('.map__card').classList.add('hidden');
        document.removeEventListener('keydown', closeMapCardByEscape);
      }
    };
  }
})();
