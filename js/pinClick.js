'use strict';
(function () {
  window.addPinClickHandler = function (map, adsMap) {
    var KEY_NAME = 'Escape';
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
        window.hideOfferCard();
      }
    };

    var closeMapCardByEscape = function (evt) {
      if (evt.key === KEY_NAME) {
        evt.preventDefault();
        window.hideOfferCard();
        document.removeEventListener('keydown', closeMapCardByEscape);
      }
    };
  };
})();
