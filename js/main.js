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

    fragment.append(elem);
  }

  return fragment;
};

var adsMap = generateAdsMap();
map.append(createPins(adsMap));


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardFragment = document.createDocumentFragment();
var cardElem = cardTemplate.cloneNode(true);

var addFeatures = function (features, featureList) {
  for (var j = 0; j < features.length; j++) {
    var feature = features[j];
    for (var i = 0; i < featureList.length; i++) {
      var item = featureList[i];
      if (item.classList.contains('popup__feature--' + feature)) {
        break;
      } else {
        item.style.display = 'none';
      }
    }
  }
};

var createPhoto = function (src) {
  var photo = document.createElement('img');

  photo.classList.add('popup__photo');
  photo.src = src;
  photo.width = '45';
  photo.height = '40';

  return photo;
};

var appendPhoto = function (photos, photoList) {
  for (var k = 0; k < photos.length; k++) {
    photoList.append(createPhoto(photos[k]));
  }
};

var updateCardElem = function (selector, text, src) {
  if (src) {
    cardElem.querySelector(selector).src = src;
  } else if (text) {
    cardElem.querySelector(selector).textContent = text;
  } else {
    cardElem.querySelector(selector).display = 'none';
  }
};

var addOfferCard = function (firstAds) {
  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var offer = firstAds.offer;

  updateCardElem('.popup__title', offer.title);
  updateCardElem('.popup__text--address', offer.address);
  updateCardElem('.popup__text--price', offer.price + '₽/ночь');
  updateCardElem('.popup__type', offerType[offer.type]);
  updateCardElem('.popup__description', offer.description);
  updateCardElem('.popup__avatar', '', firstAds.author.avatar);

  if (offer.rooms && offer.guests) {
    updateCardElem('.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  } else {
    updateCardElem('.popup__text--capacity');
  }

  if (offer.checkin && offer.checkout) {
    updateCardElem('.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  } else {
    updateCardElem('.popup__text--time');
  }

  addFeatures(offer.features, cardElem.querySelectorAll('.popup__feature'));

  var photoList = cardElem.querySelector('.popup__photos');
  photoList.innerHTML = '';
  appendPhoto(offer.photos, photoList);

  cardFragment.append(cardElem);
  map.append(cardFragment, document.querySelector('.map__filters-container'));
};

addOfferCard(adsMap[0], map);
