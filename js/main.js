'use strict';

var PINS_COUNT = 8;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 84;

var map = document.querySelector('.map');

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

/*
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

var createPhoto = function (src, className, width, height) {
  var photo = document.createElement('img');
  photo.classList.add(className);
  photo.src = src;
  photo.width = width;
  photo.height = height;

  return photo;
};

var appendPhoto = function (photos, photoList, className, width, height) {
  for (var k = 0; k < photos.length; k++) {
    photoList.append(createPhoto(photos[k], className, width, height));
  }
};

var updateCardElem = function (selector, attrName, attrVal) {
  if (attrName && attrVal) {
    cardElem.querySelector(selector)[attrName] = attrVal;
    return;
  }
  cardElem.querySelector(selector).display = 'none';
};


var addOfferCard = function (firstAds) {
  var offerType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var offer = firstAds.offer;

  updateCardElem('.popup__title', 'textContent', offer.title);
  updateCardElem('.popup__text--address', 'textContent', 'textContent', offer.address);
  updateCardElem('.popup__text--price', 'textContent', offer.price + '₽/ночь');
  updateCardElem('.popup__type', 'textContent', offerType[offer.type]);
  updateCardElem('.popup__description', 'textContent', offer.description);
  updateCardElem('.popup__avatar', 'src', firstAds.author.avatar);

  if (offer.rooms && offer.guests) {
    updateCardElem('.popup__text--capacity', 'textContent', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  } else {
    updateCardElem('.popup__text--capacity');
  }

  if (offer.checkin && offer.checkout) {
    updateCardElem('.popup__text--time', 'textContent', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  } else {
    updateCardElem('.popup__text--time');
  }

  addFeatures(offer.features, cardElem.querySelectorAll('.popup__feature'));

  var photoList = cardElem.querySelector('.popup__photos');
  var photo = photoList.querySelector('img');
  var photoWidth = photo.width;
  var photoHeight = photo.height;
  var photoClassName = photo.classList;
  photoList.innerHTML = '';
  appendPhoto(offer.photos, photoList, photoClassName, photoWidth, photoHeight);

  cardFragment.append(cardElem);
  map.append(cardFragment, document.querySelector('.map__filters-container'));
};

addOfferCard(adsMap[0], map);
*/

var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

var lockFieldsets = function (fieldsetsList) {
  for (var i = 0; i < fieldsetsList; i++) {
    fieldsetsList[i].disabled = true;
  }
};
lockFieldsets(fieldsets);

var unlockFieldsets = function (fieldsetsList) {
  for (var i = 0; i < fieldsetsList; i++) {
    fieldsetsList[i].disabled = false;
  }
};

var unlockPage = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    unlockFieldsets(fieldsets);
    setAddress();
  }

  mainPin.removeEventListener('mousedown', unlockPage);
  mainPin.removeEventListener('keydown', unlockPage);
};

var mainPin = map.querySelector('.map__pin--main');
mainPin.addEventListener('mousedown', unlockPage);

mainPin.addEventListener('keydown', unlockPage);

var setAddress = function () {
  var addressInput = form.querySelector('#address');
  addressInput.value = Math.round(MAIN_PIN_WIDTH / 2 + mainPin.offsetLeft) + ' ' + (MAIN_PIN_HEIGHT + mainPin.offsetTop);
};
setAddress();

var roomNumberSelect = form.querySelector('#room_number');
var capacitySelect = form.querySelector('#capacity');

roomNumberSelect.addEventListener('change', function () {
  var rooms = Number(roomNumberSelect.value);
  var capacityOption = capacitySelect.children;
  var item;
  var value;
  if (rooms === 100) {
    for (var i = 0; i < capacityOption.length; i++) {
      item = capacityOption[i];
      value = Number(item.value);
      if (value === 0) {
        item.disabled = false;
      } else {
        item.disabled = true;
      }
    }
    return;
  }
  for (var j = 0; j < capacityOption.length; j++) {
    item = capacityOption[j];
    value = Number(item.value);
    if (value > rooms || value === 0) {
      item.disabled = true;
    } else {
      item.disabled = false;
    }
  }
});
