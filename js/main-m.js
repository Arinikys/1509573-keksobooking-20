'use strict';
window.map = document.querySelector('.map');

var adsMap = window.generateAdsMap();

window.map.append(window.createPins(adsMap));

var mapPins = document.querySelectorAll('.map__pin');

var addMapPinsClickHandler = function (mapPin, adsMapItem) {
  mapPin.addEventListener('click', function () {
    window.map.append(window.addOfferCard(adsMapItem), document.querySelector('.map__filters-container'));
    window.map.addEventListener('click', closeMapCardByClick);
    document.addEventListener('keydown', closeMapCardByKeydown);
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
    window.map.querySelector('.map__card').classList.add('hidden');
  }
};

var closeMapCardByKeydown = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    window.map.querySelector('.map__card').classList.add('hidden');
    document.removeEventListener('keydown', closeMapCardByKeydown);
  }
};
