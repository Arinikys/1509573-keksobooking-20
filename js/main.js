'use strict';

var PINS_COUNT = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateAdsMap = function () {
  var adsMap = [];
  var adsTypes = ['palace', 'flat', 'house', 'bungalo'];
  var adsFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];

  for (var i = 0; i < PINS_COUNT; i++) {
    var pinNumber = '0' + (i + 1);

    adsMap.push({
      'author': {
        'avatar': 'img/avatars/user' + pinNumber + '.png'
      },
      'offer': {
        'title': 'title' + pinNumber,
        'address': '600, 350',
        'price': 500,
        'type': adsTypes[getRandomInt(0, adsTypes.length - 1)],
        'rooms': getRandomInt(1, 10),
        'guests': getRandomInt(1, 10),
        'checkin': checkinTimes[getRandomInt(0, checkinTimes.length - 1)],
        'checkout': checkoutTimes[getRandomInt(0, checkoutTimes.length - 1)],
        'features': function () {
          var offerCount = getRandomInt(1, adsFeatures.length);
          var offerFeatures = [];

          for (var j = 0; j < offerCount; j++) {
            offerFeatures.push(adsFeatures[getRandomInt(0, adsFeatures.length - 1)]);
          }

          return offerFeatures;
        }(),
        'description': 'description' + pinNumber,
        'photos': [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ]
      },
      'location': {
        'x': getRandomInt(100, 1100),
        'y': getRandomInt(130, 630)
      }
    });
  }

  return adsMap;
};

var createPins = function (pins) {
  var template = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var elem = template.cloneNode(true);
    var img = elem.children[0];

    elem.style = 'left: ' + (pins[i].location.x + (img.width / 2)) + 'px; top: ' + (pins[i].location.y + img.height) + 'px;';
    img.src = pins[i].author.avatar;
    img.alt = pins[i].offer.description;

    fragment.appendChild(elem);
  }

  return fragment;
};

map.append(createPins(generateAdsMap()));
